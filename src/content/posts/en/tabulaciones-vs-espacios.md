---
title: 'Tabulaciones vs. espacios'
description: 'La guerra santa más inútil de la programación: qué dice cada lenguaje, qué descubrió una encuesta de Stack Overflow y por qué me importa más que decida una herramienta.'
pubDate: 2026-11-23
draft: true
tags: [programación, humor, opinión]
categories: [Programación, Opinión]
---

Hay discusiones que uno cree resueltas hasta que alguien pregunta, con la mejor de las intenciones, "¿ustedes usan tabs o espacios?". Y en ese momento la oficina entera se divide en dos bandos, alguien saca una cita de un estándar y alguien más amenaza con renunciar. Es, probablemente, la guerra santa más inútil de la programación: nadie ha cambiado de bando por un argumento, y aun así seguimos dándole.

Lo curioso es que ya hay respuesta, nomás que depende de en qué lenguaje estés parado. En Python, la guía de estilo oficial (PEP 8) pide espacios, cuatro por nivel. En PHP, los estándares de estilo (PSR-2 y su sucesor PSR-12) también piden cuatro espacios y prohíben las tabulaciones para indentar. En Go es al revés: `gofmt`, el formateador oficial, indenta con tabulaciones y punto, sin discusión. Y en los Makefile la tabulación ni siquiera es una preferencia, es obligatoria: las líneas de una receta tienen que empezar con una, y si pones espacios te sale un error tan críptico que lo aprendes a golpes (y lo recuerdas para siempre).

Los defensores de las tabs tienen un argumento que no es nada tonto: una tabulación es *un nivel de indentación*, no un número de columnas, así que cada quien puede configurar su editor para verla de dos, cuatro u ocho espacios sin tocar el archivo. Es una ventaja real, sobre todo en accesibilidad: hay gente que necesita indentaciones más anchas, o más angostas, para leer cómodamente. Los de los espacios responden con lo de siempre: que el código se ve igual en cualquier lado, que los diffs no se descuadran y que no hay forma de que alguien mezcle tabs y espacios y deje todo chueco (aunque, la neta, eso lo hace cualquiera con un editor mal configurado).

Mi parte favorita de toda esta saga es la encuesta de Stack Overflow de 2017. David Robinson analizó los datos de [28,657 desarrolladores profesionales](https://stackoverflow.blog/2017/06/15/developers-use-spaces-make-money-use-tabs) que contestaron esta pregunta: el 40.7% usaba tabs, el 41.8% espacios y el resto un poco de cada uno. De los que además dijeron cuánto ganaban, la mediana de quienes usaban espacios era de 59,140 dólares, contra 43,750 de los que usaban tabs. El mismo autor aclara que no es concluyente y que la diferencia puede deberse a otras cosas, como el país o el lenguaje. Así que no, pasarte a los espacios no te va a subir el sueldo. Pero ahora ya tienes un dato para el siguiente pleito.

Yo, la verdad, ya no peleo. En Go no tengo opción, porque `gofmt` decide por mí y a estas alturas ni lo noto (así van mis proyectos, como [lazyftp](/posts/lazyftp-como-filezilla-pero-en-la-terminal/)). En el trabajo, el monolito de PHP usa espacios y se acabó la discusión. Y lo que de verdad me quita el sueño no es cuál de los dos elijas, sino que lo elija **una herramienta** y no la memoria del último que tocó el archivo. Esa es la misma lógica de los linters que ya he defendido [por aquí](/posts/documenta-tu-codigo-por-el-amor-de-dios-documenta-tu-codigo/): lo que se vuelve regla automática deja de ser pleito. Un archivo `.editorconfig` en la raíz del proyecto, un formateador en el pipeline, y listo. Nadie se enoja con una máquina.

Eso sí: si alguna vez me ven mezclando tabs y espacios en el mismo archivo, ese día pueden quitarme el teclado. Ahí sí no hay defensa posible.
