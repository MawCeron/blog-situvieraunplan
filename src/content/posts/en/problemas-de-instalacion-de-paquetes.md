---
title: 'Solución a un problema común de instalación de paquetes en Linux Ubuntu'
description: 'Cómo resolver el error "No se pudo bloquear /var/lib/dpkg/lock" en Ubuntu, causado por dejar una terminal de apt-get abierta a medias.'
pubDate: 2010-07-04
updatedDate: 2026-07-15
tags: [linux, ubuntu, apt-get, dpkg]
categories: [Linux]
heroImage: ../../../assets/images/posts/problemas-de-instalacion-de-paquetes/tuxterminal_icon.png
heroImageAlt: 'Icono de Tux en una terminal'
---

Hace unos cuantos minutos me encontré con un problema al tratar de instalar unas librerías necesarias para el juego [**VDRIFT**](http://vdrift.net/). Al momento de escribir las instrucciones de instalación en la terminal, me apareció el siguiente mensaje de error:

```text
E: No se pudo bloquear /var/lib/dpkg/lock - open (11 Recurso temporalmente no disponible)
E: Imposible bloquear el directorio de administración (/var/lib/dpkg/), ¿está otro proceso usándolo?
```

Por un instante no supe a qué se debía este mensaje de error, así que supuse que reiniciando mi sesión se solucionaría. Grande fue mi desilusión al ver que, después de reiniciar, continuaba apareciendo. Entonces caí en la cuenta: la noche anterior había cerrado por error una terminal que estaba instalando [**OPENARENA**](http://openarena.ws/). Había descubierto el problema, así que de inmediato me puse a buscar por la red y descubrí que hay muchas personas con muchas soluciones, pero ninguna de ellas me funcionó, hasta que encontré una que, por su simpleza, me pareció demasiado obvia para que nadie la hubiera intentado.

Si nos aparece el error arriba mencionado, simplemente tenemos que abrir una terminal y, como root, hacer lo siguiente:

```bash title="Terminal"
killall -9 apt-get
apt-get update
```

Y listo, ya podrás instalar el paquete que desees. Es demasiado simple, y pensar que a muchos este problema nos ha dado grandes dolores de cabeza...
