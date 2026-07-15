---
title: "Las crónicas de Windows Vista"
description: "La cronología completa, hora por hora, de un intento de restaurar una laptop Toshiba Satellite con Windows Vista para una maestra del centro donde trabajo."
pubDate: 2009-11-25
updatedDate: 2026-07-15
tags: [windows, anécdotas, humor, troubleshooting]
categories: [Windows, Personal]
---

El día sábado, una de las maestras encargadas de impartir un diplomado en el centro en que trabajo me trajo una laptop **Toshiba Satellite** y me preguntó si podía restaurársela. Sí, así como lo leen: ni siquiera me pidió que la revisara, la orden era restaurarla a su estado original.

No puse ninguna objeción y acepté hacerle el favor a la maestra, pero, el sábado pasado no estaba precisamente interesado en reparar una laptop, así que la dejé, olvidándome de ella hasta el día martes que regresé a trabajar. He aquí la cronología de este acontecimiento:

## Martes 24 de noviembre

- **09:15 am** — Al llegar recordé que debía restaurar la laptop, pero me dije a mí mismo: *bueno, ¿y qué chin… carajo tiene?* Pensé que tal vez podría repararse sin tener que recurrir a la restauración y así me ahorraría el tener que respaldar los archivos de la maestra, así que procedí a encender la laptop.
- **09:25 am** — La laptop Toshiba Satellite, a la cual a partir de este momento llamaré simplemente **Toshi**, comienza a arrancar.
- **09:27 am** — Aparece en la pantalla el mensaje que me pregunta si quiero iniciar en modo seguro o de forma normal, lo cual no es una buena señal, pero tampoco es tan mala. Para evitar cualquier sorpresa, selecciono *Iniciar en Modo Seguro con Compatibilidad de Red* o algo así, y la dejo cargando Windows mientras atiendo otras ocupaciones.
- **10:35 am** — Windows Vista aún no carga; reinicio el equipo.
- **10:36 am** — Aparece nuevamente el mensaje, esta vez más preocupante, ya que me da solo dos opciones: *Reparar Arranque de Windows* o *Iniciar Windows Normalmente*. Como cualquier persona sensata, deduzco que la opción reparar solo generará más conflictos de los ya existentes, así que inicio normalmente.
- **10:37 am** — Comienza a desplazarse por la pantalla la barrita de carga de Windows.
- **01:26 pm** — Después de leer varios webcómics, recuerdo la lap, y grande es mi sorpresa al descubrir que en pantalla sigue la barrita de carga de Windows. Me dije a mí mismo: *a partirle su ma…ndarina a Windows, que para eso fue hecho.*
- **01:30 pm** — Intento arrancar mi *live* de Ubuntu desde USB, que casi siempre cargo para respaldar los archivos de la maestra en unos DVDs que me proporcionó, pero Toshi es tan vieja que no permite bootear desde USB. Idea descartada.
- **01:48 pm** — Después de una ardua investigación (y varios webcómics más ^^), recuerdo que en uno de los blogs que sigo vi una forma de recuperar archivos de una máquina en la que Windows no arranca, así que me dirijo al blog de **linuxman**.
- **02:06 pm** — Encuentro el artículo [«A respaldar que el mundo se va a acabar»](http://linuxman.blogsome.com/2008/11/12/a-respaldar-que-el-mundo-se-va-a-acabar/), que era el que me interesaba, ya que indica cómo montar, con ayuda del **Trinity Rescue Kit**, todos los discos duros de la computadora y volverlos disponibles como compartidos en una red de Windows. Así que comienzo a descargarme el TRK.

  Trinity Rescue Kit es una aplicación muy buena que funciona tanto para respaldar como para resetear contraseñas de Windows y recuperar archivos eliminados, entre otros. Aquí les dejo los links de los tutoriales que yo sigo:

  - [Resetear contraseñas de Windows con Trinity Rescue Kit](http://linuxman.blogsome.com/2008/08/25/resetear-contrasenas-de-windows-con-trinity-rescue-kit/)
  - [Santos archivos eliminados](http://linuxman.blogsome.com/2008/11/10/santos-archivos-eliminados/)
  - [A respaldar que el mundo se va a acabar](http://linuxman.blogsome.com/2008/11/12/a-respaldar-que-el-mundo-se-va-a-acabar/)
  - [Trinity Rescue Kit en busca del virus maldito](http://linuxman.blogsome.com/2009/01/24/trinity-rescue-kit-en-busca-del-virus-maldito/)

- **02:13 pm** — Terminó de descargarse los 131 MB del ISO del Trinity Rescue Kit, y caigo en la cuenta de que no tengo un CD para grabarlo (¬ ¬).
- **02:21 pm** — Regreso a mi aula con un CD de &dollar;10 en los bolsillos de la chamarra y un helado de &dollar;5 en la mano ^^, y comienzo a grabar el CD.
- **02:36 pm** — Break para comer.
- **03:40 pm** — Con las fuerzas restauradas por la comida, sigo las instrucciones del blog de linuxman para respaldar los archivos y descubro que **¡funciona!** En mi PC encuentro la lap compartida.
- **03:52 pm** — Mi alegría se vio convertida en humo cuando descubro que las carpetas compartidas están vacías.
- **03:59 pm** — Decido no rendirme y pruebo de nuevo el TRK, ahora seleccionando en el menú principal la opción *TRK 3.3 – Fileshare all drives as guest, no security*. Sí, sé que compartir todo el disco sin ningún tipo de seguridad es riesgoso, pero de cualquier forma toda la info sería eliminada posteriormente.
- **04:01 pm** — **¡Funciona, funciona, funciona!**
- **04:01:30 pm** — Inicio transferencia de archivos de Toshi a mi PC.
- **05:26 pm** — Comienzo la restauración de Toshi.
- **06:45 pm** — Toshi ha terminado su restauración y funciona *"correctamente"*; comienzo a regresar los documentos a sus respectivos lugares de origen.
- **06:48 pm** — Después de que Vista calcule el tiempo de transferencia, decido que es más sensato continuar mañana y apago a Toshi.

## Miércoles 25 de noviembre

- **09:03 am** — Llego temprano y enciendo a Toshi.
- **09:10 am** — Toshi ha arrancado sin ningún inconveniente. Comienza la transferencia de sus documentos.
- **09:13 am** — Termina el cálculo de tiempo de transferencia… Es mucho, pero si algo me ha enseñado la vida es que Windows nos engaña con sus tiempos, y en unos minutos u horas se reducirá drásticamente.
- **11:59 am** — WTF??!!
- **02:06 pm** — Por eso detesto Windows… En un momento de la transferencia, el tiempo restante alcanzó los **5 días 23 horas**.
- **02:08 pm** — Terminaré este artículo aquí. Si algún día termina esta transferencia, se los haré saber.
