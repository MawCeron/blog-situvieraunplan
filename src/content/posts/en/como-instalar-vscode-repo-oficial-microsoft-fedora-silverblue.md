---
title: "Cómo instalar Visual Studio Code desde el repositorio oficial de Microsoft en Fedora Silverblue"
description: "Los pasos para agregar el repo oficial de Microsoft y dejar VS Code instalado a nivel de sistema con rpm-ostree en Fedora Silverblue, incluyendo por qué el típico rpm --import falla aquí y cómo evitarlo."
pubDate: 2026-07-22
tags: [linux, fedora, silverblue, vscode, programación]
categories: [Linux]
heroImage: '../../../assets/images/posts/heroes/vscode-silverblue.png'
---

VS Code no viene en los repos oficiales de Fedora (por licencia, es de Microsoft, no de código abierto en su build oficial), así que la instalación "normal" vía `dnf`/`rpm-ostree` no lo va a encontrar hasta que le agreguemos su repositorio.

Y si buscas cómo hacerlo, la mayoría de guías te van a decir que primero importes la llave GPG de Microsoft con `rpm --import`. En Silverblue, eso te va a tronar:

```
error: no puede crear el bloqueo transacción sobre /usr/share/rpm/.rpm.lock (Sistema de ficheros de sólo lectura)
error: https://packages.microsoft.com/keys/microsoft.asc: la importación de la llave 1 ha fallado.
```

Nada raro: `rpm --import` intenta escribir directo en la base de datos de RPM dentro de `/usr`, que en Silverblue es de solo lectura por diseño. La buena noticia es que ese paso ni siquiera hace falta.

## La solución

### Paso 1: Crear el archivo del repositorio (sin importar la llave a mano)

```bash
sudo echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\nautorefresh=1\ntype=rpm-md\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" | sudo tee /etc/yum.repos.d/vscode.repo > /dev/null
```

El truco está en la línea `gpgkey=`: con eso ya le estás diciendo a `rpm-ostree` de dónde descargar y verificar la llave automáticamente al momento de instalar, así que no necesitas el `rpm --import` manual que falla en un sistema de solo lectura como este.

### Paso 2: Instalar con rpm-ostree

En Silverblue no se usa `dnf install` directo al sistema, se hace vía layering con `rpm-ostree`:

```bash
rpm-ostree install code
systemctl reboot
```

Como con cualquier layer de `rpm-ostree`, hace falta reiniciar para que el nuevo árbol quede activo. La verificación de la llave GPG ocurre justo en este paso, automáticamente.

### Paso 3: Confirmar que quedó bien

```bash
code --version
```

## Sobre las actualizaciones

Como quedó agregado como un repo de sistema (no como Flatpak), las actualizaciones de VS Code van a llegar junto con las actualizaciones normales del sistema:

```bash
rpm-ostree upgrade
```

Si prefieres separar las actualizaciones de VS Code de las del sistema operativo (para no tener que reiniciar cada que sale una versión nueva del editor), la alternativa sería instalarlo vía Flatpak en su lugar — pero para un editor de uso diario, tenerlo integrado al sistema vía `rpm-ostree` es perfectamente razonable, sobre todo si ya tienes otras herramientas instaladas de la misma forma.
