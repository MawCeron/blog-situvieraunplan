---
title: 'Script Batch para generar respaldos automáticos'
description: 'Un script Batch para Windows que automatiza respaldos comprimidos en 7z y los envía a un servidor.'
pubDate: 2014-08-12
tags: [windows, batch, backups, scripting]
categories: [Windows]
---

Tener un respaldo de nuestra información, ya sea personal o laboral siempre es importante, nunca sabemos a ciencia cierta cuando algo puede fallar o se puede presentar algun problema. Es por ello que un backup será nuestro mejor aliado ante las dificultades.

Pero seamos sinceros, muchos de los programas de backup o respaldo tienen demasiadas características que podrán ser ideales para entornos empresariales o corporativos bastante grandes, pero en aspectos más bien personales, de negocio o empresa pequeña no son necesarias, es por ello que escribí este sencillo script que me solucinó el problema principal al que me enfrenté en el trabajo.

Trataré de explicar brevemente qué es lo que realiza este script:

1. Crea una carpeta temporal que es donde guardaremos la información y posteriormente se comprimirá
2. Esta carpeta tendrá el nombre de usuario del equipo y la fecha en que se hace el respaldo
3. Copiará la información que deseamos respaldar a la carpeta
4. Comprime la carpeta en formato 7z
5. Elimina la carpeta en que pusimos los archivos y luego comprimimos, pues ya no hay necesidad de tenerla ocupando espacio
6. Envía el archivo comprimido al destino donde lo hemos de almacenar, en el caso del script, al servidor de la empresa.
7. Finalmente elimina el archivo 7z temporal una vez que se encuentra seguro en su destino final

Obviamente, este script no es ejecutarlo y ya, deben modificarlo a sus necesidades. Poner las carpetas que desean respaldar, programar una tarea para que se ejecute cada cierto tiempo, etc. En fin, les dejo aquí el script:

```
:: Sistema de respaldo automátizado
:: Versión 0.4
:: Fecha de Creación 11/Ago/2014
:: Script escrito por Mauricio 'Maw' Cerón

@echo off

:: Define la fecha actual
for /f "tokens=1-3 delims=/ " %%a in ("%date% /t") do set mydate=%%a%%b%%c

:: Creación de carpeta temporal
cd %TEMP%
md %username%_backup-%mydate%

:: Copia de archivos a carpeta temporal
cd %USERPROFILE%
robocopy %userprofile%\documents\ %TEMP%\%username%_backup-%mydate%\documents\ /MIR /R:0 >nul 2>nul
robocopy %userprofile%\AppData\Local\Microsoft\Outlook\ %TEMP%\%username%_backup-%mydate%\Outlook\ /MIR /R:0 >nul 2>nul

:: Compresión del respaldo
cd %TEMP%
7z a %username%_backup-%mydate%.7z "%TEMP%\%username%_backup-%mydate%" >nul 2>nul

:: Elimina la carpeta temporal
rd /S /Q %username%_backup-%mydate% >nul 2>nul

:: Enviamos al Servidor y borramos del equipo local
robocopy %TEMP% \\Srvbusiness\sistemas\docume~1\backup\ %username%_backup-%mydate%.7z >nul 2>nul
del /Q %username%_backup-%mydate%.7z >nul 2>nul

```

Solo deben copiarlo, modificarlo y guardarlo en el bloc de notas de windows con extensión **cmd** o **bat** y agregarlo al programador de tareas. Si desean comprimir en 7z recuerden que deben tener **7zip** instalado en su equipo y haberlo agregado a su **PATH** de Windows (puede sonar obvio, pero nunca está de más mencionarlo).

Por otra parte, si lo que quieren es que se ejecute en segundo plano copien lo siguiente en un bloc de notas en blanco y guardenlo con la extensión **vbs**:

```
Dim WinScriptHost
Set WinScriptHost = CreateObject("WScript.Shell")
WinScriptHost.Run Chr(34) & "%userprofile%\backup.cmd" & Chr(34), 0
Set WinScriptHost = Nothing
```

La parte entrecomillada es donde pondrán la ruta a su archivo cmd o bat, y agreguen este script al programador de tareas en lugar del anterior y se ejecutará en segundo plano si mostrar ningún tipo de ventana.

Creo que es suficiente, no quiero hacerlo parecer más complicado de lo que realmente es. Cualquier duda, pregunta o sugerencia me la hacen saber, ya saben que me gusta ayudar :D
