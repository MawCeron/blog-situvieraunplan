---
title: 'La Leyenda del Archivo Fantasma'
description: 'La curiosa historia real de un archivo PDF fantasma que se negaba a desaparecer del servidor de la oficina.'
pubDate: 2014-12-30
tags: [anécdotas, sysadmin, windows]
categories: [Personal]
---

> [!info]
> La siguiente es una historia real que me sucedió en el trabajo, no la comparto con ustedes por la complejidad de la solución (aunque puede que a alguno le sea de utilidad) sino por lo curioso de la situación en que se presentaron los hechos. Sin más preámbulos vamos a la historia.

La mañana ocurría tranquilamente y sin problemas, yo restauraba una laptop que cambiaría de dueño, parecía que sería un día tranquilo como siempre hasta que **N**, la encargada de los aspectos financieros de la empresa, se acercó a mi lugar diciendome que tenía problemas con un archivo. Como era de esperar me mostré amable y servicial.

Me comenta que está teniendo problemas para pegar un archivo PDF en una de sus carpetas compartidas del servidor, argumentando que no tiene los permisos necesarios para hacerlo. Hasta ese momento todo parecía normal, incluso rutinario, solo debía modificar sus permisos en dicha carpeta. Sin embargo al ver los detalles de la carpeta descubro que no solo si cuenta con los permisos para hacer lo que guste en la carpeta, sino que es la propietaria de la misma. Movido por la curiosidad le pido que me muestre el proceso que sigue para ver donde podría estar el error. Los errores al copiar y pegar o cortar y pegar se limitaban a decir lo mismo: **"No cuentas con los permisos necesarios para realizar esta acción"**.

\---_¿Y si lo guardas directamente en el servidor?_ -- pregunté.

Cuando hizo lo que le pedí no me sorprendió mucho el ver aparecer el mensaje de error **"Ya existe un archivo con ese nombre en la ubicación especificada".**

\---_Pero no existe ese archivo, en serio --_ replicó N al ver aparecer el mensaje.

\---_Tal vez está oculto y por eso no lo ves --_ respondí amablemente.

Confiado, y un poco molesto por la situación tomo el mouse para demostrarle que el archivo ya existía. **Alt » Herramientas » Opciones de Carpeta » Ver » Mostrar archivos, carpetas y unidades ocultos.** Pero nada cambió, el archivo realmente no existía. O al menos eso parecía.

Voy a mi lugar, accedo al servidor y a la carpeta en cuestión y, **sorpresa**, el archivo aparece allí, existe. Y como la obviedad exige le hago notar la existencia del mismo.

\---_Algunas veces el explorador de windows no actualiza la vista de las carpetas en red, es un problema bastante común_ -- explico dando por finalizado el asunto.

\---_Pero, yo ya lo había eliminado, no tendría por qué existir_ -- argumenta N preocupada.

Acto seguido elimino el archivo en cuestión. Problema resuelto, ahora solo renombramos el otro y... **"Ya existe un archivo con el mismo nombre en la ubicación"**

\---_¿Qué carajos?_ -- espeté al ver el mensaje de error -- _si lo acabo de borrar._

Actualizo el explorador de archivos y descubro que el archivo ha reaparecido. Vuelvo a eliminarlo, actualizo y reaparece tantas veces como lo elimino. Trato de abrirlo y tal como esperaba es un archivo corrupto. Sin muchas ganas de seguir batallando decido renombrarlo para que no me genere el conflicto y no afectar la organización que tiene N en esa carpeta, pero cuando lo intento me aparece otro mensaje **"No tiene los permisos suficientes para realizar esta acción u otro usuario tiene abierto el archivo"**. En ese momento decidí darme un tiro por ignorar esa posibilidad.

Abro la consola de Windows y ejecuto **net files** para encontrar que usuarios de red están ejecutando el archivo. Y en el listado me aparece que se trata de **E**, la encargada de logística, lo cual no es posible debido a que se encuentra de incapacidad desde hace varias semanas y cuyo equipo mantengo en resguardo y por lo tanto apagado. Era simplemente imposible. Decidí "cerrar" el archivo, claramente fantasma, desde consola (**net files IDdelArchivo /close**) esperando que funcionara... **"No existe ningún archivo con esa ID ejecutandose"**, reviso la carpeta y el archivo desapareció sin dejar rastro. Simplemente dejo de existir. Con el problema aparentemente resuelto decidí no investigar más y continuar con mi trabajo.

**Fuck this shit!!**
