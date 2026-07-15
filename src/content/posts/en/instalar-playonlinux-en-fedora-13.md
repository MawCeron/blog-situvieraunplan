---
title: 'Instalar PlayOnLinux en Fedora 13'
description: 'Tres formas de instalar PlayOnLinux en Fedora 13 para poder correr juegos y programas de Windows sobre Linux: RPM, repositorio YUM o el instalador genérico.'
pubDate: 2010-09-03
updatedDate: 2026-07-15
tags: [linux, fedora-13, playonlinux, juegos, windows]
categories: [Linux]
toc: false
---

<!-- TODO: imagen original (31.png) alojada en Photobucket, que ya no sirve imágenes hotlinkeadas de cuentas gratuitas. Reemplazar si se recupera una copia local. -->

El día de ayer me pidieron que explicara cómo instalar PlayOnLinux en Fedora 13, y casualmente no hace mucho tiempo que yo lo instalé, así que aquí les va la forma de instalarlo.

**Primero, algo de info relevante:** *PlayOnLinux es un programa que os permite instalar y usar fácilmente numerosos juegos y programas previstos para correr exclusivamente en Windows® de Microsoft®.*

## ¿Cómo instalarlo?

Instalar PlayOnLinux es realmente bastante sencillo; aquí las formas de hacerlo.

**1.** La primera forma de hacerlo es ir al sitio de [descargas de PlayOnLinux](http://www.playonlinux.com/es/download.html) y descargar el archivo correspondiente a Fedora: [playonlinux-yum-3-3.noarch.rpm](http://rpm.playonlinux.com/playonlinux-yum-3-3.noarch.rpm).

Una vez descargado, simplemente damos doble clic y aceptamos la instalación tanto de POL como de sus dependencias.

**2.** Otra forma de hacerlo es por medio de un repositorio. Para esto, en una terminal escribiremos lo siguiente en modo superusuario:

```bash title="Terminal"
cd /etc/yum.repos.d
wget http://rpm.playonlinux.com/playonlinux.repo
```

Esto nos agregará el paquete a nuestros repositorios, así que podremos instalarlo ya sea desde **Sistema > Administración > Añadir/Quitar Software** o a través de la terminal con el siguiente comando:

```bash title="Terminal"
sudo yum -y install playonlinux
```

**3.** La otra opción que tenemos es descargar el instalador genérico. Para esto, descargamos de la web oficial el archivo [PlayOnLinux_3.8.1.tar.gz](http://www.playonlinux.com/script_files/PlayOnLinux/3.8.1/PlayOnLinux_3.8.1.tar.gz).

Extraemos los archivos y ejecutamos `./playonlinux` desde una terminal, pero para instalarlo de esta forma primero necesitamos tener previamente instalado **Python**.

Estas son las formas de instalar PlayOnLinux en Fedora 13; perdonen la falta de screenshots, pero escribí esto en el trabajo, en cuanto llegue a casa edito el post.
