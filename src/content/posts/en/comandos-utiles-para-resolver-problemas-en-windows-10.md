---
title: 'Comandos útiles para resolver problemas en Windows 10'
description: 'Una recopilación personal de comandos de símbolo de sistema para diagnosticar y reparar problemas comunes de conexión y archivos de sistema en Windows 10.'
pubDate: 2017-01-16
tags: [windows, cmd, troubleshooting, sistemas]
categories: [Windows]
---

Empecemos dejando las cosas en claro, esta entrada **NO es un tutorial** ni nada por el estilo, es más como un apunte personal, una simple compilación de los comandos que me he ido encontrando para resolver algunos de los tantos problemas que he encontrado en Windows 10 y ocasionalmente en Windows 8. Por lo que pueden o no solucionar tu problema. Creo que está de más decirlo, pero, deben ejecutarse en el símbolo de sistema como administrador.

Otra cosa que quiero mencionar es que si ya no quieren problemas con Windows ni ahora, ni en un futuro, mi recomendación es que usen Linux o si se lo pueden permitir adquieran una Mac. **Por favor aléjense de Microsoft.**

## Problemas de conexión a Internet

Por alguna razón es bastante común que Windows 10 de repente deje de conectarse a Internet, normalmente cuando revisas en busca del problema te dice que es por una mala configuración de IP, algo que entendería si nosotros la designaramos, pero el problema suele suceder cuando esta configurado para que la IP se asigne en automático. Para corregirlo basta con poner lo siguiente:

```
netsh int ip resettcpip.txt
```

## Windows se comporta extraño, bueno, como Windows

En ocasiones parece que todo empieza a fallar y que nada quiere funcionar, para esas ocasiones lo mejor es revisar si hay algún archivo de sistema corrupto

```
sfc /scannow
```

En caso de que encuentre algún problema o simplemente la revisión no pueda ejecutarse como es debido significa que tenemos cosas que arreglar.

```
DISM /Online /Cleanup-Image /RestoreHealth
```
