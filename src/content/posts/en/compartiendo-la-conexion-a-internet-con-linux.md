---
title: 'Compartiendo la conexión a Internet con Linux'
description: 'Cómo compartir la conexión a Internet de una laptop con otros equipos usando NetworkManager en Linux.'
pubDate: 2015-03-13
tags: [linux, redes, networkmanager]
categories: [Linux]
---

Apenas hace unos días mis padres me hicieron el favor de traer mi computadora de escritorio. Yo tenía listo un sitio para ubicarla, sin embargo no tomé en cuenta que no contaba con cable suficiente para conectarla a la red, así que tendría que adquirir mucho cable de red o una tarjeta de red, pero mientras tanto ¿cómo la conectaría?. La solución fue simple, utilizar la conexión de la netbook y compartir desde ella el internet.

La configuración es bastante simple, en materia de _hardware_ solo necesitan un _cable de red cruzado_ si solo planean conectar un equipo, o un pequeño _switch_ si desean compartir la conexión con varios equipos. En mi caso tenía un switch sin usar y me pareció una solución más rápida que armar un cable cruzado.

2015-03-12%2022.00.00_zpso43cod6o.jpg

En el caso de _**CrunchBang**_ que es la distro que tengo en la netbook, y prácticamente cualquier distribución Linux que use **NetworkManager,** lo que tienen que hacer es editar la **conexión cableada** y en el apartado **Ajustes de IPv4** en la opción **Método** seleccionaremos _**Compartida con otros equipos**_. Esto creará una subred y convertirá al equipo con Internet, en este caso mi netbook, en la puerta de enlace para el resto de los equipos dentro de esta subred.

Captura%20de%20pantalla%20-%20120315%20-%20215847_zpsl35oswsz.png

Así de sencillo es compartir el internet desde un equipo conectado inalámbricamente al resto de nuestra red.
