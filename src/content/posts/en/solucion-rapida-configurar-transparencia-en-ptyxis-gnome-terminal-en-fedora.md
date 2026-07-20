---
title: "Configurar transparencia en Ptyxis (GNOME Terminal) en Fedora"
description: "Cómo activar la transparencia en Ptyxis, la nueva terminal de GNOME, usando dconf."
pubDate: 2026-07-20
tags: [linux, fedora, gnome, terminal]
categories: [Linux]
toc: false
heroImage: ../../../assets/images/posts/heroes/ptyxis-transparencia.png
---

Hoy les traigo un tip rapidito, de esos que se resuelve en dos minutos y anoto aquí para no tener que volver a buscarlo la próxima vez que reinstale (que, tomando como base mi historial reciente, va a ser pronto).

## El problema

Ptyxis —la terminal que GNOME adoptó para reemplazar a GNOME Terminal— no tiene, al menos por ahora (que ya está documentado), una opción visible en su interfaz para configurar la transparencia del fondo. Si vienes de años de tener ese ajuste a un clic de distancia, se siente como un paso atrás.

Y no es que no se pueda. La opción existe, solo que vive en `dconf` y no en el menú de preferencias. Son dos comandos.

Primero, obtén el UUID de tu perfil por defecto:

```bash title="Terminal"
dconf read /org/gnome/Ptyxis/default-profile-uuid
```

Esto te va a regresar algo como:

```
'3aae5a177777aa966b1fd63467153e2d'
```

Toma ese valor (sin las comillas) y sustitúyelo en el siguiente comando para activar la transparencia:

```bash title="Terminal"
dconf write /org/gnome/Ptyxis/Profiles/3aae5a177777aa966b1fd63467153e2d/opacity 0.85
```

El valor `0.85` es el nivel de opacidad —entre `0` (completamente transparente) y `1` (completamente opaco)—, así que ajústalo a tu gusto.

Y ya, con eso queda.
