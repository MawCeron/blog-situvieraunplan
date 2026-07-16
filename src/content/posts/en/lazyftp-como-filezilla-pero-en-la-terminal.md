---
title: 'lazyftp: Como FileZilla, pero en la terminal'
description: 'lazyftp, un cliente TUI para FTP y SFTP escrito en Go, pensado para no salir de la terminal ni romper el flujo de trabajo con el teclado.'
pubDate: 2026-04-17
tags: [go, tui, ftp, herramientas, open-source]
categories: [Herramientas, Programación]
heroImage: '../../../assets/images/posts/heroes/lazyftp.png'
heroImageAlt: "Captura de pantalla de lazyftp"
---

Por azares de la vida pasé 11 años en terrenos medio raros —sí Windows, te estoy hablando a ti— el destino me permitió regresar a Linux.

El plan era sencillo, instalar Fedora con Gnome, volver a dónde lo había dejado. Pero, como siempre, nada fue como esperaba. Gnome se sentía extraño, alienigena, había algo —no se bien qué— que no me terminaba de convencer, en apariencia era lo mismo de siempre. Así que decidí "probar tantito" de otras distros, entornos de escritorio, windows managers… ¿Qué podía pasar?

Terminé instalando Arch Linux a la una de la mañana y jugando con las configuraciones de Hyprland como si no hubiera consecuencias. Y sí las hay.

Porque cuando ya tienes todo armado en un Window Manager que prioriza la utilización del teclado, empiezas a desarrollar una especie de rechazo —¿o alergia?— automático a cualquier cosa que no encaje o rompa tu flujo de trabajo. Interfaces pesadas,clics innecesarios, salirte de la terminal para hacer algo simple.

Y justamente esto último fue el problema.

En el trabajo necesitaba descargar un par de archivos algo pesados de un servidor. Nada especial que el buen FTP no pudiera resolver. La solución era obvia: instalar FileZilla, descargar los archivos, seguir con mi vida.

Si tan solo, fuera tan fácil. Abrir una GUI como la de FileZilla en medio de un entorno optimizado para teclado se siente sacrílego. No es que no funcione, solo que rompe el ritmo y flujo de trabajo.

Entonces volteé a ver que opciones había para trabajarlo desde terminal. Y sí, hay varias, y funcionan bastante bien, pero todas sufren del mismo dolor: resuelven tu problema, pero no se preocupan mucho por la UX.

Y la neta, me dio hueva ponerme a aprender nuevos comandos. Quizá en algún repo perdido de github haya algo más cercano a utilizar lazygit… No había nada.

Así que hice lo que cualquier programador que se precia haría cuando algo lo molesta lo suficiente: dediqué mi fin de semana a construir la herramienta que quería tener.

Azúcar (bubbletea), flores (lipgloss), y mucho GoLang… ¡Así nació **lazyftp**!

No nació por la falta de herramientas, sino por la falta de comodidad. No es como que no se pudiera usar FTP en la terminal. Claro que se puede. La cosa es querer hacerlo.

Además, existe una clara diferencia entre poder hacer algo y que se sienta natural hacerlo. Los clientes FTP de terminal suelen caer en lo primero. Yo quería lo segundo; algo donde no tienes que pensar demasiado. Solo haces cosas.

lazyftp es eso: un cliente TUI para FTP y SFTP pensado para no complicarte la vida. Abres, conectas, navegas, transfieres. Ya.

No hay que recordar comandos largos, cambiar de contexto, pensar en la sintaxis correcta.

Su layout — no voy a mentir, fuertemente inspirado en FileZilla— de doble panel: local y remoto lado a lado, te permite ver todo al mismo tiempo, sin tener que estar adivinando rutas o estados.

El flujo de transferencia es bastante obvio: si estas en local, sube; si estas en remoto, descarga. No hay más.

Puedes marcar varios archivos con 'x' y mandarlos juntos, porque claro, nunca quieres transferir solo un archivo. Y en todo momento ves lo que está pasando: progreso en vivio, dirección de la transferencia, logs. No tienes que quedarte esperando a ver si funcionó o no.

Y claro, el teclado es el centro de todo. Navegas con 'j' y 'k' (o las flechas si lo prefieres), entrar a una carpeta con 'enter' o 'espacio', marcar con 'x' los archivos que quieres e iniciar la transferencia con 't'. Simple, ¿no?

No necesitas configurar nada para empeza. Literal es iniciar la herramienta, ingresar los datos de conexión, enter y listo. Tampoco tienes que preocuparte por elegir entre FTP o SFTP. El puerto decide por tí.

Ese tipo de cosas son las que hacen que algo no sea solamente "útil", sino usable.

Nunca hubo una gran visión detrás de este proyecto. No es como que haya dicho "voy a construir el mejor cliente FTP del mundo". Fue más bien: esto me molesta → lo arreglo → lo uso. ¡Y ya!

Obviamente quedan muchas cosas pendientes, que mejorarían la herramienta:

- Soporte para SSH Keys

- Poder renombrar y/o borrar archivos

- Crear directorios

- Modificar permisos

- Conexiones guardadas (para no tener que estar ingresando los datos cada vez)

- Multiples conexiones

La verdad, lazyftp no es nada glamuroso o revolucionario, ni pretende serlo. Después de todo, ya cumplió su propósito, y me evita tener que instalar FileZilla.

**_¿Ya dije que es OpenSource?_** Así que pueden modificarla, mejorarla, hacer que reproduzca un 'yamete! onichan' cada que se conectan a un servidor, lo que quieran. Si están en linux debería de funcionar sin problemas, se supone que tambien en MacOS… En windows la verdad no tengo idea.

Si les interesa, quieren echarle un vistazo o solo quieren criticar mi código aquí esta el repo de Github: [https://github.com/MawCeron/lazyftp/](https://github.com/MawCeron/lazyftp/)
