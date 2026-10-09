# Zilla: rediseño del blog

Rama: `rediseno`. Fecha: 2026-10-09.

## Objetivo

Llevar «Si tuviera un plan» a un diseño nuevo, tomando como referencia el mockup
<https://claude.ai/artifact/TahDZdory51QAVh8UQDKXS> (portada oscuro/claro, archivo, acerca de), y convertir
el tema base (Chirping Astro, derivado de Chirpy) en un tema propio llamado **Zilla**, sin perder las
funciones que el blog ya tiene.

Éxito: el sitio se ve como el mockup en modo claro y oscuro, a ancho de escritorio y de móvil; todas las
funciones listadas en «Se conserva» siguen funcionando; `bun run lint`, `typecheck` y `build` pasan.

## Decisiones tomadas

- Es un tema nuevo: no se busca poder traer cambios del upstream (`chirping-astro`).
- Se mantienen los dos modos, claro y oscuro, siguiendo el modo del sistema si no hay preferencia guardada.
- Se trabaja en la rama `rediseno`; `main` sigue siendo lo publicado y recibe los posts y arreglos que haya mientras tanto.
- Las fuentes se sirven en local (`@fontsource`), no desde Google Fonts.

## Se conserva

Búsqueda (Pagefind), componente `Gallery` y su visor, comentarios Giscus, tabla de contenidos, RSS,
sitemap, imágenes OG (`satori`), Umami, `showHeroInPosts`, `SmartImage`, `Callout`, Mermaid, KaTeX,
contenido y rutas actuales (`/posts/<slug>/`, categorías, etiquetas, archivo, acerca de, privacidad),
y el cambio de tema con la animación de transición.

## Se elimina

`Sidebar.astro`, `Topbar.astro` (migas de pan y menú móvil actuales), el carril de widgets
`Panel.astro` y los estilos `chirpy-*` asociados. El segundo idioma (`multilingual: false` ya está
desactivado) y su selector `LanguageSwitcher`, junto con los textos en francés de `i18n/ui.ts`.

## Diseño

### 1. Tokens

Los dos temas de daisyUI pasan a `zilla-light` y `zilla-dark`. Equivalencia con el mockup:

| Token del mockup | daisyUI / Tailwind | Oscuro    | Claro     |
| ---------------- | ------------------ | --------- | --------- |
| `bg`             | `base-200`         | `#0D1412` | `#F4F7F2` |
| `surface`        | `base-100`         | `#131D1A` | `#FFFFFF` |
| `surface2`       | `--color-surface2` | `#1B2924` | `#E6EEE8` |
| `line`           | `base-300`         | `#24332E` | `#D3DED6` |
| `text`           | `base-content`     | `#E8F0EC` | `#13201B` |
| `muted`          | `--color-muted`    | `#93A59D` | `#52665D` |
| `accent`         | `primary`          | `#4FD6B5` | `#0B7A66` |
| `ink`            | `primary-content`  | `#04201A` | `#FFFFFF` |
| `warm`           | `--color-warm`     | `#F0A35E` | `#B2530C` |

Los colores de estado (info, success, warning, error) se conservan, ajustados a la nueva base para
mantener contraste 4.5:1 en texto. Los colores del mockup se declaran en `oklch` o hexadecimal según
lo que el resto de `global.css` ya use; el valor visible no cambia.

**Fuentes:** Bricolage Grotesque (títulos, 600/700/800) y Figtree (texto, 400/500/600), añadidas a
`astro.config.mjs` con `fontProviders.local()`. JetBrains Mono se queda para código. Source Sans 3 y
Lato se retiran junto con sus dependencias si nada más las usa.

**Renombrado:** `chirpy-*` → `zilla-*` (clases y temas), `prose-chirpy` → `prose-zilla`. El nombre
del paquete pasa a `zilla`. La clave de `localStorage` para el tema se mantiene (`theme`); un valor
guardado que ya no exista se trata como «sin preferencia», lo que el script de `BaseLayout` ya hace.

### 2. Estructura general

Una **cabecera** (`Header.astro`) a todo el ancho, con contenedor de hasta 1120 px:
mascota (42 px, redonda), nombre del sitio y eslogan; menú (Inicio, Categorías, Etiquetas, Archivo,
Acerca de) con la página activa resaltada en el acento; botón de búsqueda (reutiliza `SearchButton`, atajo `/`)
y botón de tema. En ancho de móvil el menú se pliega bajo un botón con `<details>` o equivalente
accesible, sin JavaScript propio si es posible.

Un **pie** (`Footer.astro`) con tres bloques: «Últimos actualizados» (los 4 posts más recientes por
`updatedDate`/`pubDate`), «Etiquetas populares» (chips) y, abajo, copyright con enlace a privacidad,
iconos sociales (GitHub, X, correo, RSS, según `config.ts`) y la línea «Tema Zilla».

`BaseLayout` queda como: skip-link, `Header`, `<main>`, `Footer`, `BackToTop`. Anchos de contenido:
listados 920 px, lectura de posts 720–780 px, «Acerca de» 780 px.

### 3. Portada

Entrada más reciente arriba, grande (imagen 380 px de alto con borde y esquinas redondas, etiqueta «Última
entrada», fecha en color cálido, categorías, título hasta 46 px, extracto, «Leer entrada →»); si no
tiene `heroImage`, se muestra sin imagen. Debajo, «Más recientes» como filas (miniatura 184×118,
fecha · categorías, título, extracto de 2 líneas) y el enlace «Ver todo el archivo →». Paginación con
el diseño del mockup. Reutiliza `getPosts` y la lógica de `postsPerPage` actual.

### 4. Archivo

Título grande, navegación por año (chips con anclas) y bloques por año: el año en el color de acento a
la izquierda y la lista de entradas con fecha corta (`dd mmm`) y título a la derecha. Sustituye la
línea de tiempo actual de `archives.astro`.

### 5. Acerca de

Encabezado con avatar (132 px con borde de acento) y título; el texto sale de
`src/content/pages/en/about.md` renderizado con el estilo de lectura de Zilla. Los titulares de
sección usan el acento. El contenido no cambia.

### 6. Entradas, categorías, etiquetas, privacidad, 404

El mockup no las cubre; se adaptan al mismo lenguaje (tipografía, tokens, anchos, chips y filas):

- **Entrada:** cabecera con título grande, fecha, categorías, tiempo de lectura; `showHeroInPosts` se
  respeta; tabla de contenidos como columna lateral fija en ≥1280 px y como bloque plegable arriba en
  pantallas menores; navegación anterior/siguiente; Giscus.
- **Contenido (`prose-zilla`):** encabezados, enlaces, listas, citas, tablas, código, callouts, imágenes y
  galería revisados en ambos modos.
- **Categorías, etiquetas, privacidad, 404, búsqueda:** mismas filas y chips; sin diseño propio nuevo.

### 7. Accesibilidad y rendimiento

Objetivos táctiles de al menos 44 px, `:focus-visible` visible, contraste AA en ambos modos, la búsqueda
y el menú accesibles por teclado, `prefers-reduced-motion` respetado. Las fuentes con
`font-display: swap` y precarga solo de las dos que se usan arriba del pliegue. Sin dependencias nuevas
de JavaScript.

## Entrega por etapas

Cada etapa es una serie de commits en `rediseno`, con revisión visual de Mauricio antes de pasar a la
siguiente.

1. **Tokens, fuentes y renombrado** (sin cambiar aún la estructura).
2. **Cabecera y pie**, y retirada de `Sidebar`, `Topbar`, `Panel` e idioma.
3. **Portada, archivo y «Acerca de».**
4. **Entradas, categorías, etiquetas y demás páginas**, y revisión del contenido en ambos modos.
5. **Limpieza:** CSS sin usar, dependencias, `AGENTS.md`/`README.md`, `LICENSE`.

## Verificación

Por etapa: `bun run lint`, `bun run typecheck` y `bun run build` sin errores; revisión visual en
Firefox a 1280 px y a ~390 px, en claro y oscuro (portada, archivo, acerca de, una entrada con
código y galería, categorías, búsqueda). Al final, `Pagefind`, RSS, sitemap, OG y Umami siguen
presentes en `dist/`. Las pruebas del navegador que yo no pueda ejecutar las hace Mauricio.

## Licencia

El tema base es MIT. `LICENSE` conserva el aviso de copyright original de Chirping Astro, y se añade
el de Mauricio Cerón (Zilla), con una nota de que Zilla deriva de él. El pie solo dice «Tema Zilla».

## Fuera de alcance

Cambiar el contenido de los posts, el dominio, el despliegue, la analítica o los comentarios;
publicar Zilla como paquete aparte o hacer un PR al tema original.

## Riesgos y decisiones abiertas

- **Menú móvil:** se propone `<details>`; si no se ve bien en la etapa 2 se cambia a un panel con JS mínimo.
- **Tabla de contenidos:** la ubicación en pantallas anchas se confirma al ver la primera entrada ya diseñada.
- **Las 55 páginas de contenido que ya fallan `format:check`** no se reformatean en este trabajo.
- **Imágenes de portada:** el mockup usa fotos que no están en el sitio; la portada debe funcionar sin imagen.
