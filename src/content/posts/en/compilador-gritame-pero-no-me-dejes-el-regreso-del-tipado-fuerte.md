---
title: 'Compilador, grítame pero no me dejes: El regreso del tipado fuerte'
description: 'Una reflexión sobre por qué lenguajes de tipado fuerte como Go, Kotlin, Swift y Rust están teniendo un resurgimiento, y qué nos dice eso sobre los ciclos del desarrollo de software.'
pubDate: 2025-11-07
tags: [programación, tipado, go, lenguajes]
categories: [Programación, Opinión]
---

La actividad en el trabajo ha ido a la baja de un tiempo a la fecha. Principalmente porque ya tengo muchas cosas automatizadas, y pues bueno, **qué se le va a hacer si no hay nada que hacer**. Así que tenía dos opciones: ponerme a ver videos de YouTube o hacer algo productivo... y una vez que ya no había nada más que ver en YouTube me dije: _vamos a aprender un nuevo lenguaje de programación_. **Y entra Go.**

Hace tiempo que ya había escuchado de **Go**, diseñado por ingenieros de Google allá en el lejano 2007. Ya no es un novato, y si había sobrevivido tanto tiempo y lo seguían ocupando tantas empresas importantes, **algo bueno debe de tener**. Y bueno, en resumen, _está chido_, es sencillo y tiene muchas ventajas de las cuales no voy a hablar porque no vine a eso.

Go es un lenguaje de **tipado fuerte**, es decir, todo dato tiene un tipo y se verifica de forma estricta; si quieres hacer operaciones no compatibles, como **multiplicar un número por un texto**, simplemente **no te lo va a dejar hacer**. Ah, y también es **compilado**, es decir, si algo no cuadra o está mal, simplemente no corre. Nada de ejecutarse hasta chocar con el error y fallar.

En fin, luego recordé que no hace mucho el desarrollo de **Android** dejó **Java** y pasó a **Kotlin** (_también de tipado fuerte_), y **Apple** dejó **Objective-C** por **Swift** (_sorpresa, también de tipado fuerte_). Y el lenguaje más popular últimamente en desarrollo web, **TypeScript**, también es así... Hasta para los ñoños que les gusta complicarse la vida, la novedad es **Rust** y... _quien lo diría:_ **también es tipado fuerte.**

Esto me hizo pensar: **¿Qué chin... está pasando? ¿Por qué esta tendencia tan marcada hacia el tipado fuerte?** Pero, después de un rato, me di cuenta de algo más: **no es la primera vez que pasa.**

La trayectoria que siguen los lenguajes de programación tiende a ser _cíclica_ (como la moda de los pantalones acampanados). Parece que cada 20 años más o menos los desarrolladores se cansan de la libertad y buscan refugio en los fuertes brazos de un tipado estricto. Analicémoslo por un momento.

Hace chorrocientos años, había unos lenguajes de programación cavernícolas: **Ensamblador**, **COBOL**, **Fortran**, etc. Eran súper cuadrados, exigentes y detallados; en pocas palabras, **tenías que pensar como si tú fueras una computadora para que funcionaran**.

Eso sí, tenían algo que no tiene precio (o sí, uno muy elevado): **confiabilidad absoluta.** Y aquí viene lo más fascinante: ¡**siguen vivos!** Sí, esos fósiles todavía son los encargados de sistemas críticos en el sector bancario, aerolíneas y muchos gobiernos.

Y es entendible: si vas a operar con **sumas millonarias**, **vidas humanas** o **controlar satélites espías que pueden apagar los pájaros robot**, lo último que necesitas es que una cadena de texto se cuele en un campo numérico. En esa clase de entornos, un fallo en tiempo de ejecución es inaceptable y puede salir muy caro.

Con el paso de los años, alguien se apiadó de los pobres ingenieros y dijo:

> “¿Y si los dejamos pensar como humanos?”

Y aparecieron los lenguajes compilados como **C** y **Java**. Eso sí, con tipado estricto, medio reburujados para escribir, pero permitían **fiabilidad similar a la de los ancestros** sin tener que vaciar tu cerebro por completo para aprenderte en qué sección de la memoria se almacena cada dato.

Posteriormente, a finales de los 80 y durante todos los 90, llegaron lenguajes más amigables que prometían agilizar el trabajo del programador: **Perl**, **Visual Basic**, **PHP** y, claro, ese **horrible monstruo (en aquel entonces) llamado JavaScript**.

Aquí surgió algo llamado **tipado blando**. No había necesidad de especificar el tipo de dato; podías hacerlo, claro, pero podías cambiarlo si querías después. El lenguaje se esforzaba por interpretar la intención del código, haciendo conversiones de tipos automáticas.

Y eso dio lugar a algunas joyitas como el ejemplo canónico de JS:

```
a = 1;
b = '1';

console.log(a + b); // "11"
console.log(a - b); // 0

```

Nada que no se pueda manejar, pero curiosamente no te das cuenta de esos errores hasta que el código se ejecuta.

El tipado blando **evolucionó cual Pokémon que abusa de los Rare Candy** y nos trajo lenguajes de tipado completamente **dinámico** y, además, **interpretados**, como **Python** y **Ruby**.

Estos no solo te permitían cambiar el tipo de una variable en caliente, sino que el hecho de ser interpretados te daba una **agilidad brutal**. Podías escribir una línea, ejecutarla, ver qué pasaba y seguir.

Esa libertad, la rapidez para crear prototipos y la sencillez de su sintaxis se convirtieron en su punto más fuerte, llevándolos a dominar áreas como el _scripting_, el _Machine Learning_ y el desarrollo web rápido (hola, **Ruby on Rails** y **Django**).

Eran perfectos para arrancar una _startup_ o hacer un experimento porque el ciclo de retroalimentación era instantáneo. No había que pelearse con un compilador, y la neta se sintió un alivio después de que C++ o Java no te dejaran hacer nada sin antes poner tu casa a su nombre.

Pero, como pasa siempre, al crecer la aplicación y al crecer el equipo, **esa facilidad inicial se convirtió en un costo oculto en mantenimiento.** Esos pequeños detalles como el de JS no solo resultaban más difíciles de encontrar, sino también de solucionar: ahora no peleabas con el compilador, **peleabas con el cliente** porque el sistema dejó de funcionar o está haciendo locuras.

Y así, sin darnos cuenta, **pasamos de quejarnos de los compiladores a rogar que volvieran.**

El resurgimiento actual (con el empuje de **Go**, **Kotlin**, **Swift**, **Rust** y **TypeScript**) **no es solo una moda**. Es la industria reconociendo el valor de la **solidez que se sacrificó por la flexibilidad.**

El tipado fuerte y la verificación estática nos permiten construir software **más estable**, que puede crecer sin romperse (_al menos tan fácilmente_).

Nos obligan, queramos o no, a ser **explícitos con cada variable**; así, el compilador gritándote _“eso no compila”_ es como ese amigo que te dice que, quizás, es mejor que no manejes después de tomarte medio cartón de chelas. Podrá parecer molesto, y a veces te dan ganas de partirle la cara, pero te está salvando de un desastre. Así el código falla en la etapa de compilación, **no en la cara del cliente.**

Y aquí estamos, en **2025**. Yo estoy usando **Go** como si hubiera descubierto el fuego… otra vez.

Los mismos principios de los sesenta, pero con **temas oscuros** que se ven mas chidos, **autocompletado** y **linters que me juzgan con elegancia**. El código se ha vuelto más transparente, más fácil de mantener y se eliminan muchísimos errores antes de que el código llegue a quien paga.

Porque si algo nos enseña esto es que la **fortaleza estructural que proporciona el tipado fuerte** es una prioridad cuando lo que buscas es **escalabilidad** y, sobre todo, **fiabilidad.**
