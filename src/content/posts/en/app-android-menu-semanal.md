---
title: 'App Android: Menú Semanal'
description: 'Una app para Android que ayuda a decidir qué cocinar cada semana generando menús aleatorios a partir de tus propios platillos.'
pubDate: 2016-03-18
tags: [android, java, sqlite, desarrollo-móvil]
categories: [Desarrollo Móvil]
---

Hace rato que no escribía en el blog sobre temas que no sean el **podcast** o **fotografía,** y parte de eso es por que la gran mayoría de los temas sobre los que me gustaría escribir se me olvidan o una vez terminado considero que serían mejor para un _podcast._ En fin, soy todo un caso...

Si me conocen seguramente ya saben las siguientes cuatro cosas: _Vivo solo, soy algo perezoso, me encanta cocinar y mi vida es programar software._ Pues bien, cuando uno vive solo no hay nadie que le haga de comer y comprar comida todos los días puede resultar bastante costoso cuando comes en proporciones mayores a las de una persona normal (_#forevergordito_). Así que como es obvio, uno mismo tiene que preparar su alimento, cuando eres como yo que te gusta cocinar el problema no es prepararlo, sino decidir qué preparar. Ahora, el problema aumenta cuando trabajas todo el día y tienes que hacer las compras para toda la semana durante el fin de semana. Es por eso que desarrollé esta aplicación, para facilitar el proceso de decisión.

Utilizarla es bastante sencillo, simplemente agregas al listado de platillos todos los que sabes preparar, así nunca te sugerirá nada que no sepas como cocinar -- aunque por si las dudas ya incluye 7 platillos genéricos que pueden quitar o cambiar si así lo desean --. Una vez con la lista de platillos terminada puedes ir generando tantos menús como desees, si eres muy riguroso puedes tomarlo como menús fijos y puedes estar seguro de que no repetirás platillos hasta que la lista se termine, por lo que entre mas platillos tengas en la lista mas tardarás en volver a comer lo mismo. O puedes en lugar de platillos colocar lugares donde comer si también te parece una dificil decisión, por ejemplo desde el puesto de garnachas de la esquina hasta el restaurante de moda entre tus amigo. Obviamente solo te genera recomendaciones que puedes seguir religiosamente, o como yo, simplemente tomarlo como ideas para la semana y decidir en base a ellas. Les dejo unas capturas de la app, pueden dar clic en ellas para verlas en todo su esplendor:

\[gallery columns="4" ids="815,818,817,816"\]

Para instalarla solo tienen que habilitar la instalación desde fuentes desconocidas, **[descargar el APK](https://www.dropbox.com/s/jep2rpghe1tg8yb/MenuSemanal-1.0.apk?dl=1)** en su teléfono, y ejecutarlo. Y claro pueden mandarme sus sugerencias sobre la misma.

### ¿Por qué hacer la App?

Esta es la primer aplicación funcional que termino fuera de las que hago para probar cosas nuevas o de las que programo para el trabajo, por lo que personalmente fue un reto interesante. La idea surgió de un script que programe al poco tiempo de llegar a la casa en que vivo actualmente, dicho script está escrito en **Python** y realiza la misma tarea tomando los platillos desde un archivo de texto. Esta curiosa forma de elegir cada semana mi menú, y en base a eso hacer las compras, llamó la atención de mi madre y se la comentó algunos familiares. La sorpresa fue que la respuesta de muchos fue: _"ojala yo tuviera algo así"_ o _"a mi hija le ayudaría mucho"_. Lo más facil habría sido enviarles el script y asunto arreglado, pero muchos de ellos son personas completamente ajenas al mundo tecnológico así que la opción más obvia era hacerlo fácil para ellos. Así que me decidí a generar una aplicación para celular.

### Retos al programarla

Cuando empecé este proyecto todo lo que había hecho era programar aplicaciones simples que mostraran una acción sencilla con un botón. El primer reto con el que me encontré era la lista de platillos, como ya comenté originalmente yo los tomaba de un **archivo txt** y una vez usado los enviaba a otro, sin embargo en **Android** eso era demasiado rebuscado, así que decidí implementar una pequeña base de datos con una sola tabla en la que tenía el platillo y su estatus (usado o sin usar).

Una vez que comprendí como generar la base de datos usando _**SQLite**_ y como controlar los mismos solo me tuve que preocupar por la presentación de la misma. Y este aprendizaje terminó ayudándome para desarrollar posteriormente una aplicación más compleja usando bases de datos en el trabajo.

Otro aspecto que me dio algunos problemas fue la forma de elegir los platillos, originalmente pensaba obtener de la base de datos todos los platillos que no habían sido utilizados, ponerlos en un arreglo y seleccionar 5 de forma aleatoria, ponerlos en otro arreglo, mostrarlos en la app y actualizar su estatus en la base de datos a usado. Sin embargo la pereza me llevó a descubrir que podía obtener los 5 platillos de forma aleatoria **directamente desde la base de datos** y usando el mismo resultado actualizar el estatus de los mismos. Solo tenía que ejecutar una busqueda similar a la siguiente:

```
SELECT * FROM table ORDER BY RANDOM() LIMIT 5;
```

Con esta app aprendí bastante sobre el manejo de bases de datos en Android, las características de los **ArrayAdapters,** así como de los diferentes usos que podemos darle a los **ListViews.** Me llevó cerca de dos semanas programarla por ratos durante la tarde, pero aprendí mucho en el proceso. Y como creo que ya los aburrí lo dejo hasta ahí. Si alguien tiene una duda de como funciona o quiere saber más al respecto con gusto recibo sus preguntas y trataré de contestarlas lo mejor posible.

_**Salu2 a todos.**_
