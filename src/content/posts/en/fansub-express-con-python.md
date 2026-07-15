---
title: 'Fansub Express con Python'
description: 'Un script en Python que automatiza la traducción de subtítulos de Aegisub usando Google Translate, como experimento de fansub.'
pubDate: 2017-01-09
tags: [python, fansub, automatización, anime]
categories: [Python, Anime]
---

Este año lo empecé con muchas ganas de programar y muchas ganas de ver anime. Para ser exactos, en cuanto anime tan solo la primer semana del año vi tres películas, cinco series completas y me puse al corriente con otras dos, sin mencionar que vi los primeros capítulos de varios de los nuevos estrenos. Lo sorprendente del caso es que no he tenido vacaciones y no me he desvelado, ¿cómo lo conseguí?, no tengo idea... En cuanto a programación hice un sencillo bot para twitter (que pronto les explicaré como hacerlo) y un par de apps que me encargaron en el trabajo y cómo no, este script que les traigo el día de hoy.

Como ya sabrán (y si no, es hora de que se enteren) hace algunos años me metí en el mundo del fansub, lo cual es un trabajo bastante entretenido, pero lleva su tiempo hacerlo bien, traducir bien un episodio de 24 minutos puede llevar un par de horas aún teniendo ya los diálogos en texto para basarse en ellos. Otra cosa que no es novedad es que muchos fansubers traducen desde otros fansubs en inglés y se apoyan de Google Translate sin descaro, así que pensé, por qué no automatizar el proceso y que GT haga todo el trabajo.

Este script en Python hace precisamente eso, lee un archivo de Aegisub con los subs en Inglés y los traduce con Google para finalmente reensamblar el archivo con los subs ya traducidos.

```python
# -*- coding: utf-8 -*-
import re, sys
import urllib, urllib2, HTMLParser

def translation(text, to_lang, from_lang):
    agent = {'User-Agent': "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.04506.30)"}

    base_link = "http://translate.google.com/m?hl=%s&sl=%s&q=%s"
    to_trans = urllib.quote_plus(text)
    link = base_link % (to_lang, from_lang, to_trans)
    req = urllib2.Request(link, headers=agent)
    response = urllib2.urlopen(req).read()

    data = response.decode("utf-8")
    expr = r'class="t0">(.*?)<'
    re_result = re.findall(expr, data)

    if (len(re_result) == 0):
        result = ""
    else:
        result = unescape(re_result[0])

    return result.encode('utf-8')

def unescape(text):
    if (sys.version_info[0] < 3):
        parser = HTMLParser.HTMLParser()
    else:
        parser = html.parser.HTMLParser()
    return (parser.unescape(text))

new_script = []
with open('kokoro.ass') as fp:
    for line in fp:
        line = line.strip()

        if line.startswith('Dialogue:') or line.startswith('Comment:'):
            event_type, rest = line.split(": ", 1)
            buf = rest.split(',')
            dialogue = buf[9]
            text = buf[9].replace('\\N', '\\n')
            text = re.sub(r'{.*?}', '', text)
            trans = translation(text, 'es', 'en')
            trans = trans.replace('\\n', '\\N')
            buf[9] = trans
            rest = ','.join(buf)
            new_line = "%s: %s" % (event_type, rest)
            new_script.append(new_line)
        else:
            new_script.append(line)

nfp = open('kokoro_es.ass', 'w')
for item in new_script:
    nfp.write("%s\\n" % item)

fp.close()
nfp.close()
```

Probé el script con la película Kokoro ga Sakebitagatterunda que tiene cerca de 2,000 líneas, lo que es bastante y solo ha tardado poco más de 15 minutos en traducirlo todo.

Finalmente hay que destacar que he hecho este script solamente como un reto para ver si era posible, no recomiendo utilizarlo para hacer fansub, de hecho ni siquiera como apoyo. La traducción resultante es mala, algunas lineas no se traducen en lo absoluto y cuando se traducen muchas veces son carentes de sentido; sin mencionar que el uso del script puede generar bastantes errores, principalmente por parte de Google pues se realizan demasiadas peticiones continuas al servidor lo que en ocasiones genera que no permitan la conexión.

Si alguien gusta seguir trabajándolo y optimizarlo toda sugerencia es bienvenida.
