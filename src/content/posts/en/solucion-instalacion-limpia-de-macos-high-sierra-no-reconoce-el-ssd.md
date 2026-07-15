---
title: 'Instalación limpia de MacOS High Sierra no reconoce el SSD'
description: 'Cómo resolver el problema de que el instalador de macOS High Sierra no reconoce un SSD nuevo, usando diskutil desde la Terminal.'
pubDate: 2017-10-06
tags: [macos, ssd, troubleshooting]
categories: [macOS]
---

Hola, el día de hoy adquirí un **disco de estado sólido** (**SSD**) de la marca _Kingston_ para mi **_MacBook Pro_**, pero cuando intenté realizar la instalación de _**High Sierra**_ el instalador no me reconocía el _SSD,_ estuve a punto de entrar en pánico, pero recordé mis viejos tiempos como **linuxero** y conseguí realizar la instalación, espero que mi solución les ayude en caso de que tengan este problema.

Durante la instalación de **MacOS**, ve a la barra de menús superior y elige _**Utilidades > Terminal**_.

Cuando abra la terminal escribe:

```
diskutil list
```

Presiona _**Enter**_. Desplázate por el resultado y busca el número de disco correspondiente a tu _SSD_ (p.ej. disk0, disk1, etc). En mi caso fue **disk0**

Entonces escribe:

```
diskutil mountDISK disk0 (o el disco que corresponda a tu SSD)
```

Presiona _**Enter.**_ Debería mostrar un mensaje diciendo que el disco se montó con éxito, de ser así escribiremos:

```
diskutil eraseDISK apfs YOURDRIVENAME disk0 (o el disco que corresponda a tu SSD)
```

**Precaución – Este comando (eraseDISK) borrará toda la información contenida en el disco. Confirma que hayas seleccionado el disco correcto que deseas borrar y entonces continúa.**

Finalmente presionamos _**Enter.**_ Esto debería mostrar igual un mensaje diciendo que el disco se ha borrado con éxito. Ahora solo **cierra la terminal** y continua con la instalación normal del sistema.
