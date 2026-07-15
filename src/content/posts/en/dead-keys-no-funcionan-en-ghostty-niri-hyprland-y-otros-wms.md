---
title: 'Dead keys no funcionan en Ghostty (Niri, Hyprland y otros WMs)'
description: 'Por qué las dead keys dejaron de funcionar en Ghostty bajo Wayland desde GTK 4.20, y cómo arreglarlo con GTK_IM_MODULE en Niri y Hyprland.'
pubDate: 2026-06-19
tags: [linux, ghostty, wayland, gtk, niri, hyprland]
categories: [Linux]
toc: true
---

¿Quién diría que sería testigo de un fantasma ignorando a los muertos?

Llevo tiempo usando Ghostty como mi terminal principal, la utilicé en mi regreso a Fedora, pero cuando hice el cambio de Fedora con GNOME a Wayland (Omarchy) y posteriormente a Niri (CachyOS) simplemente comencé a utilizar Alacritty, sin mayores problemas para configurarl y adaptarme. Para no hacerles el cuento largo, un día Yazi se convirtio en mi file manager predeterminado, pero había un problema con Alacritty y era la preview de imagenes y PDFs, así que decidí volver a la vieja confiable Ghostty, pero de repente mis dead keys dejaron de funcionar. Nada de tildes, nada de `~`, nada de `^`. Como si el teclado decidiera que era bueno tomarse unas vacaciones sin avisarme cada que abría la terminal.

## ¿Dónde esta el problema?

A partir de GTK 4.20, GTK dejó de encargarse de las dead keys cuando se usa Wayland. Antes lo hacía solito; ahora espera que haya un _input method framework_ instalado (IBus, Fcitx 5) que se encargue de eso. La lógica tiene sentido: ese trabajo no le corresponde a un toolkit gráfico. Es como si tu chofer personal se encargara de hacerte la comida: lo puede hacer, quizá hasta competentemente bien, pero esa es chamba de tu chef personal (porque todos tenemos chef personal, ¿no?). El problema es que si no tienes ningun _IMF_ (pa' abreviar) instalado, GTK simplemente descarta las teclas en silencio y tú te quedas preguntándote qué pasó.

Por eso en GNOME nadie notó nada: GNOME trae IBus de fábrica. Pero en entornos más minimalistas —Niri, Hyprland, lo que sea que no sea GNOME, KDE o cualquiera de esos monstruos consume recursos— de repente te quedas sin acentos y sin virgulilla (sí, así se llama esa cosa arriba de la ñ).

(El issue está documentado en la [discusión #8899 del repo de Ghostty](https://github.com/ghostty-org/ghostty/discussions/8899) por si quieren leer la historia completa.)

## La solución que me funcionó

La más directa: decirle a GTK que siga usando su implementación interna con una variable de entorno.

```
GTK_IM_MODULE=simple

```

Como uso **Niri**, la puse directo en la configuración del compositor para que aplique a todas las apps GTK:

```
// ~/.config/niri/config.kdl
environment {
    GTK_IM_MODULE "simple"
}

```

Guardé y listo, ni siquiera tuve que reiniciar sesión, solo volví a abrir la terminal. Tildes, `~`, `^`, todo de vuelta.

Si usan **Hyprland**, pueden ponerla globalmente en su config:

```
env = GTK_IM_MODULE,simple

```

O solo para cuando lanzan Ghostty:

```
bind = $mainMod, Return, exec, GTK_IM_MODULE=simple ghostty

```

## ¿Y si quiero algo más... completo?

`GTK_IM_MODULE=simple` usa la implementación básica de GTK. Para el día a día —español, inglés, dead keys estándar— es más que suficiente. Pero si necesitan soporte para varios idiomas o escrituras más complejas, la solución de fondo es instalar IBus o Fcitx 5 y configurarlo en el entorno.

Con IBus en Niri quedaría algo así:

```
environment {
    GTK_IM_MODULE "ibus"
    QT_IM_MODULE  "ibus"
    XMODIFIERS    "@im=ibus"
}

```

Aunque eso ya es chamba para otro día.

Por ahora, con `simple` estoy contento.
