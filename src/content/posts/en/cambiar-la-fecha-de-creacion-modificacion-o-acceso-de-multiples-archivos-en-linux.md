---
title: 'Cambiar la fecha de creación, modificación o acceso de múltiples archivos en Linux'
description: 'Un script en Bash para cambiar la fecha de creación, modificación o acceso de varios archivos a la vez en Linux.'
pubDate: 2014-06-12
tags: [linux, bash, scripting, terminal]
categories: [Linux]
---

Existen muchos motivos por los que modificar las distintas fechas almacenadas en un archivo nos puede resultar útil, en mi caso lo hice para que mi SmartTV reconociera el orden correcto de los episodios de algunos animes, o para que el autoestéreo reprodujera las canciones en orden alfabético sin importar cual agregue primero a la usb.

En fin, para modificar la fecha de un archivo existe el comando **touch** que nos es muy útil si lo que queremos es modificar un solo archivo, pero la cosa se complica cuando tenemos cerca de 99 archivos y obviamente no queremos que todos tengan la misma hora, así que para resolver este problemita decidí escribir un script en bash que podemos ejecutar y modificar fácilmente para adaptarlo a sus necesidades, solo copien el código a un editor de texto como gedit, guárdenlo con extensión **.sh** y denle permisos de ejecución. Listo!!

**Nota: Este script solo funciona con hasta 99 archivos hasta el momento, tómenlo en cuenta... Si encuentro la solución a eso lo actualizaré**

```bash
#!/bin/bash

# Definimos el tipo de archivo
ext=mp4

# Cambiamos los espacios en el nombre del archivo por guion bajo
for FILE in *.$ext
do
    NEWFILE=`echo $FILE | sed 's/ /_/g'`
    mv "$FILE" $NEWFILE
done

# Iniciamos un contador
let i=0

# Modificamos la fecha de los archivos
for f in *.$ext
do
    if [ "$i" -lt 10 ]
    then
        # Para definir la fecha puedes cambiar los números antes del punto
        # usando el siguiente formato YYYYMMDDhhmm (año,mes,dia,hora,minuto)
        # y para cambiar fecha de creación borren el -m, para cambiar acceso
        # cambien -m por -a y para cambiar modificación dejenlo con -m
        touch -m -t 201406120113.0$i $f
        echo "touch -m -t 201406120113.0$i $f"
    else
        touch -m -t 201406120113.$i $f
        echo "touch -m -t 201406120113.$i $f"
    fi
    let i=i+1
done

# Regresamos los espacios a los nombres de archivo
for FILE in *.$ext
do
    NEWFILE=`echo $FILE | sed 's/_/ /g'`
    mv $FILE "$NEWFILE"
done

echo "Se finalizaron las modificaciones"
```
