---
title: 'Solución al Error 0-1036 al instalar Office'
description: 'Cómo solucionar el Error 0-1036 al instalar o reparar Microsoft Office eliminando archivos y registros residuales.'
pubDate: 2016-07-01
tags: [windows, office, troubleshooting]
categories: [Windows]
---

El día de ayer justo antes de salir hubo un problema con el **Office 2016** de uno de los equipos, por cuestiones de tiempo y disponibilidad de recursos decidimos corregirlo hasta la mañana del día de hoy. Al intentar reparar la instalación todo se eliminó del sistema. Ya saben, **Microsoft** y sus soluciones. Así que decidí aplicar la máxima principal para los sistemas de _Microsoft: **"Ante todo mal, reinstalar. Y ante todo bien, también."**_

Sin embargo al tratar de realizar la reinstalación me topé con un mensaje similar al siguiente con el código de **Error 0-1036 (0)**:

4fc1f99f-7570-490e-acce-8b815089554f.png

La solución a este problema es bastante simple, e incluso obvia, solamente tenemos que eliminar los archivos residuales de la instalación anterior, para ser exactos debemos eliminar las siguientes carpetas:

- C:\\Program Files\\Office 15
- C:\\ProgramData\\Microsoft\\Office
- C:\\Users\\Nombre\\AppData\\Local\\Microsoft\\Office
- C:\\Users\\Nombre\\AppData\\Roaming\\Microsoft\\Office

También accederemos al **Editor del Registro de Windows** _(regedit)_ y eliminaremos el siguiente registro:

-  HKEY\_CURRENT\_USER/Software/Microsoft/Office

Finalmente reiniciaremos para que los cambios en el registro hagan efecto y evitarnos problemas posteriores. Y listo, podremos hacer la instalación sin problema.
