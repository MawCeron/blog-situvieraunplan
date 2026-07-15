---
title: 'Solución: Fedora no arranca después de actualizar el kernel'
description: 'Qué hacer cuando Fedora se queda en stand by tras actualizar el kernel de Linux: reinstalar los drivers de video desde una terminal en modo texto antes de reiniciar.'
pubDate: 2010-09-02
updatedDate: 2026-07-15
tags: [linux, fedora, kernel, drivers, video]
categories: [Linux]
---

<!-- TODO: imagen original (lefoi-tux-skull-1834.png) alojada en Photobucket, que ya no sirve imágenes hotlinkeadas de cuentas gratuitas. Reemplazar si se recupera una copia local. -->

Antes que nada, un poco de información relevante...

**¿Qué es el kernel?** En resumen, el kernel de Linux es la interfaz entre el sistema operativo y el hardware de tu computadora. Es el núcleo de cualquier computadora que permite al sistema operativo controlar numerosas funciones y es la parte más importante de cualquier sistema operativo, sin la cual sencillamente no funcionaría.

Ahora sí, el problema y la solución...

<!-- TODO: imagen original (caratula.jpg, carátula de Metroid Prime 3: Corruption) alojada en Photobucket, que ya no sirve imágenes hotlinkeadas de cuentas gratuitas. Reemplazar si se recupera una copia local. -->

Hace un par de días, **Fedora** me avisó de la actualización del kernel de Linux, que pasaba de la versión **2.6.33.8-149.fc13.i686** a la **2.6.34.6-47.fc13.i686**, pero como no tenía mucho tiempo no la actualicé hasta el día de ayer (2/09/10), cuando regresé del trabajo. Realicé las actualizaciones y todo normal; me pidió que reiniciara el sistema y lo hice. Todo parecía normal, comenzó la carga de Fedora y, como se trataba de una actualización importante, intuí que iba a tardar más de lo normal, así que me puse a jugar [**Metroid Prime 3: Corruption**](http://es.wikipedia.org/wiki/Metroid_Prime_3:_Corruption) por un rato (en realidad no iba a tardar tanto, pero yo quería jugar)... Pasó una hora, cumplí unos cuantos objetivos y decidí volver a la PC, y me sorprendí al ver que **¡¡FEDORA NO HABÍA CARGADO!!**

Podía escribir, pero nada hacía que mi Fedora cargara, así que, un poco asustado, reinicié e intenté arrancar con el kernel anterior, el cual cargó sin problemas. Recordé entonces que hace mucho tiempo, cuando aún era windowsero e hice mi primer intento con Fedora, me había sucedido lo mismo, y fue una de las razones por las que no me cambiaba a Linux; pero esta vez ya tenía mayor experiencia y no permitiría que eso me venciera... De pronto recordé que en la última actualización de kernel que había hecho tuve que reinstalar los controladores de video, así que supuse que ese era el problema.

<!-- TODO: imagen original (kernel-226x300.jpg) alojada en Photobucket, que ya no sirve imágenes hotlinkeadas de cuentas gratuitas. Reemplazar si se recupera una copia local. -->

**Solución:** si tienes el mismo problema que yo, y después de actualizar el kernel de tu Fedora tu sistema simplemente queda en **stand by**, haz lo siguiente:

Importante: antes de hacer cualquier actualización de kernel, asegúrate de tener tus drivers de video en un lugar accesible...

**1.** Cuando el disco duro haya dejado de leer y aparentemente Fedora terminó de cargar, simplemente presiona **Ctrl + Alt + F2**; esto te abrirá el sistema en modo terminal.

**2.** Escribe tu nombre de usuario y contraseña (también puedes acceder en modo root).

**3.** Instala tus drivers de video como normalmente lo harías. Ya sea por YUM o por un script (ejemplo: `./drivers.run`).

**4.** Una vez terminada la instalación de tus controladores, escribe lo siguiente:

```bash title="Terminal"
reboot
```

**5.** Se reiniciará tu sistema y **¡FELICIDADES, TU FEDORA CARGA PERFECTAMENTE CON UN NUEVO KERNEL!**
