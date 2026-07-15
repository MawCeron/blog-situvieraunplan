---
title: 'XAMPP: tu propio servidor web Apache'
description: 'Cómo instalar y ejecutar XAMPP en Fedora para tener un servidor local con Apache, PHP, MySQL y ProFTPD listo para desarrollar antes de subir nada a producción.'
pubDate: 2012-02-11
updatedDate: 2026-07-15
tags: [linux, apache, php, perl, xampp, servidor]
categories: [Linux]
toc: true
---

Cuando pasas tiempo en internet, tarde o temprano te surge la curiosa necesidad de crear tu propia web, y vas aprendiendo algo de HTML, un poco de diseño, CSS, pero cuando eso ya no te es suficiente y buscas trabajar algo un poco más dinámico, como por ejemplo con bases de datos o gestores de contenidos, lo ideal es usar PHP y MySQL. Pero no puedes trabajarlos localmente para tenerlos listos al momento de subirlos a la red... pues bien, ese problema se ha terminado.

<!-- TODO: imagen original (xampp-logo.png) alojada en Photobucket, que ya no sirve imágenes hotlinkeadas de cuentas gratuitas. Reemplazar si se recupera una copia local. -->

[**XAMPP**](http://www.apachefriends.org/en/xampp.html) es un paquete completo de software que nos permite instalar nuestro propio servidor web Apache de manera local para que podamos trabajar con tecnologías como PHP, Perl, SQL y más.

Es posible instalarlo bajo las plataformas *Linux, Windows, Mac OSX y Solaris*, contando con su propio paquete de instalación para cada uno. Pero, como siempre, aquí nos enfocaremos de momento en la instalación y ejecución en un sistema Linux, concretamente en Fedora 16.

## Descargar

La instalación de XAMPP, como muchos otros paquetes de software, comienza con descargar el paquete *.tar.gz* dando [**clic aquí**](http://sourceforge.net/projects/xampp/files/latest/download?source=files).

## Instalación

Después de descargar, simplemente abrimos una terminal, nos logueamos como root y extraemos el archivo que descargamos en `/opt`:

```bash title="Terminal"
su
# ingresamos nuestra contraseña
cd Descargas
tar xvfz xampp-linux-1.7.7.tar.gz -C /opt
```

Eso es todo. Ahora XAMPP está instalado en el directorio `/opt/lampp`.

## Ejecución

Para iniciar el servidor XAMPP, simplemente en una terminal debemos ejecutar el siguiente comando como root:

```bash title="Terminal"
/opt/lampp/lampp start
```

Debe mostrarnos algo como esto en la pantalla:

```text
Starting XAMPP for Linux 1.7.7...
XAMPP: Starting Apache with SSL (and PHP5)...
XAMPP: Starting MySQL...
XAMPP: Starting ProFTPD...
XAMPP for Linux started.
```

Listo, con esto ya estará corriendo Apache, PHP, MySQL y ProFTPD en el servidor local.

Para probar si se está ejecutando correctamente, simplemente ingresen a la siguiente dirección en su navegador: `http://localhost`.

<!-- TODO: imagen original (XAMPP-GoogleChrome_012.png) alojada en Photobucket, que ya no sirve imágenes hotlinkeadas de cuentas gratuitas. Reemplazar si se recupera una copia local. -->

Si XAMPP se está ejecutando correctamente, tiene que mostrarles lo siguiente. Seleccionan el idioma que más les convenza y listo, verán el panel de administración de XAMPP.

<!-- TODO: imagen original (XAMPPparaLinux177-GoogleChrome_013.png) alojada en Photobucket, que ya no sirve imágenes hotlinkeadas de cuentas gratuitas. Reemplazar si se recupera una copia local. -->

XAMPP estará ejecutándose de forma indefinida mientras dure la sesión; si en algún momento desean detener el servidor, solamente tienen que ejecutar lo siguiente en una terminal como root:

```bash title="Terminal"
/opt/lampp/lampp stop
```

Este servidor les será muy útil, sobre todo si trabajan sitios en PHP o gestores de contenido como WordPress, Joomla, o foros como PHPBB. Pero esos ya son otra historia; si tienen alguna duda o comentario, pueden dejarlo sin ningún problema.
