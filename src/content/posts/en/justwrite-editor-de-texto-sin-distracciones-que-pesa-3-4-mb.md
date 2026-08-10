---
title: "justwrite: un editor de texto sin distracciones que pesa 3.4 MB"
description: "La historia detrás de justwrite v0.1.0: por qué empecé en Rust, por qué terminé en Go, y algunas decisiones raras que tomé en el camino."
pubDate: 2026-08-10
tags: [go, tui, herramientas, open-source]
categories: [Herramientas, Programación]
heroImage: '../../../assets/images/posts/heroes/justwrite.png'
---

Terminé un proyecto nuevo. Bueno, al menos su primera versión: **v0.1.0**. Otra herramienta de terminal tipo TUI, pero esta vez nada de servidores ni de archivos —es un editor de texto sin distracciones, estilo FocusWriter, pero que pesa unos cuantos megas en lugar de necesitar un entorno gráfico completo. Al final, solo lo quiero para escribir.

Se llama **justwrite**, y tomé toda la experiencia de haber construido [lazyftp](/posts/lazyftp-como-filezilla-pero-en-la-terminal/) para empezar este proyecto hace tres meses. Solo que esta vez arranqué en Rust... y a medio camino decidí cambiarme a Go.

## La idea

La mayoría de los editores de terminal están pensados para código: números de línea, resaltado de sintaxis, gutter, todo el kit. justwrite está pensado para lo otro que uno suele escribir en una computadora: oraciones. Así que no tiene nada de eso. El área de texto va centrada, sin marco, y nunca es más ancha de 82 columnas —ese ancho no lo saqué de la nada, es más o menos el de una página de un libro promedio, la medida que el ojo puede seguir sin perderse al saltar de línea. Todo lo demás que el programa necesita decir vive en una sola línea al pie: versión, documento, y el atajo a la ayuda.

Es un binario estático de 3.4 MB, sin necesidad de servidor gráfico, así que corre igual en una computadora de escritorio, una laptop, un servidor o en un dispositivo de escritura dedicado sin entorno gráfico hecho con una raspberry pi. Que mencione eso no es casualidad, fue la restricción que terminó definiendo varias de las decisiones raras que tomé después.

## Por qué terminé escribiendo mi propio editor de texto a mano

Cuando decidí hacer un editor de texto en GoLang, la decisión obvia era utilizar Charm (de los que hacen Bubble Tea), pues ya traen un widget de textarea listo para usar. Era el punto de partida obvio, y lo intenté. El problema es que no soporta selección de texto, no agrupa una racha de tecleo en un solo paso de deshacer, y controla su propio cursor a su manera. Para un editor donde seleccionar y deshacer *son* la experiencia, esas tres cosas no son opcionales.

Así que terminé escribiendo el buffer, el ajuste de línea, la selección y el historial de deshacer a mano. Como 640 líneas que una dependencia normalmente te hubiera regalado gratis, y que ahora tengo que mantener yo. Ni modo.

Lo del deshacer, de hecho, quedó bastante bien: en lugar de deshacer letra por letra (una pesadilla), agrupa rachas completas de tecleo en un solo paso, y las corta cuando aparece un espacio, un salto de línea, o guardas el archivo. Un `Ctrl+Z` te regresa una palabra entera, no un caracter.

## El portapapeles fue el dolor de cabeza más interesante

Copiar y pegar en una terminal remota, sobre SSH, sin servidor gráfico, es más complicado de lo que parece. La solución que terminé usando es OSC 52: una secuencia de escape que el propio emulador de terminal intercepta y maneja él mismo, sin que justwrite necesite tocar el portapapeles del sistema para nada. Eso significa que copiar funciona igual de bien dentro de tmux, sobre SSH, o en el dispositivo sin entorno gráfico que mencioné arriba —justo los casos donde una librería de portapapeles normal no serviría de nada.

La contraparte es que leer el portapapeles del sistema para *pegar* ya no es tan directo, así que ahí me apoyo en el *bracketed paste* que la propia terminal ya sabe hacer.

## Ctrl+C copia, no cierra el programa

Esta decisión seguro le va a chocar a alguien: en justwrite, `Ctrl+C` copia texto, en lugar de matar el programa. Sé que rompe la convención de terminal de toda la vida, pero es un editor, no un visor —la memoria muscular de copiar con `Ctrl+C` vale más que respetar una convención que, en modo raw, ni siquiera llega como señal real. Para salir está `Ctrl+Q`, y un `SIGTERM` de verdad sigue cerrando todo limpio, como debe ser.

## Reescribirlo sacó bugs que llevaban tiempo escondidos

Lo más honesto que puedo decir sobre el cambio de Rust a Go es esto: reimplementar el mismo diseño desde cero me hizo encontrar bugs que llevaban meses escondidos sin que los notara. El más tonto fue uno de guardado: si el guardado fallaba (disco lleno, archivo de solo lectura, lo que sea), el error se descartaba en silencio y tú seguías escribiendo felizmente en un documento que en realidad no se estaba guardando. Otro, más gracioso: en Windows, presionar solo Shift o Ctrl mandaba un caracter NUL invisible que se colaba al documento y lo marcaba como modificado sin que hubieras escrito nada.

Ninguno de los dos era un bug enorme, pero los dos son el tipo de cosa que uno solo encuentra reescribiendo el mismo código con ojos nuevos.

## Sobre lo de Rust

Ya que estamos siendo honestos: justwrite arrancó en Rust, y hay una implementación archivada de esa versión en `MawCeron/justwrite-rust` que llegó a tener un release, pero afortunadamente, nadie peló. Después de tres meses peleando más con el *borrow checker* que con el diseño del editor en sí, y viendo lo bien que me había ido con Go en lazyftp, la decisión de cambiar se sintió más práctica que dramática. Nada de drama, nada de "Rust me traumó" —simplemente Go me dejaba moverme más rápido para este proyecto en particular.

## Lo que todavía no hace

Para que quede claro y nadie lo descubra por sorpresa: no hay búsqueda dentro del documento, solo abres un archivo a la vez (sin pestañas ni splits, después de todo no es ese tipo de editor), no hay soporte para caracteres anchos tipo CJK o emoji, y no hay ni un archivo de configuración —la paleta de colores y el ancho de 82 columnas están fijos en tiempo de compilación (tal vez más adelante haga temas y cosas así). Es una decisión, no un pendiente urgente.

---

Si quieren echarle un ojo o criticar el código nomás por diversión, está en [github.com/MawCeron/justwrite](https://github.com/MawCeron/justwrite), MIT, v0.1.0.
