---
title: 'Descargar todos los archivos vinculados en una página con Python'
description: 'Un script en Python con BeautifulSoup para descargar automáticamente todos los archivos enlazados en una página web, recursivamente.'
pubDate: 2018-07-25
tags: [python, web-scraping, automatización]
categories: [Python]
---

La cosa está así, en el trabajo me enviaron un enlace a un sitio web que consistía de muchos más enlaces a archivos que necesitaban descargar, algunos, envían directamente al archivo, otros a alguna otra página con más enlaces a los distintos archivos. Mi tarea era descargar cada uno de estos archivos.

Bien, realizar está tarea de forma manual podría llevarme varios días. Sin mencionar lo aburrida, mecánica y monótona que puede resultar. Así que decidí ahorrarme tiempo y escribir un script de Python que haga todo lo que necesito. Lo comparto por si alguien lo necesita, obviamente el script puede mejorarse bastante.

```python
import os, urllib2, sys, urlparse
from bs4 import BeautifulSoup

def process_html(url, save_path, nombre):
    request = urllib2.Request(url)
    html = urllib2.urlopen(request)
    soup = BeautifulSoup(html.read(), 'html.parser')
    has_links = len(soup.find_all('a'))
    if nombre != "Manuales":
        if not os.path.exists(save_path):
            os.mkdir(save_path)
        new_path = save_path + nombre + ".html"
        save_file(url, new_path)

    if has_links > 0:
        for link in soup.find_all('a'):
            archivo = link.get('href')
            archivo = archivo.split(' ')[0]
            archivo = os.path.basename(archivo)
            nombre, ext = os.path.splitext(archivo)

            new_url = urlparse.urljoin(url, archivo)
            if ext != ".html":
                new_path = save_path + archivo
                save_file(new_url, new_path)
            else:
                new_path = save_path + nombre + "\\"
                process_html(new_url, new_path, nombre)
    else:
        new_path = save_path + nombre + ".html"
        save_file(url, new_path)

def save_file(url, save_path):
    if not os.path.exists(save_path):
        try:
            current = urllib2.urlopen(url)
            print "[*] Descargando: %s en la siguiente ubicacion: %s" % (os.path.basename(url), save_path)

            f = open(save_path, "wb")
            f.write(current.read())
            f.close()
        except urllib2.URLError as e:
            print "[*] No se pudo obtener información del servidor"

url = "http://www.paginafalsa.com/"  # Esta es la pagina inicial donde están nuestros vínculos
save_path = "C:\\Users\\Sistemas\\Desktop\\BPTMP\\ManualesDescargados\\"

process_html(url, save_path, "Manuales")
```

En fin, cualquier duda sobre el código o sugerencias para mejorarlo son bienvenidos.
