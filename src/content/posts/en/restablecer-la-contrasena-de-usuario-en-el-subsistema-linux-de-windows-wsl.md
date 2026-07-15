---
title: 'Restablecer la contraseña de usuario en el Subsistema Linux de Windows (WSL)'
description: 'Cómo recuperar el acceso y restablecer la contraseña de un usuario en WSL cuando la olvidas.'
pubDate: 2025-04-08
tags: [wsl, windows, linux, contraseñas]
categories: [Windows, Linux]
toc: true
---

Sí, lo sé. Se supone que uno no debería olvidar su contraseña, _especialmente_ si tú mismo la configuraste hace unos días. Pero bueno, pasó. Y si estás leyendo esto, seguramente te pasó a ti también. Lo bueno es que recuperar el acceso al subsistema Linux de Windows (WSL) es sorprendentemente fácil, siempre y cuando sigas los pasos correctos.

Aquí te dejo cómo lo solucioné de forma rápida sin mucho drama (bueno, con un poco de drama interno, pero eso es cosa mía). Ten en cuenta de que para esto debes de saber tu nombre de usuario de WLS.

## 1\. Abre el Símbolo del sistema como administrador

La clave está en abrir el buen _cmd_ con permisos de administrador. Puedes buscar “cmd” en el menú inicio, hacer clic derecho y elegir “Ejecutar como administrador”.

## 2\. Ejecuta este comando para iniciar como `root`

Una vez que tengas la consola abierta, escribe este comando:

```
ubuntu config --default-user root
```

Esto le dice a WSL que, la próxima vez que abras el bash de Ubuntu, inicie directamente como el usuario `root`, el todopoderoso administrador que no necesita contraseña.

## 3\. Abre tu bash de Linux (WSL)

Ahora sí, abre tu terminal de Ubuntu como lo haces normalmente. Esta vez, en lugar de tu usuario entrará directo como `root`.

## 4\. Cambia la contraseña del usuario que olvidaste

En la terminal, usa este comando:

```
passwd tu_usuario
```

Obviamente reemplaza `tu_usuario` por tu nombre de usuario real. El sistema te pedirá que ingreses una nueva contraseña. Hazlo dos veces, como siempre.

## 5\. Devuelve el inicio normal a tu usuario

Una vez resuelto el asunto, hay que devolver las cosas a la normalidad. Regresa al cmd (como administrador) y ejecuta:

```
ubuntu config --default-user tu_usuario
```

¡Y listo! Ahora tu terminal de WSL volverá a abrirse con tu usuario de siempre y con la nueva contraseña que acabas de configurar.
