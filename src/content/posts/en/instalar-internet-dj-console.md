---
title: 'Cómo instalar Internet DJ Console'
description: 'Guía paso a paso para instalar Internet DJ Console en Ubuntu, el único programa libre para transmitir radio por Internet en Linux, junto con JACK Audio Connection Kit.'
pubDate: 2010-05-08
updatedDate: 2026-07-15
tags: [linux, ubuntu, jack, internet-dj-console, radio, tutorial]
categories: [Linux]
toc: false
---

<!-- TODO: imagen original (20070605000437-internet-radio-2.jpg, pie "Radio Online") alojada en Photobucket, que ya no sirve imágenes hotlinkeadas de cuentas gratuitas. Reemplazar si se recupera una copia local. -->

Desde hace algún tiempo soy locutor de una radio por Internet ([Key Anime Radio](http://keyanimestyle.sitiosprodigy.com.mx/keyradio.html)), y desde entonces comencé a buscar la forma de hacer transmisiones cada vez con mejor calidad. Así me topé con un programa llamado [**SamBroadcaster**](http://www.spacialaudio.com/), un programa completo para transmitir tu propia radio por Internet, que solamente tiene un problema: cuesta **\$299.00 USD** (claro que siempre puede conseguirse la versión crackeada). Pero su otro *problema* es que se trata de un programa pensado para plataformas Window\$, y yo utilizo Linux Ubuntu, lo cual me había obligado a tener una versión de Windows instalada, ya que no encontraba ningún programa que me ofreciera las mismas características y trabajara sobre Linux. Hasta hoy, después de mucho tiempo buscando, me topé con *probablemente* el único programa 100% libre para transmitir radio por Internet: **Internet DJ Console**.

## Un poco de historia

<!-- TODO: imagen original (idjc.png, pie "Internet DJ Console") alojada en Photobucket, que ya no sirve imágenes hotlinkeadas de cuentas gratuitas. Reemplazar si se recupera una copia local. -->

**Internet DJ Console** fue creado en el 2005 por Stephen Fairchild después de ver la falta de programas para DJ en plataforma Linux, ya que, en sus palabras, «los programas que encontraba tenían escasas funciones, estaban llenos de bugs, o tristemente no podían compilarse. Me di cuenta de que había que hacer algo y que, teniendo algunas habilidades de programación, podría hacerlo yo mismo».

**Internet DJ Console** es un programa de streaming de audio de código abierto que funciona con las plataformas Shoutcast, Icecast e Icecast2, con soporte para transmisión en formato OGG Vorbis y también MP3. Tiene una interfaz gráfica que lo hace simple de usar. Permite mezclar dos listas de reproducción, señal de micrófono, entradas JACK y llamadas Skype. Además, se puede grabar la transmisión. Necesita el servidor de sonido JACK para funcionar.

## Cómo instalarlo

**1.** Antes de instalar **Internet DJ Console** debemos instalar todas las dependencias necesarias, así que abriremos una terminal y escribiremos lo siguiente (puedes simplemente copiar y pegar):

```bash title="Terminal"
sudo apt-get install libc6-dev libjack-dev jackd libvorbis-dev libsamplerate0-dev libsndfile1-dev python-gtk2-dev python-mutagen libmad0-dev libavcodec-dev libavformat-dev libmp3lame-dev libmp4v2-dev flac vorbis-tools python-eyed3 libspeex-dev
```

Si estás usando una versión de 64 bits, agrega el texto `libc6-dev-i386` a la lista.

**2.** Descarga el paquete de **Internet DJ Console**: [sourceforge.net/projects/idjc](http://sourceforge.net/projects/idjc/)

**3.** Descomprímelo y entra en la carpeta que se genera:

```bash title="Terminal"
tar xzvf idjc-0.8.2.tar.gz
cd idjc-0.8.2
```

**4.** Ahora generaremos el **Makefile**:

```bash title="Terminal"
./configure CFLAGS="-O2"
```

> **Nota**: se trata de una letra «O» y no un cero.

**5.** Escribimos `make`:

```bash title="Terminal"
make
```

**6.** Por último, instalaremos:

```bash title="Terminal"
sudo make install
```

**7.** Ahora configuraremos **Jack Audio Connection Kit**; para ello tecleamos lo siguiente en una terminal:

```bash title="Terminal"
sudo gedit /etc/security/limits.conf
```

Agregamos las siguientes líneas al final del archivo:

```text title="/etc/security/limits.conf"
@audio - rtprio 99
@audio - memlock unlimited
@audio - nice -19
```

Guardamos y cerramos.

**8.** Agregamos nuestro usuario al grupo de usuarios *audio* para que podamos ejecutar JACK (reemplaza `user` por tu nombre de usuario):

```bash title="Terminal"
sudo usermod -a -G audio user
```

**9.** Ahora asegúrate de que ningún programa esté utilizando la tarjeta de audio y ejecuta lo siguiente desde la terminal:

```bash title="Terminal"
echo "/usr/bin/jackd -d alsa -r 44100" > ~/.jackdrc
```

**10.** Cierra y reinicia tu sesión para que se guarden las nuevas configuraciones. Ahora en el menú **Aplicaciones – Internet** debe aparecer Internet DJ Console, y en **Aplicaciones – Sonido y vídeo** debe aparecer JACK Control.

De esta forma tendrás funcionando **Internet DJ Console** a la perfección, y podrás realizar tus transmisiones sin ninguna dificultad. El uso del programa es muy sencillo; aun así, pronto publicaré un tutorial sobre la forma correcta de utilizarlo.
