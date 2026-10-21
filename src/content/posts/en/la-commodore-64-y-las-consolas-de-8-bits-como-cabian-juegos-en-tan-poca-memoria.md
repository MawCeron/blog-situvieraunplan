---
title: 'La Commodore 64 y las consolas de 8 bits: cómo cabían juegos en tan poca memoria'
description: 'Una Commodore 64 tenía 64 KB de RAM y una NES, apenas 2 KB. Los trucos con los que cabían juegos enteros en eso: tiles reutilizados, bank switching y universos generados con una semilla.'
pubDate: 2026-12-07
draft: true
tags: [historia, hardware, videojuegos]
categories: [Geek, Tecnología]
---

Una sola foto de tu celular pesa más que toda la memoria de una Commodore 64. Y aun así esa computadora corría juegos con scroll, música de tres voces y niveles que todavía se recuerdan con cariño. Siempre me ha dado vueltas en la cabeza cómo diablos lo lograban.

Para ponerlo en contexto: la Commodore 64 salió en 1982 con 64 KB de RAM, un procesador MOS 6510 que andaba alrededor de 1 MHz, un chip de video (el VIC-II) capaz de mostrar 16 colores y sprites por hardware, y un chip de sonido, el SID, con tres voces programables. Según las [estimaciones más conservadoras](https://en.wikipedia.org/wiki/Commodore_64) vendió entre 12.5 y 17 millones de unidades. La NES, por su parte, tenía 2 KB de RAM de trabajo en la placa (sí, **dos**) y más memoria de video aparte, y aun así de ahí salieron Mario, Zelda y Metroid.

¿El truco? No había uno solo, sino un montón de pequeñas trampas bien pensadas, todas con la misma filosofía: nunca guardes algo que puedas calcular, repetir o reciclar.

La más famosa es la reutilización de gráficos. En la época, las pantallas no se guardaban como imágenes completas sino como cuadrículas de *tiles*, mosaicos pequeños que se combinaban para formar el fondo. Un tile de pasto es el mismo en toda la pantalla, y con eso ya ahorraste cientos de bytes. Hay un ejemplo clásico en *Super Mario Bros.*: las nubes y los arbustos usan [los mismos sprites con distinta paleta de color](https://www.metmuseum.org/perspectives/making-super-mario-clouds). Nube blanca en el cielo, arbusto verde en el suelo, un solo dibujo. La memoria era tan escasa que los artistas tenían que ser tacaños con cada píxel, y eso moldeó el estilo visual de toda una generación.

Con el sonido pasaba algo parecido. La música no era audio grabado (eso hubiera ocupado toda la memoria disponible varias veces) sino una lista de notas, duraciones y pequeñas instrucciones que los chips de sonido sintetizaban en tiempo real. Una melodía entera ocupaba una fracción minúscula de la memoria.

Otro recurso eran los niveles descritos como instrucciones y no como mapas. En vez de guardar cada bloque de un escenario, el juego almacenaba algo como "pon un tubo en esta posición, una fila de ladrillos aquí, tres enemigos allá", y el motor armaba el nivel al vuelo. Es el equivalente a mandar una receta en vez del pastel.

El ejemplo que mejor conozco, porque me pasé meses desarmándolo, es *Circus Charlie*. La versión de Famicom de 1986 viene en un cartucho tipo NROM, el más sencillo que existe, sin ningún chip extra: **16 KB** de programa, 8 KB de gráficos y 2 KB de RAM. Con eso hay un payaso, un león, aros de fuego, changos, física, colisiones, vidas y puntuación. Toda la lógica corre en una sola rutina que se dispara sesenta veces por segundo, y hasta los puntos se guardan en BCD, un truco viejísimo que reserva medio byte por cada dígito decimal para no tener que convertir el número cada vez que hay que dibujarlo en pantalla. Cuento cómo lo desarmé, byte por byte, en [este post](/posts/como-se-descifra-un-juego-de-nes-sin-codigo-fuente/). Y la conclusión a la que llegué es la misma que ahora: un cartucho de 16 KB puede ser mucho más complejo que muchos programas modernos de cientos de megas.

Cuando incluso eso no alcanzaba, entraba el *bank switching*. El procesador de la NES, igual que el de la C64, solo podía "ver" 64 KB de direcciones a la vez, pero los cartuchos podían traer mucha más memoria y [chips llamados *mappers*](https://en.wikipedia.org/wiki/Memory_management_controller) que intercambiaban bloques ("bancos") dentro de ese rango, como si cambiaran páginas de un libro bajo una lupa fija. Así crecieron los juegos de la NES a medida que pasaron los años.

Y luego está mi truco favorito de todos: no guardar el universo, guardar la semilla. *Elite* (1984), que corría en una BBC Micro con 32 KB de RAM, tenía [ocho galaxias de 256 planetas cada una](https://www.gamedeveloper.com/game-platforms/feature-the-history-of-i-elite-i-), o sea 2,048 mundos, cada uno con su nombre, su economía y su tipo de gobierno. Nada de eso estaba almacenado. Todo se generaba a partir de [un puñado de números semilla](https://elite.bbcelite.com/deep_dives/galaxy_and_system_seeds.html), con una fórmula que siempre devolvía el mismo resultado para el mismo planeta. David Braben contó que, de hecho, tuvieron que "elegir las galaxias a ojo" y descartar las que no se veían bien. Más o menos lo que hoy llamaríamos generación procedural, solo que hecha a mano, en ensamblador y con la calculadora de la época.

Hay mucho de esto que ya no necesitamos, porque hoy la memoria sobra. Pero por eso mismo me parece fascinante: esas limitaciones obligaron a que cada byte tuviera que justificar su existencia, y de ahí salieron soluciones que todavía se enseñan.
