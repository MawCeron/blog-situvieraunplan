---
title: "Mailpit: el salvavidas que te evita mandar un correo real por accidente"
description: "Qué es Mailpit, el sucesor de MailHog, y cómo lo usé para probar el envío automático de órdenes de compra a proveedores sin arriesgarme a mandarles un correo real de prueba."
pubDate: 2026-08-07
tags: [docker, desarrollo, herramientas]
categories: [Programación, Herramientas]
heroImage: '../../../assets/images/posts/heroes/mailpit.png'
---

En la chamba me tocó reescribir el módulo que genera las órdenes de compra de materias primas. Una de las características que tiene ese módulo es que, en automático, manda la OC por correo a los proveedores correspondientes en cuanto seleccionas los materiales. Muy práctico cuando ya está en producción, un dolor de cabeza cuando lo estás probando.

Porque, ¿cómo pruebas que el envío funciona sin que el sistema le mande de verdad una orden de compra a un proveedor real? No podía andar mandándoles correos de prueba así nomás, y mucho menos andar hablándoles después uno por uno para decirles "oye, ignora esa OC, era una prueba, no le hagan ningún cambio a nada". Eso hubiera sido peor que el bug que estaba tratando de arreglar.

Ahí es donde entra **Mailpit**, y honestamente, después de usarlo, cuesta trabajo entender cómo se sobrevivía sin él.

## Qué es Mailpit (y por qué reemplazó a MailHog)

Mailpit es un servidor SMTP falso pensado exclusivamente para desarrollo: se para en medio de tu aplicación y el mundo real, atrapa **todos** los correos que tu sistema intenta enviar, y nunca deja que salga ni uno solo. En lugar de eso, te los muestra en una interfaz web sencilla donde puedes revisarlos como si fuera tu propio inbox.

Es el sucesor espiritual de **MailHog**, que durante años fue la herramienta de facto para esto, pero que ya lleva tiempo sin mantenimiento activo. Mailpit retoma la misma idea —y de hecho es prácticamente un reemplazo directo, con soporte compatible con la API de MailHog para quien ya tenía todo integrado—, pero reescrito desde cero en Go, más rápido, más ligero, y con bastantes más funciones encima.

## Cómo levantarlo

Lo más simple es con Docker:

```bash
docker run -d \
  --name mailpit \
  -p 8025:8025 \
  -p 1025:1025 \
  axllent/mailpit
```

El puerto `1025` es el SMTP donde tu aplicación va a mandar los correos, y el `8025` es la interfaz web donde los vas a poder revisar.

Si prefieres tenerlo como parte de tu `docker-compose.yml` junto con el resto de tu stack de desarrollo, queda igual de simple:

```yaml
services:
  mailpit:
    image: axllent/mailpit
    ports:
      - "8025:8025"
      - "1025:1025"
    restart: unless-stopped
```

## Apuntar tu aplicación a Mailpit

Aquí no hay ciencia. Los cambios en la configuración de correo de la app fueron: **host a `localhost`**, **puerto a `1025`**, y **desactivar el SSL/TLS**. Con esos tres ajustes fue suficiente, sin tocar nada más de la lógica de envío.

Tiene sentido si lo piensas: Mailpit no necesita cifrar nada porque el correo nunca sale de tu máquina, así que insistir en SSL/TLS contra él simplemente hace que la conexión falle. En cuanto apuntas al host y puerto correctos, y le quitas esa exigencia de cifrado a tu app, todo empieza a fluir directo hacia la interfaz web sin más ajustes.

## Lo que más se agradece

Más allá de simplemente "atrapar" el correo, hay un par de cosas de Mailpit que se sienten como un lujo una vez que las usas:

- **Vista previa real de HTML y texto plano**: puedes ver exactamente cómo se va a ver tu correo en un cliente real, con las dos versiones lado a lado.
- **Búsqueda y filtros**: si tu sistema manda decenas de correos durante una prueba, puedes buscar por remitente, destinatario, asunto, o contenido, en lugar de scrollear a lo loco.
- **API HTTP**: puedes consultar los correos capturados desde tus pruebas automatizadas, lo cual es oro puro para tests de integración que necesitan verificar que se mandó (o no se mandó) cierto correo.
- **Adjuntos visibles**: si tu sistema manda un PDF adjunto —una factura, un reporte—, lo puedes abrir directo desde la interfaz sin tener que descifrar el `base64` a mano.
- **Análisis básico de spam**: Mailpit puede darte una idea de qué tan probable es que tu correo termine en spam, útil para no descubrirlo hasta que ya esté en producción.

Y hablando de la vista previa: no solo sirve para confirmar que el correo *se manda*, sino para cachar que esté bien *construido*. A mí, por ejemplo, me sirvió para darme cuenta de que no estaba embebiendo bien el logo dentro del correo, y de que no estaba mandando el texto con el *encoding* correcto —me salían puros símbolos raros donde deberían ir los acentos, la eñe, y demás. Ese tipo de detalles siempre es mejor encontrarlos ahí, en tu propia máquina, que en el inbox de un proveedor. Qué pena mandar algo mal hecho y terminar dando una imagen poco profesional —habrá a quien le valga, pero a mí no.

## La tranquilidad que compra

Al final, lo que Mailpit realmente vende no es la interfaz bonita (porque no lo es, tampoco es fea... es... funcional) ni la API —es la tranquilidad de poder correr pruebas contra una copia completa de tu base de datos de producción sin el riesgo constante de que algo se te escape. Ordenes de compra de prueba, reportes de ventas con clientes reales, correos de bienvenida disparados sin querer durante un *seed*... todo eso se queda encerrado en Mailpit, donde pertenece, hasta que tú decides que sí quieres que salga de verdad.

Si todavía estás probando envío de correo apuntando directo a tu proveedor real "con cuidado", ya sabes qué instalar hoy mismo.
