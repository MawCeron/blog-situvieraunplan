---
title: 'Instalando VirtualBox en Linux Mint 17'
description: 'Cómo agregar el repositorio oficial de VirtualBox e instalarlo en Linux Mint 17.'
pubDate: 2015-03-29
tags: [linux, linux-mint, virtualbox, virtualización]
categories: [Linux]
---

Si hay algo que caracteriza a los usuarios **Linux** es que en algún momento pasan por una fase llamada _Distro Hopping_, es decir, cambiar constantemente la distribución que tienen instalada para probar una nueva. O también es posible que necesitemos ejecutar algún software que solo está disponible en el SO de las ventanitas. Para esas ocasiones siempre es útil contar con una máquina virtual, y VirtualBox es uno de los software especializados mas apreciado por muchos para todo tipo de tareas de virtualización de sistemas operativos, así que les mostraré como instalarlo en Linux Mint.

VBox_zpsq3qe388c.png

Antes que nada agregamos el repositorio oficial de Virtualbox. Para esto abrimos una terminal y ejecutamos lo siguiente:

```
sudo sh -c 'echo "deb http://download.virtualbox.org/virtualbox/debian trusty contrib" >> /etc/apt/sources.list'
```

Lo siguiente será agregar la llave pública de dicho repositorio.

```
wget -q https://www.virtualbox.org/download/oracle_vbox.asc -O- | sudo apt-key add -
```

Finalmente actualizamos la lista de paquetes e instalamos los correspondientes.

```
sudo apt-get update; sudo apt-get -y instal virtualbox-4.3 dkms
```

Y listo, tenemos la versión más actualizada de Oracle VirtualBox.

VboxVer_zpsjnrm67vv.png
