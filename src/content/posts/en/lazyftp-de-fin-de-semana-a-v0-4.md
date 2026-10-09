---
title: "lazyftp seis meses después: de experimento de fin de semana a v0.4"
description: "Qué le ha pasado a lazyftp desde que lo presenté: de un cliente que solo transfería archivos a uno que renombra, borra, guarda conexiones, usa llaves SSH, verifica servidores y hasta acepta temas de color."
pubDate: 2026-10-12
draft: true
tags: [go, tui, ftp, sftp, open-source]
categories: [Herramientas, Programación]
heroImage: https://raw.githubusercontent.com/MawCeron/lazyftp/develop/assets/demo.gif
---

En abril, unos días antes de que pasara **"eso"** (de lo que sinceramente no me acuerdo si ya les hablé), les platiqué [sobre lazyftp](/posts/lazyftp-como-filezilla-pero-en-la-terminal/) un pequeño experimento de fin de semana que servía para lo que la quería: abrías, conectabas, navegabas y transferías. Y ya, nada más. Y tuve la osadía de terminar aquel post con una lista de pendientes, lindos *nice to have*, que uno escribe sabiendo que si alguien las va a cumplir, muy probablemente no sea el que las escribió.

¿Qué creen? Pues resulta que sí se cumplieron, casi todas. Tuve la brillante idea de compartir en Reddit (como lo amo y lo desprecio a la vez) el proyecto, una cosa llevo a otra y hoy lazyftp ya va en la **v0.4.1**, tiene siete releases publicados (varios de puras correcciones de bugs), 22 estrellas en GitHub y seis forks (seis, ¡alguien le hizo fork a mi proyecto!, todavía no sé si sentirme halagado o pedir disculpas).

No les voy a hacer un changelog, para eso está el repo y ahí lo pueden ver [completito](https://github.com/MawCeron/lazyftp/blob/develop/CHANGELOG.md). Mejor les cuento las tres cosas que más me enseñaron en estos meses.

## Dos líneas. Eso era todo lo que cabía

Arreglé unos bugs y antes de meterle cualquier cosa nueva me puse a revisar mi propia interfaz contra una lista de buenas prácticas para TUIs, y la neta no debí hacerlo. En una terminal de 80×24 **los paneles de archivos mostraban dos entradas.** Dos. El resto era marco, formulario y puro relleno, cual anime de Naruto.

El culpable era sobre todo el formulario de conexión, que se comía como una quinta parte de la pantalla para algo que usas una sola vez por sesión y luego se queda allí como chinito, nomás *milando*, o sea, como que no tiene mucho sentido. Ahora es una ventana flotante (`Ctrl+L`) que sale cuando la necesitas y se va cuando no. Y ya que estaba en eso hice que el diseño se adapte al tamaño de la terminal: dos paneles completos si la pantalla es grande, uno solo con `Tab` si es chica, y un mensaje de "terminal demasiado pequeña" en lugar de un render roto que no se entiende.

Ya entrados en detalles, ahora los paneles por fin muestran tamaño y fecha, se pueden ordenar y filtrar con búsqueda difusa (`/`), esta última cortesía de [@OdaloV](https://github.com/OdaloV), que se tomó la molestia de contribuir y a quien le debo una cheve virtual —o real si alguna vez me doy una vuelta por Kenia.

También aprendí un par de lecciones bastante humillantes:
1. Si truncas los nombres por bytes y no por ancho de pantalla, partes los acentos a la mitad (con chingos de archivos en español, qué ironía). 
2. Distinguir un archivo marcado de uno seleccionado solo por el color de fondo no le sirve a todo el mundo, y eso no lo pensé hasta que alguien me lo hizo notar, o sea, tarde.

## Un cliente que le creía a cualquiera

Hasta la v0.3, lazyftp aceptaba *cualquier* llave de host sin decir nada, ni una pregunta ni un aviso. Ni siquiera se planteaba preguntarse si era realmente el equipo al que debía conectarse. Era un detallito, de esos que dejas con el "luego lo arreglo" y que se quedan ahí meses, ya saben cómo es esto.

Ahora compara contra `known_hosts`: si el servidor es nuevo te pregunta mostrándote su huella digital, y si la llave cambió rechaza la conexión y ya. También aprendió a usar llaves SSH y `ssh-agent`, que era el pendiente más obvio de la lista, porque con solo contraseña los servidores que exigen llave no se podían ni tocar. SFTP ahora prueba primero el agente y las llaves por defecto de `~/.ssh` antes de caer a la contraseña, y el registro te dice cuál fue la que funcionó.

Y dos decisiones de seguridad que tomé a propósito: las contraseñas **nunca, pero nunca** van en archivos de texto (se guardan, solo si tú lo pides, en el llavero del sistema), y desde la línea de comandos puedes hacer `lazyftp ana@nas.lan` o `lazyftp sftp://ana@nas.lan:2222` y conectarte directo, pero la contraseña **no se acepta como argumento**, pa' que no se te quede en el historial de la shell. Con eso no se juega, además no quiero quejas de "cualquiera puede ver mi contraseña".

## El bug de la pregunta invisible

No hay nada que te devuelva a la triste y humana realidad más rápido que un bug vergonzoso, y la v0.4.1 existe por uno. ¿Ven que hace dos párrafos les dije que ahora te pregunta si un servidor es de confianza mostrándote su huellita? Bueno, pues resulta y acontece que la pregunta de "¿confías en este servidor?" que acabo de describir no se dibujaba cuando la conexión se iniciaba desde el diálogo de conexión... que es justo como empieza *toda* conexión. Lo primerito que hay que hacer, *the first step*. La pantalla decía `CONNECTING` y el programa se quedaba esperando una respuesta que nadie sabía que le estaban pidiendo, porque aunque técnicamente ahí estaba no se veía, eso sí, le había quitado el límite de tiempo a la conexión para que pudieras leer el mensaje, la huella y toda la cosa, bien amable y bondadoso uno, así que el programa se quedba ahí colgado, esperando su respuesta... y esperando... y esperando... y esperando...

Tuve que corregirlo el mismo día que la v0.4.0, por suerte me di cuenta a los pocos minutos de haber hecho el release. La lección es que si implementas una pregunta de seguridad y la pruebas nada más por la ruta feliz, lo más seguro es que algún usuario se quede viendo una pantalla congelada preguntándose ¿qué *pashó*? o si hizo algo mal.

## Y luego, todo lo demás

Ahí les va un resumen del resto de cosas que se implementaron: ya se pueden crear directorios, renombrar y borrar en cualquiera de los dos paneles; se pueden descargar directorios completos (antes solo servía para subir, imagínense); hay favoritos, historial de conexiones y soporte para los servidores que ya tienes en `~/.ssh/config` así ya te puedes conectar de volada sin tener que estar ingresando todos los datos; la sesión SFTP se reabre sola si el servidor la tumba por inactividad; y los colores se cambian con un archivo TOML, con Catppuccin Mocha y Latte incluidos —así bien monito todo— y hasta un tema estilo Borland, por pura nostalgia (y porque, ¿por qué no?). Cada versión trae además paquetes `.deb` y `.rpm` y binarios para Linux, macOS y Windows, pa' que lo puedas instalar un martes por la tarde sin batallar mucho.

## Lo que sigue

De mi lista de abril ya nomás quedan:

- **Cambiar permisos** de archivos remotos (solo en SFTP, porque la librería FTP que uso no tiene `chmod`).
- **Transferencias cancelables**, con un límite de concurrencia: hoy cada transferencia lanza su propia goroutine y no hay forma de abortarla.
- **Protección contra sobreescritura**, porque hoy un archivo que ya existe se pisa en silencio, sin preguntar nada.
- Velocidad y tiempo estimado de transferencia, y confirmar antes de salir si hay transferencias en curso.

Eso es la v0.5.0. Después la idea es estabilizar el formato de configuración y las teclas para poder comprometerme con ellas, y etiquetar la **v1.0**. Y cómo decían los abuelos, *de ahí pa'l real*.

Hay una idea que dejé fuera a propósito: espejar directorios. Para decidir qué "difiere" se necesitan garantías que el FTP simple no da, y un espejo que se equivoca se salta un archivo cambiado sin avisar, que es de lo peor que te puede pasar. Para eso ya existen rsync y lftp, y lo hacen mejor de lo que yo lo haría. Lo mismo con editar o previsualizar archivos remotos: lazyftp mueve archivos y ya, el editor que tú ya tienes es mejor para lo demás.

Tal y como dije en el primer post, el proyecto sigue sin tener una gran visión. Todo va saliendo del mismo ciclo de "esto me molesta, lo arreglo, lo uso", solo que ahora con más gente molestándose con el código y por ende molestándose conmigo por lo que terminan molestándome para que lo arregle, lo que curiosamente resulta ser un excelente motivador, si no, de seguro ya habría dejado esto por la paz mucho antes de la v0.2.

Si ya lo usas o quieres probarlo, el repo está en [github.com/MawCeron/lazyftp](https://github.com/MawCeron/lazyftp), con paquetes para Linux, macOS y Windows en la [página de releases](https://github.com/MawCeron/lazyftp/releases/latest). Y como siempre los issues y las críticas a mi código siguen abiertos y son bien recibidos.