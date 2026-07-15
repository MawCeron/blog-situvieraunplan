---
title: 'Instalando y configurando MiniDLNA en Linux Mint 17 "Qiana"'
description: 'Guía para instalar y configurar MiniDLNA en Linux Mint 17 y así transmitir fotos, música y video a dispositivos compatibles con DLNA.'
pubDate: 2014-07-04
tags: [linux, linux-mint, minidlna, dlna, tutorial]
categories: [Linux]
---

[MiniDLNA](http://minidlna.sourceforge.net/) es un servidor [DLNA/UPnP-AV](http://es.wikipedia.org/wiki/Digital_Living_Network_Alliance) que nos permite hacer streaming de fotos, música y videos desde una PC a dispositivos compatibles con el estándar DLNA como teléfonos o televisores entre otros. Es muy útil cuando contamos con una SmartTV ya que nos permite acceder a nuestro contenido multimedia sin necesidad de estarlo copiando a unidades USB externas.

Para instalarlo en Linux Mint 17 primero debemos instalar un par de dependencias para que no tengamos problemas más adelante, así que abriremos una terminal y ejecutaremos lo siguiente:

```
sudo apt-get install software-properties-common python-software-properties
```

Con estas dependencias instaladas en la terminal ejecutaremos lo siguiente para agregar el PPA e instalar MiniDLNA

```
sudo add-apt-repository ppa:djart/minidlna; sudo apt-get update; sudo apt-get install minidlna
```

Una vez instalado editaremos el archivo de configuración

```
sudo gedit /etc/minidlna.conf
```

Este es un ejemplo de como puede quedar editado:

```
# Path to the directory you want scanned for media files.
#
# This option can be specified more than once if you want multiple directories
# scanned.
#
# If you want to restrict a media_dir to a specific content type, you can
# prepend the directory name with a letter representing the type (A, P or V),
# followed by a comma, as so:
#   + “A” for audio  (eg. media_dir=A,/var/lib/minidlna/Music)
#   + “V” for video  (eg. media_dir=V,/var/lib/minidlna/Videos)
#   + “P” for images (eg. media_dir=P,/var/lib/minidlna/Pictures)
# media_dir=/var/lib/minidlna
media_dir=A,/mnt/Media/Música
media_dir=P,/mnt/Media/Fotos
media_dir=V,/mnt/Media/Vídeos
```

La parte en negritas es básicamente todo lo que debemos editar, si igualmente queremos modificar la forma en que aparece el servidor en nuestro dispositivo debemos modificar la línea **friendly\_name** colocando después del signo **\=** el nombre que deseemos, por ejemplo.

```
friendly_name=Bad Wolf DLNA Server
```

Ahora, para asegurarnos que el servidor DLNA se inicie en cuanto arranquemos el equipo debemos agregar “sleep 5″ en el script de arranque, para lo que abrimos una terminal e ingresamos lo siguiente:

```
sudo gedit /etc/init.d/minidlna
```

En el archivo que se abrió buscamos la función **do\_start()** y agregamos la línea de la siguiente forma:

```
chown $USER:$GROUP $PIDDIR || return 2
     sleep 5
 start-stop-daemon –start –quiet –pidfile $PIDFILE \
```

Finalmente generaremos la base de datos e iniciaremos el servicio ejecutando en una terminal lo siguiente:

```
sudo rm -f  /var/lib/minidlna/files.db && sudo minidlnad -R && sudo service minidlna restart
```

Con esto debería quedar configurado y debemos poder acceder a nuestros archivos sin ningun problema.
