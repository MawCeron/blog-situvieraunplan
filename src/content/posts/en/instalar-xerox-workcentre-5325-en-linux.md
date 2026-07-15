---
title: 'Instalar Xerox WorkCentre 5325 en Linux'
description: 'Cómo instalar una impresora Xerox WorkCentre 5325 sin drivers oficiales en Linux usando CUPS y el driver genérico PCL 5e.'
pubDate: 2026-06-05
tags: [linux, cups, impresoras, cachyos]
categories: [Linux]
toc: true
heroImage: ../../../assets/images/posts/instalar-xerox-workcentre-5325-en-linux/gemini_generated_image_tafot8tafot8tafo.png
---

Ha pasado ya bastante tiempo desde que:

1. Linux se volvio mi Sistema Operativo en el trabajo

3. Necesité imprimir algo

Hagamos la historia corta, necesitaba imprimir un par de hojas para tenerlas a la mano mientras hago ajustes a algunas partes del sistema ERP de la empresa (ya les hablaré pronto sobre eso)... La última vez que necesité imprimir algo ni siquiera trabajaba en esta empresa, así que me tocó configurar la impresora en mi equipo. Y así, de un momento a otro tocó enfrentar a una **_Xerox WorkCentre 5325_** fabricada hace unos 10 años o más, contra mi recien instalado **CachyOS** (Arch).

Empecé como cualquier otro lo haría, fui al sitio oficial de soporte de Xerox, busqué el modelo, elegí Liunux en OS... Y nada, aunque en algunos blogs mencionan que debería de haber controladores. Pero bueno, es una impresora vieja después de todo, quizá ya no tenga soporte oficial para Linux _(mal ahí Xerox, si diseñas algo para que funcione por decadas al menos deja lo último del soporte)_... Así que decidí ayudarme del tradicional [**CUPS**](https://openprinting.github.io/cups/); grande fue mi sorpresa al ver que _OpenPrinting_ ofrece controladores para medio catálogo de impresoras Xerox, menos para la que necesitaba. Así que tocó tirar de controladores genéricos.

Hice una prueba con los **Generic PostScript**, pero no funcionó... Luego recordé que la impresora tiene soporte **PCL6 y PCL5e**, así que para no arriesgar e ir a la segura elegí el siguiente:

**Generic PCL 5e Printer - CUPS+Gutenprint v5.3.5**

PCL5e es más conservador y en impresoras de oficina de esa generación suele ser la opción más estable. Y lo más importante: el resultado es el mismo para documentos del día a día. Así que si ustedes necesitan instalarla aquí les dejo que hay que hacer:

## **Lo que sí o sí hay que tener:**

- CUPS instalado y corriendo

- `foomatic-db` y `foomatic-db-gutenprint-ppds` (o equivalente en tu distro)

## **1\. Instalar dependencias**

**Arch/CahyOS/Manjaro:**

```bash title="Terminal" frame="terminal"
sudo pacman -S cups foomatic-db foomatic-db-engine foomatic-db-gutenprint-ppds

```

**Debian/Ubuntu/Mint:**

```bash title="Terminal" frame="terminal"
sudo apt install cups printer-driver-gutenprint foomatic-db

```

**Fedora/RHEL:**

```bash title="Terminal" frame="terminal"
sudo dnf install cups gutenprint foomatic

```

## **2\. Habilitar CUPS** (en caso que no se habilite en automático)

```bash title="Terminal" frame="terminal"
sudo systemctl enable --now cups

```

## **3\. Agregar la impresora**

En `http://localhost:631` → Administración → Agregar impresora:

- **Conexión:** selecciona la impresora detectada por red (dnssd/Bonjour) o ingresa la IP manualmente como `socket://192.168.x.x`

- **Driver:** `Generic PCL 5e Printer - CUPS+Gutenprint v5.3.5`

## **4\. Ajustes recomendados**

- Papel: `Letter` o `A4` según corresponda

- Dúplex: `two-sided-long-edge` si se usa frecuentemente

## **Limitaciones con este driver**

- Sin contabilidad de trabajos

- Sin selección de bandeja específica

- Sin grapado/perforado/plegado

- Sin impresión segura con PIN

Y listo, espero que le sea de ayuda a alguien, y si de casualidad sabes de alguien que tiene el PPD o los drivers originales de Xerox, es bienvenido a compartirlos.
