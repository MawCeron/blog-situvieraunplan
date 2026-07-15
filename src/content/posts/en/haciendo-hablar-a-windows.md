---
title: 'Haciendo hablar a Windows'
description: 'Cómo hacer que Windows lea texto en voz alta con solo cuatro líneas de VBScript, sin instalar nada adicional.'
pubDate: 2017-06-06
tags: [windows, vbscript, scripting]
categories: [Windows]
---

_**¿Que bonito es programar, no?**_ El día de hoy les traigo una de esas cosas curiosas que podemos lograr con unas cuantas líneas de código, y que nos puede hacer quedar bien frente a nuestros amigos no tan geeks y fácilmente impresionables. Hoy les explicaré como hacer hablar a su computadora con Windows.

Tal vez parezca algo complicado, y quizá crean que terminarán escuchando una voz toda fea y robótica como las de los programas como Loquendo, pero si tienen un Windows más o menos actual obtendrán una voz bastante clara. Y lo mejor, no necesitamos descargar nada, solo necesitamos el Bloc de Notas y escribir 4 líneas de código. Sí, leyeron bien **CUATRO LÍNEAS.**

Es tan fácil como abrir el Bloc de notas y copiar las siguientes líneas:

```vb
Dim Mensaje, Habla
Mensaje=InputBox("Ingresa texto","Habla")
Set Habla=CreateObject("sapi.spvoice")
Habla.Speak Mensaje
```

Lo guardamos con el nombre que queramos con la extensión **VBS**, por ejemplo **_"habla.vbs"_**. Ahora simplemente daremos doble clic en el archivo que creamos, nos debe aparecer un mensaje similar al siguiente:

speak.png

El resto es bastante simple, escribimos el texto que queramos que diga y pulsamos aceptar. Ahora podrán hacer hablar a su computadora cuando quieran.

_Ojalá que lo hayan disfrutado. Les deseo, felices trazos._
