---
title: "Todos los caminos llevan a Fedora"
description: "La crónica de cómo un simple 'voy a reinstalar Linux' terminó convertido en un tour de varias distros, un compositor con scroll infinito y una temporada nada estable con Debian."
pubDate: 2026-07-16
tags: [linux, fedora, distro-hopping, distros]
categories: [Linux, Opinión]
heroImage: ../../../assets/images/posts/todos-los-caminos-llevan-a-fedora/hero.png
heroImageAlt: "Volviendo a Fedora, por el camino largo"
---

Como ya les conté hace tiempo, este año tomé la decisión de volver a Linux.

Después de casi diez años usando Windows (y un par más en macOS), decidí regresar. No porque Windows fuera insoportable. Lo de macOS es más fácil de explicar: vendí mi MacBook Pro y, pues, no compré otro —soy pobre, muy pobre.

Había estado en Windows todos estos años por cuestiones del trabajo, garantías de los equipos y, sobre todo, la enorme pereza de reinstalar y configurar todo desde cero, pero principalmenteel trabajo era la excusa que llevaba años usando para **no** volver. El status quo hace estragos en el alma aventurera de uno.

Pero eventualmente uno vuelve a las andadas.

## El plan (que duró exactamente nada)

El plan original era bastante simple: instalar Fedora y seguir con mi vida. Después de todo, fue la distribución que usé antes de cambiarme a macOS —bueno, justo antes de macOS utilicé CrunchBang, pero es porque mi lapita (una netbook HP Mini 110) era lo único que soportaba, y en ese momento no tenía otra opción—. Ya conocía el terreno, sabía qué esperar, y probablemente en una tarde tendría todo funcionando.

...Pero entonces apareció esa vocecita que todos conocemos, la misma de la que les [hablé hace poco](/posts/hablemos-de-distro-hopping/):

*"Ya que vas a reinstalar todo... ¿por qué no ves qué hay de nuevo en Linux en los últimos diez años?"*

Y así, sin necesidad alguna, comenzó el *distrohopping*. Resulta que escribir sobre algo no te vacuna contra hacerlo tú mismo.

## Pop!_OS, Omarchy, y el amor inesperado por CachyOS

Pasaron por el disco Pop!_OS, Omarchy y CachyOS. Algunas duraron horas, otras días. Los motivos para dejarlos eran falta de personalización, o exceso de personalización —no me pasaré la vida escribiendo archivos .config—. CachyOS, sin embargo, fue una sorpresa enorme. No esperaba que me gustara tanto.

Gran parte de la culpa la tiene la combinación de Niri con Noctalia Shell. Nunca había usado un compositor con *scroll* infinito horizontal, y aunque al principio mi cerebro protestó bastante (*"¿dónde chin... quedó mi ventana?"*), terminé disfrutándolo más de lo que esperaba. De hecho, fue la distribución donde más tiempo me quedé.

Claro que nada dura para siempre.

Empezaron a aparecer pequeños detalles. El rendimiento con máquinas virtuales no era precisamente brillante. Algunas instalaciones de paquetes decidían fallar porque sí, sin dar explicaciones ni derecho de réplica. De vez en cuando alguna configuración desaparecía como si hubiera decidido independizarse, rehacer su vida y buscar su propio departamento. Y, aunque Niri me gustó mucho, nunca terminé de hacer las paces con el *scrolling* y su forma rara de acomodar las ventanas. Después de todo hay hábitos que diez años de ventanas tradicionales te dejan marcado cual ganado.

Así que hice lo que cualquier persona razonable haría en mi situación: instalé otra distribución.

## Cómo que esto no debería ser así

Como ya había jugado suficiente, decidí irme por la opción que automáticamente aparece cuando alguien dice la palabra *estabilidad*: Debian.

Y aquí viene el giro inesperado de la historia.

Fue, irónicamente, **la distribución MENOS estable de todas las que probé.** Sí, incluso menos que las *rolling release*.

Crashes. Bloqueos completos. La terminal congelándose sin razón aparente. Consumo de memoria bastante más alto de lo que esperaba. Bluetooth decidiendo simplemente no conectarse. El Wi-Fi olvidando ocasionalmente que debía de existir. Pantalla en negro después de simplemente bloquear el equipo. Entre otras cosas que me terminaron volviendo loco de a poco.

No estoy diciendo que Debian sea inestable —sería absurdo hacerlo, considerando la cantidad de servidores (palabra clave: **SERVIDORES**) que viven felices con ella desde hace décadas. Estoy diciendo que *mi* instalación decidió convertirse en una experiencia paranormal, con todo y ruidos raros a medianoche. Supongo que hasta las distribuciones más estables tienen derecho a levantarse de malas de vez en cuando, o simplemente no le caí bien (el sentimiento es mutuo).

## De vuelta a casa

Y fue entonces cuando la desesperación me obligó a hacer lo que probablemente debí hacer desde el principio: instalar Fedora.

Aunque, ya que estabamos en modo experimental, no regresaría exactamente al Fedora que recordaba.

En lugar de instalar Workstation, decidí probar Silverblue. Eso de los entornos atómicos era algo suficientemente diferente como para satisfacer las ganas de experimentar, pero seguía teniendo esa sensación de estar jugando sobre terreno conocido. Solo había que aprender a adaptarme a la nueva forma de trabajar con `rpm-ostree`.

Y creo que fue la decisión correcta.

Las Toolbox me parecen una idea brillante. Distrobox complementa perfectamente el concepto. Tener entornos separados para proyectos, sin convertir el sistema principal en un experimento científico con miles de paquetes que se instalaron para cada proyecto o nomas porque una herramienta que usaste una vez lo necesitaba. Terminó siendo mucho más cómodo de lo que imaginaba. Es una de esas ideas que, una vez las usas, cuesta trabajo entender cómo vivías antes sin ellas.

## Conclusión (por ahora)

De momento estoy fascinado. Tal vez dentro de seis meses escriba otro artículo diciendo que ahora vivo feliz en alguna distribución que todavía no existe —nunca hay que subestimar el poder del *distrohopping*, ni mi capacidad de encontrarle un "pero" a algo que funcionaba perfectamente bien, pero aún así lo veo poco probable.

Por ahora, todo parece indicar que volví a casa. Los muebles están como los dejé. Solo que los simientos de la casa fueron completamente remodelados.
