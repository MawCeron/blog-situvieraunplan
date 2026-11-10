---
title: 'Myne: un editor para groff con el PDF al lado'
description: 'Myne junta editor, compilador y PDF en una ventana para escribir con groff y mom: guardas y compila. Por qué se llama así y qué le falta.'
pubDate: 2026-11-25
draft: true
tags: [groff, gtk, rust, linux]
categories: [Herramientas, Programación]
---

Tres ventanas para escribir un documento. Así se trabaja con **groff** en 2026: el editor en una, la terminal donde compilas en otra y un visor de PDF que hay que recargar a mano cada vez que cambias una coma. Para quien no lo conozca, groff es un sistema para componer documentos de los tiempos de Unix, y **mom** es un conjunto de macros para escribir documentos con él en un archivo de texto plano, con comandos que empiezan con un punto. El flujo, en teoría, es sencillísimo: escribes, corres `pdfmom` y sale un PDF. En la práctica, son esas tres ventanas y una danza que cansa rápido.

Por eso escribí **Myne**: las tres en una sola ventana. Escribes a la izquierda, ves el PDF a la derecha y cada vez que guardas, compila. Es lo mismo que hace TeXmaker con LaTeX, pero para groff. Además tiene un panel de registro con los mensajes del compilador, que se abre solo cuando algo falla.

Se llama Myne por la protagonista de _Ascendance of a Bookworm_, la misma serie de la que hablé en [el artículo de los isekais](/posts/clichekai-la-era-de-los-isekais/): una chica que renace en un mundo donde los libros son un lujo y se pone a hacerlos ella misma, desde el papel. Un editor para armar documentos parecía el lugar perfecto para su nombre. El ícono es un shumil, esa bestia pequeña parecida a un conejo que sale en las novelas, sentado sobre una hoja rayada, en un dibujo original (no es arte de la serie, que conste).

Por dentro es una sola aplicación en Rust con GTK 4, libadwaita, GtkSourceView 5 (el editor) y Poppler (el que dibuja el PDF), unas 3,000 líneas entre Rust y los archivos Blueprint que describen la interfaz. groff no viene incluido: lo toma de tu distribución. Y el **dato nerdo**: Myne no arranca ningún hilo propio. Los archivos se leen y se escriben con los métodos asíncronos de gio, y `pdfmom` corre como proceso hijo cuyo error se va leyendo línea por línea. Nada lento toca el hilo principal, así que la ventana nunca se congela mientras compila.

## Los detalles

Ninguno se ve a simple vista. El primero: Myne le pasa siempre `-k` a `pdfmom`, porque sin eso groff lee el archivo como Latin-1 y **todas las letras con acento salen mal en el PDF** —sí, todavía en 2026—. En un documento en español eso no es un detalle: es el documento entero. Por eso Myne lee las fuentes como UTF-8 y se niega a abrir un archivo que no lo sea, diciéndote por qué.

El segundo: groff termina con estado 0 aunque haya reportado errores, o sea, es como un mesero que te dice "todo bien" mientras la cocina se incendia. Así que para Myne no basta con el código de salida: cualquier mensaje marcado como `error` o `fatal error`, y cualquier error de mom, cuenta como fallo. Las advertencias, no. Para eso el compilador (`compiler.rs`) tiene un analizador que lee lo que groff escribe en stderr y lo convierte en filas con severidad, programa, archivo y línea, y casi todas sus pruebas usan salida real de groff 1.23, no mensajes inventados.

Lo tercero es lo menos vistoso, pero es el que más se nota: **una compilación fallida nunca toca el PDF.** `pdfmom` escribe en un archivo temporal oculto junto al fuente, y solo si todo salió bien lo renombra encima del PDF. Mientras tanto sigues viendo el PDF anterior, con un aviso de que la última compilación falló. Nunca ves un archivo a medio escribir ni una página en blanco. Y si guardas varias veces seguidas (Ctrl+S como metralleta), cada guardado cancela el anterior. `pdfmom` arranca a su vez groff, troff, preconv y gropdf, así que cada compilación corre en su propio grupo de procesos: cancelarla los detiene a todos y no queda nada corriendo en segundo plano.

El visor también tiene sus mañas. Dibuja solo las páginas cercanas a lo que estás viendo, a la escala de tu pantalla (así los documentos largos no se arrastran y todo se ve nítido en pantallas HiDPI). Al recargar el PDF mantiene la página, la posición y el zoom, y mientras la nueva versión se dibuja sigue mostrando la anterior, escalada, para que no haya parpadeos en blanco. Por defecto ajusta la página al ancho, y con `Ctrl` y la rueda haces zoom.

## Lo que todavía no hay

Ahora la parte fea, que es bastante. No tiene versiones ni paquetes: se compila desde el código y lo he probado en Ubuntu 24.04 y Fedora 45. No hay un `make install`: el `.desktop` y el ícono no se copian a ningún lado, o sea que los pones a mano, y las traducciones se instalan con `po/i18n.sh install`. Y en Ubuntu 24.04 hay un detalle: `blueprint-compiler` no corre si `python3` se cambió a una versión sin PyGObject, y se arregla con un wrapper de dos líneas. Está documentado en el repo.

Lo que viene tiene dos etapas. La 0.2 es para escribir con comodidad: resaltado de sintaxis para mom, errores sobre los que puedes hacer clic para saltar a su línea, autocompletado de macros y archivos recientes. La 0.3 es trabajar desde el PDF: seleccionar y copiar texto, hacer clic para ir al fuente y recompilar cuando el archivo cambie fuera de Myne. Hay dos cosas ahí que prefiero dejar claras. Seleccionar texto depende de que la librería que uso (`poppler-rs` 0.26) exponga una función que hoy no expone, así que o espero una versión nueva o llamo a `poppler-glib` directamente. Y el salto del PDF al fuente va a empezar buscando en el fuente el texto bajo el clic; un mapeo exacto, con marcadores en la salida intermedia de groff, es investigación y no lo prometo.

Myne es GPLv3 y el código está en [github.com/calmecac-dev/myne](https://github.com/calmecac-dev/myne). Tres ventanas convertidas en una, y el resto lo sigue haciendo groff, que después de todo este tiempo sigue igual de bueno y de quisquilloso. Si escribes con groff o te da curiosidad, se compila en tu máquina con unos cuantos paquetes (las instrucciones para Debian, Ubuntu y Fedora están en el README). Los issues están abiertos, sobre todo para quien venga a decirme que TeXmaker ya hacía esto desde hace años.
