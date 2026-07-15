---
title: 'Quitar contraseña de Windows con Linux'
description: 'Cómo restablecer la contraseña de un usuario de Windows usando un LiveCD de Linux, sin necesidad de software adicional.'
pubDate: 2015-02-10
tags: [windows, linux, contraseñas, tutorial]
categories: [Windows, Linux]
---

Muchas veces nos encontramos en la necesidad de accesar un equipo con Windows pero no tenemos la contraseña de usuario y no nos es posible conseguirla por diferentes motivos, ya sea por que el usuario la olvidó o porque no es posible contactarlo mas. Pues bien, en esta ocasión les mostraré como quitar las contraseñas con la ayuda de un LiveCD de alguna distribución Linux.

Este método no ocupa ningún programa especial, simplemente hace uso de las mismas herramientas de Windows para quitar las contraseñas, y simplemente nos limitamos a "engañar" al sistema aprovechando una vulnerabilidad del mismo (es Windows, qué esperaban). Apoyándonos un poco con Linux.

1. Iniciamos nuestro equipo desde USB o CD, con el sistema Linux de nuestra preferencia.

2\. Una vez iniciado el sistema en el gestor de archivos (nautillus, nemo, caja, thunar, etc) montaremos la partición donde tenemos instalado windows. _En la mayoría de los sistemas actuales solo hace falta hacer doble clic en la unidad para que se monte automáticamente._

3\. Nos dirijimos a la carpeta **Windows\\System32** y renombramos el archivo **Utilman.exe** como **Utilman.exe.bak**

4\. Si nuestro sistema es de 32 bits en la carpeta **Windows** buscaremos el archivo **cmd.exe** y lo copiaremos a **System32** renombrandolo como **Utilman.exe**, en caso de que nuestro sistema sea de 64 bits encontraremos el archivo **cdm.exe** en la carpeta **SysWOW64** y seguiremos el mismo proceso.

Hasta aquí ha sido todo con Linux, ahora reiniciaremos el equipo y permitiremos que cargue Windows y una vez que estemos en la pantalla de login continuaremos.

5\. En la pantalla de login daremos clic en el botón de accesibilidad. Se ejecutará la consola del **Símbolo de Sistema** con permisos de administrador.

6\. Escribiremos **NET USERS** en la consola para ver los nombres de usuario existentes.

7\. Para cambiar la contraseña escribimos lo siguiente:

**NET USER NOMBRE\_USUARIO \***

Nos pedirá que escribamos y confirmemos la nueva contraseña (dejalo en blanco para quitar la ya existente y dejarlo sin contraseña)

8\. Si tenemos problemas con el nombre del usuario, como cuando tiene un espacio en blanco en el nombre, windows generalmente incluye por defecto la cuenta de Administrador, aunque se encuentra desactivada. Para activarla solo tenemos que escribir lo siguiente

**NET USER Administrador /activate:yes**

9\. Reiniciamos el sistema y los cambios deben de estar hechos y podremos acceder a windows sin problemas.

10\. Realizamos el proceso inverso para recuperar la "_**seguridad"**_ de nuestro sistema (renombrar Utilman.exe.bak y reemplazar el Utilman.exe que copiamos por el original)
