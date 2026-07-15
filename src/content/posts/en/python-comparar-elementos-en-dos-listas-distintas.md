---
title: 'Comparar elementos en dos listas distintas con Python'
description: 'Un script en Python para comparar automáticamente dos listas grandes de datos, en lugar de revisarlas una por una a mano.'
pubDate: 2014-09-23
tags: [python, automatización, scripting]
categories: [Python]
---

Hace un par de semanas me solicitaron en el trabajo revisar si contábamos o no en el servidor con fotografías de todos los productos, las fotografías se encontraban en una carpeta especifica y tienen por nombre el código interno del producto, a simple vista parece una tarea relativamente sencilla, solo hacía falta buscar el código de cada producto en el directorio de las fotos, pero contamos con cerca de **15 mil códigos registrados** y revisar de uno en uno manualmente habría llevado una eternidad, así que opté por automatizar la revisión.

Primero obtuve un listado de los códigos de todos los productos registrados, después hice otro listado con los nombres de los archivos sin extensión en el directorio de fotos y guarde ambos con extensión txt. Y finalmente escribí el siguiente script:

```python
almacen1 = open('almacen.txt', 'r')
nofoto = open('lista.txt', 'r')

lista1 = []
lista2 = []
final = []

for line in almacen1:
    lista1.append(line)
for line in nofoto:
    lista2.append(line)
for i in lista1:
    if i in lista2:
        final.append('Si')
    else:
        final.append('No')

open("existe.txt", "w").write("\n".join(("".join(item)) for item in final))
```

Trataré de explicar su funcionamiento a grandes rasgos. Todo el código hasta el final del segundo **FOR** es para abrir los archivos y convertirlos en listas python, la **lista1** contiene los códigos del los productos y la **lista2** las fotos ya existentes en el servidor. El tercer **FOR** es el que hace todo el trabajo, cada elemento en la **lista1** lo revisa verificando si se encuentra en la **lista2**, de ser así guarda el resultado **Si/No** en una tercera lista. Finalmente crea un archivo **txt** con los resultados. Cómo pueden ver es un script bastante útil para cuando requerimos comparar listas muy grandes y sumamente sencillo.

Por último hice mi reporte en una hoja de calculo y simplemente tuve que copiar y pegar los resultados que obtuve.

hc.png

Cualquier duda o comentario es bienvenido.
