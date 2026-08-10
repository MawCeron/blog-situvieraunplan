---
title: "Documenta tu código, por el amor de dios, documenta tu código"
description: "Por qué la documentación no es un lujo ni una pérdida de tiempo: el aceite de ricino de la programación, la Fuente Única de Verdad, y por qué hasta la documentación desactualizada sigue siendo mejor que no tener nada."
pubDate: 2026-07-22
tags: [documentación, desarrollo, buenas-practicas]
categories: [Programación, Opinión]
heroImage: '../../../assets/images/posts/heroes/documenta.png'
---

Hace poco me contactó mi antiguo jefe. Resulta que la persona que se quedó como mi reemplazo se va de la empresa (obvio no llegó a mi nivel, jajaja), y ahora una consultora externa va a encargarse de darle soporte a los sistemas para que sigan funcionando como deben. El detalle es que muchos de esos sistemas los desarrollé yo. Y como la consultora no va a estar 24/7 conviviendo con el código como sí lo estuve yo, me pidieron algo que, en el fondo, ya sabía que tarde o temprano me iba a tocar hacer: documentar todo lo que construí.

Y lo gracioso es que estoy viviendo exactamente lo mismo en mi trabajo actual, solo que del otro lado. Mantengo varios sistemas —algunos pequeños, y uno que ya [mencioné por aquí antes](/posts/git-y-el-precio-de-la-fidelidad-por-que-tu-historial-nunca-es-tan-limpio-como-quisieras/): ese monolito de PHP gigante, espagueti sin albóndigas, donde es más fácil agregarle una función nueva que tocar algo que ya existe, porque todo está interconectado de una forma tan rara que cualquier cambio mal estudiado puede tirar media aplicación sin previo aviso.

Así que, ya que el universo insiste en recordarme el mismo problema desde los dos lados del escritorio, hablemos de documentación. En serio. Alguien lo tiene que hacer, y piensa que el próximo en sufrir por su ausencia puede ser tú mismo, dentro de un año, tratando de entender por qué escribiste ese `if` tan raro.

## El caos silencioso del código sin mapa

Heredar un repositorio complejo sin documentación no es solo un reto técnico, es una negligencia financiera disfrazada de "ya lo resolveremos sobre la marcha". Entrar a un proyecto así se siente como desactivar una bomba a oscuras: cada línea es un riesgo, y cada cambio puede detonar un efecto secundario que nadie vio venir.

Ya es hora de enterrar el mito de que documentar es donde va el progreso a morir, o que es puro papeleo burocrático. En equipos de verdad, la documentación no es un "mal necesario": es el cimiento de la calidad, la escalabilidad, y la cordura mental de todos los que van a tocar ese código después de ti. Sin un mapa claro, el *onboarding* se convierte en un drenaje de tiempo y dinero, y la innovación se detiene para darle paso a la arqueología de código.

## El aceite de ricino de la programación

Aquí hay una tensión que todos en esta industria conocemos: todos exigimos documentación cuando *consumimos* software de alguien más, pero casi nadie quiere escribirla cuando le toca *producir* el suyo. Esa resistencia casi siempre nace de la presión por entregar rápido, ignorando que la falta de guías es de las causas más comunes de errores en integración y mantenimiento.

> "La documentación es el aceite de ricino de la programación. Los gerentes saben que debe ser buena porque los programadores la odian mucho".
> — Hopkins & Jeroow

Documentar se siente tedioso, sin el brillo de escribir código nuevo que sí funciona y se ve bonito en un demo. Pero es una inversión estratégica: reduce el costo a largo plazo al evitar que dos personas reinventen la misma rueda, facilita la depuración, y permite que el conocimiento se transfiera sin depender de que una sola persona lo recuerde todo de memoria (spoiler: esa persona un día se va a ir de la empresa, o simplemente se le va a olvidar).

## La Fuente Única de Verdad

Para que un equipo de ingeniería salga del caos de tener información regada en veinte lugares distintos, necesita apuntar hacia lo que se conoce como **Single Source of Truth (SSOT)**: no es simplemente un montón de archivos guardados en algún lado, es un ecosistema de información organizada que sirve como punto de referencia único para todos.

Un SSOT que de verdad funcione debería incluir:

- **Estándares de desarrollo**: procesos, frameworks y herramientas aprobadas, para que todo el equipo reme para el mismo lado.
- **Cumplimiento regulatorio**: auditorías, contratos y acuerdos legales, centralizados y fáciles de consultar cuando alguien de legal te pregunta algo a las 5pm de un viernes.
- **Un repositorio centralizado con buscador de verdad**: algo como Confluence, donde la información se pueda encontrar por título, por autor, o por etiqueta, no adivinando en qué carpeta la guardó fulano hace tres años.

Si tu "fuente de verdad" no es buscable ni está estructurada, la neta no es una fuente de verdad: es puro ruido digital con buenas intenciones.

## El código como subproducto de la documentación

Aquí viene la parte que más me gusta, porque es contraintuitiva: hay una corriente de pensamiento (la de Laitinen) que propone que el desarrollo debería estar orientado a la documentación, y no al revés. En ese modelo, los documentos de diseño son el producto valioso de verdad, y el código ejecutable es apenas un *subproducto*. Si los documentos están bien pensados, el código es simplemente la consecuencia lógica de seguirlos.

Bajo esa idea, la documentación se divide en cinco categorías con propósitos bien distintos:

1. **Descripciones de software**: el plano del sistema —arquitectura, interfaz de usuario, ese tipo de cosas.
2. **Documentos de utilización**: las guías para que un humano opere el sistema —manual de usuario, ayuda de servicio, manual de instalación.
3. **Planes de desarrollo**: el mapa de ejecución —plan de fases, gestión de riesgos, desglose del trabajo.
4. **Control de calidad**: lo que asegura que nada se rompa por el camino —reportes de inspección, planes de prueba.
5. **Administrativos**: la parte aburrida pero necesaria —contratos de mantenimiento, actas de reuniones.

No hace falta llevarlo al extremo de convertir cada proyecto en una tesis, pero la idea de fondo vale oro: si nadie puede explicar por escrito qué se supone que hace el sistema, el código que "funciona" es, en el mejor de los casos, una casualidad bien intencionada.

## Los linters: la documentación que vive dentro del código

Hay una forma de documentación que casi nadie piensa como tal, y es la más difícil de ignorar porque literalmente no te deja hacer *commit* si la rompes: los **linters**. Herramientas como ESLint, Gofmt o detekt (cada quien con el stack que le toque) funcionan como una especie de documentación activa que se aplica sola.

Esa "estandarización sintáctica" es el SSOT, pero a nivel de código, y trae beneficios muy concretos:

- **Uniformidad**: el código se lee como si lo hubiera escrito una sola persona, aunque lo hayan tocado quince, lo que le baja muchísimo la carga mental a quien lo lee después.
- **Visibilidad de la salud del código**: si lo integras al pipeline de CI/CD, cualquier deterioro se detecta al instante, no seis meses después cuando ya es un problema de producción.
- **Deuda técnica visible**: estas herramientas detectan solitas construcciones sospechosas y diseños pobres, convirtiendo la deuda técnica de un concepto abstracto que todos ignoran, a un problema concreto con una línea y un número marcados en rojo.

## La paradoja de lo desactualizado

Muchos equipos dejan de documentar por miedo a que el documento quede obsoleto en dos meses. Pero aquí hay un hallazgo curioso de la investigación de Lethbridge y compañía: los desarrolladores consideran que **incluso la documentación desactualizada sigue siendo útil**.

¿Por qué? Porque el valor real no está tanto en el "qué", sino en el *rationale*: el porqué. El código te dice qué hace el sistema hoy. La documentación —aunque ya no describa exactamente el estado actual— te explica por qué alguien tomó una decisión de arquitectura específica hace dos años.

> "El registro del *rationale* explica el razonamiento detrás de las decisiones de diseño. Esto es vital para los equipos futuros, especialmente durante la depuración o actualizaciones críticas, donde entender la intención original evita errores catastróficos."

Saber por qué se eligió una base de datos NoSQL en vez de una relacional hace dos años es información que el código actual, por sí solo, jamás te va a poder contar. Y créanme, en un monolito interconectado como el que yo mantengo, esa clase de contexto vale más que cualquier comentario tipo `// no tocar esto`.

## El README como guía de supervivencia

El README no es una formalidad ni un archivo que se llena por costumbre: es un producto de ingeniería en sí mismo, pensado para que cualquier desarrollador pueda operar un repositorio sin necesitar que alguien más le explique nada por Slack. Un buen README es la diferencia entre arrancar productivo en 15 minutos, o perder dos días haciendo ingeniería inversa a ciegas.

| Componente | Para qué sirve |
| --- | --- |
| Nombre y tecnologías | Identifica el stack para darle contexto rápido a quien llega |
| Prerrequisitos | Enlaces a utilidades y módulos externos que hacen falta antes de arrancar |
| Cómo ejecutar / probar | Instrucciones exactas para desarrollo, pruebas y producción |
| Variables de configuración | Detalle de los `.env` y parámetros que afectan al servicio |
| Estructura de carpetas | Mapa para encontrar rápido dónde vive la lógica de negocio |
| Mockups y diseños | Enlaces a Figma o archivos de diseño para alinear la parte visual |
| Documentación extendida | Enlaces a wikis o páginas con el detalle arquitectónico completo |

## Del código a la comunicación

Al final, la ingeniería de software es un proceso de aprendizaje y comunicación entre humanos, mediado por máquinas. El código le habla al procesador. La documentación le habla a las personas —a la consultora que va a mantener tus sistemas cuando ya no estés, a tu yo del futuro que va a odiar a tu yo del presente por no explicar nada, o al pobre desarrollador nuevo que hereda tu monolito sin previo aviso.

Un equipo que ignora sus documentos está condenado a repetir los mismos errores, apoyado únicamente en la tradición oral de "pregúntale a fulano, él sabe cómo funciona eso" —hasta que fulano renuncia, y entonces ya nadie sabe nada.

Así que sí, ya sé que es tedioso. Yo lo estoy viviendo ahorita mismo, del lado de "tengo que documentar todo lo que hice antes de que alguien más se quede viendo el código a las tres de la mañana sin entender nada". Pero alguien lo tiene que hacer. Y honestamente, más vale que seas tú, con contexto completo, que la próxima persona, adivinando a ciegas por qué ese `if` está ahí.

¿Su documentación —o la mía, la de ustedes, la de cualquiera— realmente está ayudando al equipo a escalar, o nada más está acumulando polvo digital en una página de Confluence que nadie ha abierto en dos años?
