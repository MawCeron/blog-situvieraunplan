---
title: 'Convertir un SQL SELECT en un script INSERT'
description: 'Un script de T-SQL que convierte automáticamente los resultados de un SELECT en un script INSERT listo para usar.'
pubDate: 2023-09-12
tags: [sql, sql-server, scripting]
categories: [SQL]
---

Debido a un par de circunstancias causadas por mi distracción, me vi en la necesidad de insertar información obtenida de un SELECT, y este Script hecho por [Steve Fenton](https://www.stevefenton.co.uk/blog/2020/04/convert-a-sql-select-into-an-insert-script/) me salvó la vida, así que decidí traducir la información y compartirlo con ustedes por si acaso.

A veces quieres generar un script de INSERT a partir de datos existentes, quizás modificando uno o dos valores. Es una molestia crear manualmente el INSERT cuando puedes ver exactamente lo que quieres con una sentencia SELECT. También es un poco tedioso usar asistentes de importación/exportación de SQL u otras herramientas. A veces, simplemente quieres convertir un SQL SELECT en un script de INSERT. Aquí te explicamos cómo hacerlo.

Cambia las tres variables de usuario de arriba para indicar:

- Si el campo de clave primaria debe ser incluido o no.

- Contra qué tabla deseas operar.

- Qué filtro quieres aplicar a los datos, por ejemplo `WHERE Id = 1`

```sql
DECLARE 
     @includePK BIT = 1,
     @table VARCHAR(MAX) = 'LogEntry',
     @dataFilter VARCHAR(MAX) = 'WHERE date = ''2020-03-10'' '

DECLARE 
     @columnNames VARCHAR(MAX) = '',
     @getDataColumnScript VARCHAR(MAX),
     @queryToGenerateScript VARCHAR(MAX)

-- Obtener una lista de todas las columnas
SELECT @columnNames = STUFF
(
    (
     SELECT ',['+ NAME +']' FROM sys.all_columns 
     WHERE OBJECT_ID = OBJECT_ID(@table)
     AND (is_identity != 1 OR @includePK = 1)
     FOR XML PATH('')
    ),
     1,
     1,
     ''
)

-- Crea la parte de columna del select utilizando los nombres de las columnas
SELECT @getDataColumnScript = STUFF
(
    (
     SELECT ' ISNULL(QUOTENAME(' + NAME + ',' + QUOTENAME('''','''''') + '),' + '''NULL''' + ')+'',''' + '+' FROM sys.all_columns 
     WHERE OBJECT_ID = OBJECT_ID(@table)
     AND (is_identity != 1 OR @includePK = 1)
     FOR XML PATH('')
    ),
     1,
     1,
     ''
)

SELECT @queryToGenerateScript = 'SELECT ''' +
     'INSERT INTO ' + @table + '(' + @columnNames + ')' + 
     'VALUES(''' + '+' + SUBSTRING(@getDataColumnScript, 1, LEN(@getDataColumnScript) -5) + '+' + ''')''' + ' OutputScript ' +
     'FROM ' + @table + ' ' + @dataFilter

EXECUTE (@queryToGenerateScript)
```

Resultado (no se ve "bonito", pero lo hice legible aquí añadiendo espacios en blanco).

```sql
INSERT INTO LogEntry(
    [date],
    [time],
    [s_ip],
    [cs_method],
    [cs_uri_stem],
    [cs_uri_query],
    [s_port],
    [cs_username],
    [c_ip],
    [cs_User_Agent],
    [cs_Referer],
    [cs_host],
    [sc_status],
    [sc_substatus],
    [sc_win32_status],
    [time_taken],
    [X_Forwarded_For]
)
VALUES(
    '2020-03-10 00:00:00.0000000',
    '1900-01-01 09:40:09.0000000',
    '10.150.101.104',
    'GET',
    '/some-page-name',
    '-',
    '80',
    '-',
    '0.0.0.0',
    'Mozilla/5.0+(Windows+NT+10.0;+Win64;+x64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/80.0.3987.132+Safari/537.36',
    'https://www.example.com/',
    'www.example.com',
    '200',
    '0',
    '0',
    '0',
    '1.1.1.1'
)
```

Hay algunas limitaciones. Este script no verificará los tipos de tus columnas, así que todo será una cadena. SQL generalmente maneja bien esto, pero podrías encontrar alguna pérdida de precisión en campos de fecha y hora. Tampoco añade el código adicional para activar la inserción de identidad. Podría agregar esto más tarde.
