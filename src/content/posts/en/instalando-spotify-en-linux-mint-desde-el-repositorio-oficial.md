---
title: 'Instalando Spotify en Linux Mint desde el Repositorio Oficial'
description: 'Tutorial paso a paso para instalar el cliente de Spotify en Linux Mint usando su repositorio oficial.'
pubDate: 2014-05-19
tags: [linux, linux-mint, spotify, tutorial]
categories: [Linux]
---

Este sencillo tutorial les mostrará como instalar el Cliente Spotify en Linux Mint desde su repositorio oficial.

Para los que aún no lo sepan, Spotify es un servicio de streaming de música que cuenta con una biblioteca bastante amplia, la cual puedes escuchar desde cualquiera de tus dispositivos ya que funciona en Windows, Mac, Linux, Android, iOS, Windows Phone, BlackBerry, Symbian.

Para instalarlo desde el repositorio oficial presionamos **Ctrl+Alt+T** para abrir una terminal.

**1)** Ejecutamos el siguiente comando para agregar el repositorio a Linux Mint.

```bash
sudo sh -c 'echo "deb http://repository.spotify.com stable non-free" >> /etc/apt/sources.list.d/spotify.list'
```

**2)** Instalamos la llave pública

```bash
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 94558F59
```

**3)** Finalmente actualizamos la lista de paquetes e instalamos spotify:

```bash
sudo apt-get update; sudo apt-get install -y spotify-client-qt
```

 

**¡Que lo disfruten!**
