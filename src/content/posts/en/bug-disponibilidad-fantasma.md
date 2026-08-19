---
title: "Disponibilidad fantasma: el bug que tres revisiones distintas no vieron"
description: "La verdadera historia detrás de mi reflexión sobre volver al papel: un bug de disponibilidad fantasma en el cálculo de compras que tres revisiones distintas no lograron detectar."
pubDate: 2026-08-21
tags: [programación, sql, troubleshooting]
categories: [Programación, SQL]
---

Hace unos días dejé por aquí [una reflexión corta](/posts/vuelve-al-papel-aunque-ya-funcione/) sobre dudar de tus propias soluciones, aunque ya funcionen, aunque alguien más las haya revisado y esté de acuerdo contigo. Prometí contar de dónde había salido. Esta es la historia completa.

En la chamba mantengo un ERP con un módulo que calcula cuándo hace falta comprar materia prima y material de embalaje, comparando existencias, lo que ya está en tránsito, y la demanda de las órdenes de producción pendientes. Es exactamente el tipo de lógica que suena simple hasta que la escribes: sumas lo que tienes, sumas lo que viene en camino, le restas lo que necesitas, y si el resultado cae por debajo del stock mínimo, sugieres una compra.

El código original ya llevaba mucho rato en producción. El desarrollador que lo escribió lo había revisado. Yo lo había revisado y ajustado más de una vez. Hasta lo analicé con una compañera de otra área, cuando empezó a notar que a veces se quedaba sin inventario de materiales, viendo la lógica juntos, y las dos veces todo se veía correcto. Tres pares de ojos, en momentos distintos, dándole el visto bueno al mismo código.

Y aun así, estaba mal. Nadie lo notó hasta que me tocó reescribir el módulo desde cero (por razones completamente distintas) y, literalmente, hice en papel el mismo ejercicio que terminé documentando como bug. Ahí, viéndolo escrito a mano en lugar de leído en pantalla, apareció el error.

## El bug: disponibilidad fantasma

El cálculo tenía un mecanismo para evitar un problema real: no queremos que el sistema sugiera comprar materia prima para una orden de producción para la que ya se compró. Así que, si una orden de producción se creó antes (o el mismo día) de la última compra registrada para ese material, se excluye de la demanda:

```sql
LEFT JOIN (
    SELECT ocmp.materia_prima, MAX(oc.fecha_creacion) AS ultima_compra
    FROM ordenes_compra_materias_primas ocmp
    JOIN ordenes_compra oc ON ocmp.orden_compra = oc.id
    GROUP BY ocmp.materia_prima
) ult ON opp.materia_prima = ult.materia_prima
WHERE ...
  AND op.fecha_creacion > IFNULL(ult.ultima_compra, '1900-01-01')
```

La idea detrás es completamente razonable: **"ya compramos para esa orden, no la vuelvas a contar"**. El problema es lo que *NO* hace: excluye la demanda de esa orden de producción, pero nunca descuenta del tránsito o existencias la cantidad que esa compra ya tenía comprometida. El cálculo de cobertura se quedaba así:

```
cobertura = existencias + tránsito − demanda_de_órdenes_no_excluidas
```

Si la orden recién excluida todavía no había recibido ni consumido su material, esas piezas seguían físicamente en camino —parte del tránsito— o en el almacén, pero como las ordenes de producción ya no contaban como demanda, el sistema las trataba como sobrante disponible para cualquier orden nueva. Y le decía al usuario **"no hace falta pedir"** material que, en la práctica, ya tenía dueño.

## El ejemplo que lo deja claro

Con números es más fácil verlo. Una materia prima X arranca en 0 unidades de inventario, con stock mínimo de 100 y compra mínima de 150:

| Fecha | Evento |
| --- | --- |
| 02/01 | Se crea OP#1 — necesita 50 pzas de X |
| 03/01 | Se crea OP#2 — necesita 80 pzas de X |
| 04/01 | Se calcula el pedido: hace falta cubrir 130 (OP#1+OP#2) + 100 de stock mínimo = 230, se pide `ceil(230/150)*150 = 300` pzas |
| 05/01 | Se compran las 300 pzas (quedan en tránsito, aún no llegan) |
| 07/01 | Se crea OP#3 — necesita 80 pzas de X |
| 08/01 | Se calcula de nuevo: OP#1 y OP#2 quedan excluidas por haberse creado antes de la compra del 05/01. Demanda considerada = solo OP#3 (80). Cobertura = 0 + 300 − 80 = 220, y como 220 ≥ 100, el sistema dice que no hace falta pedir |

Ahí está el error. De esas 300 piezas en tránsito, 130 ya estaban destinadas a OP#1 y OP#2, que seguían sin recibir su material. Lo realmente disponible para demanda nueva era 300 − 130 = 170, no 300. Con el número correcto:

```
cobertura_correcta = 170 − 80 (OP#3) = 90        →   90 < 100 (stock mínimo)
déficit = 100 − 90 = 10                          →   pedir = ceil(10/150)*150 = 150
```

El sistema debería haber sugerido pedir 150 piezas el 08/01, y no lo hizo. No es un bug que pierda datos ni que rompa nada visiblemente: la alerta simplemente aparece días después, cuando el consumo real de OP#1 y OP#2 termina bajando las existencias lo suficiente para que el déficit ya no se pueda esconder. Reacciona tarde, en lugar de reaccionar mal. Y ese tipo de bug es el más traicionero de todos, porque durante días el sistema se ve funcionando perfecto —hasta que producción se queda sin material, cómo ya había pasado mas de una ocasión, y ya no hay margen para reaccionar a tiempo.

## La corrección

En lugar de excluir órdenes completas por fecha de última compra, la corrección calcula la demanda pendiente real, orden por orden, restando lo que ya se consumió específicamente para esa orden:

```
pendiente = cantidad_requerida − consumido_de_esa_orden
```

El dato de `consumido_de_esa_orden` sale de sumar los movimientos de tipo `PRODUCCION` ligados a esa orden específica —una columna que ya existía en el esquema y que ya se venía llenando en la práctica—. Antes de confiar en ella, verifiqué contra datos reales qué tan completa estaba: alrededor del 95.6% de los movimientos de tipo `PRODUCCION` ya tenían esa columna poblada, y el resto sesgaba hacia sobre-pedir, nunca hacia sub-pedir. O sea que, en el peor de los casos, el sistema se equivoca por exceso de precaución, no por descuido.

Con esto, una orden de producción deja de generar demanda en cuanto su pendiente llega a cero, sin importar si ya se hizo una compra o no, y sin la ventana ciega que tenía el mecanismo anterior.

## El efecto en embalaje

El módulo de pedidos de embalaje tenía exactamente el mismo patrón de exclusión por fecha —era, literalmente, una copia casi calcada del listado de materia prima, con el mismo hueco escondido en el mismo lugar. Como ambos módulos terminaron reescritos compartiendo el mismo componente para registrar demanda de producción, la corrección se heredó sola: solo cambia de dónde sale la demanda (consumo de materia prima en ordenes de produccion contra consumos de embalaje), pero la lógica de "cuánto sigue pendiente de verdad" es exactamente la misma para los dos.

## Sobre volver al papel

Este es el caso que de verdad me hizo escribir esa reflexión. Tres revisiones distintas, en momentos distintos, con perspectivas distintas, y ninguna encontró el hueco. No porque nadie supiera leer el código —lo leímos bien, la lógica de "no vuelvas a contar lo que ya compraste" es razonable a primera vista, segunda vista, y al parecer tercera vista—. El error no estaba en lo que el código hacía mal, sino en lo que el código nunca hacía: descontar lo que ya tenía dueño. Y ese tipo de ausencia es casi imposible de ver leyendo la lógica en abstracto, con la mente ya convencida de que el enfoque general es correcto.

Lo que sí funcionó fue sentarme con papel y lápiz a seguir el ejemplo completo, fecha por fecha, número por número, sin dar nada por sentado —ni siquiera las partes que ya "sabía" que estaban bien. Ahí, y solo ahí, el problema se hizo visible.

No tiene nada de malo que a tres personas se les haya escapado el mismo error. Lo que hubiera sido un problema de verdad es seguir confiando en que, como ya lo revisamos varias veces, ya no hacía falta volver a mirar.