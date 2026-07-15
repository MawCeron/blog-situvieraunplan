---
title: 'Cifrado Atbash en Python'
description: 'Cómo implementar el cifrado Atbash, un método clásico de sustitución de espejo, en Python.'
pubDate: 2014-12-17
tags: [python, criptografía, algoritmos]
categories: [Python]
---

Algo que muy pocos saben es que soy un aficionado a todo tipo de **puzzles**, entre ellos obviamente a los mensajes cifrados o en código. Actualmente estoy trabajando en un proyecto personal que los involucra y del cual espero darles noticias más concretas muy pronto. Este proyecto quise empezarlo con algo bastante sencillo, en este caso el **cifrado Atbash**.

Atbash es un método muy común de cifrado del alfabeto **hebreo**. Pertenece a la llamada criptografía clásica y es un tipo de cifrado por sustitución. Se le denomina también _método de espejo_, pues consiste en sustituir la primera letra (álef) por la última (tav), la segunda (bet) por la penúltima (shin) y así sucesivamente. Por tanto en castellano la A será sustituida por la Z, la B por la Y, etc.

Como pueden ver es un método de cifrado muy sencillo, así que veamos el código para conseguirlo. Lo interesante es que por las características de este método el mismo script puede tanto cifrar como descifrar mensajes.

```
def atbash(message):
    alphabet = u'A B C D E F G H I J K L M N Ñ O P Q R S T U V W X Y Z a b c d e f g h i j k l m n ñ o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9'.split()
    backward = u'Z Y X W V U T S R Q P O Ñ N M L K J I H G F E D C B A z y x w v u t s r q p o ñ n m l k j i h g f e d c b a 9 8 7 6 5 4 3 2 1 0'.split()
    cipher = []
    
    for letter in message:
        if letter in alphabet:
            for i in xrange(len(alphabet)):
                if alphabet[i] == letter:
                    pos = i
            cipher.append(backward[pos])
        else:
            cipher.append(letter)
    
    newMessage = ''.join(cipher)
    return newMessage

crypt = atbash(u'Hola Mundo')
print crypt

```

Trataré de explicar el código de forma simple. Primero definimos la función a la cual enviaremos el mensaje, dentro de esta creamos un par de listas con el alfabeto (mayúsculas y minúsculas) y números en orden normal e inverso. También creamos una tercer lista donde iremos almacenando las letras conforme las vayamos cambiando.

Después, por cada letra en el mensaje verificamos si la letra se encuentra en nuestra lista del alfabeto. Posteriormente revisamos la lista y comparamos los elementos para determinar en qué posición de la lista se encuentra y agregamos a nuestra lista cifrada la letra correspondiente del alfabeto inverso. En el caso de que la letra no se encontrara en ninguna de nuestras listas, como es el caso de los espacios y signos de puntuación los agrega sin cambios a nuestra lista cifrada.

Terminamos la función uniendo la lista cifrada en una sola cadena de texto, la almacenamos en una variable que devolveremos. Como ven es bastante simple de entender y un buen ejercicio para los que apenas se están iniciando en la programación python.

Sin más que agregar solo me queda decirles lo siguiente: **Vhkvil jfv hv wrervigzn vnerznwl ñvhzqvh hvxivglh fhznwl vhgv hxirkg. Zwróh**
