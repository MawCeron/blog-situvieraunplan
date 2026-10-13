# Zilla

Tema de blog para [Astro](https://astro.build) v7 con Tailwind CSS v4 y daisyUI v5. Es el código de
[Si tuviera un plan](https://situvieraunplan.org) y está derivado de
[Chirping Astro](https://github.com/kannansuresh/chirping-astro) (licencia MIT).

- Cabecera superior, portada con entrada destacada, archivo por años y página «Acerca de».
- Modo claro y oscuro (sigue al sistema), con tipografías locales: Bricolage Grotesque, Figtree y JetBrains Mono.
- Búsqueda con [Pagefind](https://pagefind.app), comentarios con [Giscus](https://giscus.app), RSS, sitemap
  e imágenes OG generadas con `satori`.
- Contenido en MDX con componentes propios: galería con visor, avisos, chat, spoilers, listas de recursos,
  video, Mermaid y KaTeX.
- Analítica opcional con [Umami](https://umami.is) (solo en producción).

## Empezar

Requiere [Bun](https://bun.sh) 1.1 o superior.

```bash
bun install
bun run dev        # http://localhost:4321
```

| Comando             | Qué hace                                                   |
| ------------------- | ---------------------------------------------------------- |
| `bun run dev`       | Servidor de desarrollo                                     |
| `bun run build`     | Compila el sitio en `dist/` y genera el índice de búsqueda |
| `bun run preview`   | Sirve `dist/`                                              |
| `bun run lint`      | ESLint sin avisos permitidos                               |
| `bun run typecheck` | `astro check`                                              |
| `bun test`          | Pruebas                                                    |

## Configuración

- `src/config.ts`: título, descripción, autor, navegación, redes, opciones del sitio (`showFeaturedImages`,
  `showHeroInPosts`…), Giscus y Umami.
- `.env` (copia `.env.example`): URL del sitio y usuarios de redes. Los valores que cambian entre
  producción y desarrollo van aquí.
- `astro.config.mjs`: fuentes locales, bloques de código (Expressive Code) y plugins de Markdown.

## Contenido

Las entradas están en `src/content/posts/en/` (`.md` o `.mdx`). Campos del encabezado:

```yaml
---
title: 'Título'
description: 'Una frase para el listado y las redes.'
pubDate: 2026-10-13
tags: [linux, cli]
categories: [Linux]
heroImage: ../../../assets/images/posts/heroes/mi-imagen.jpg
heroImageAlt: 'Texto alternativo'
draft: true # no se publica
---
```

Otros campos: `updatedDate`, `toc`, `comments`, `math`, `mermaid`, `showFeaturedImage` y `showHeroInPost`.

### Componentes para MDX

Se importan desde `src/components/`, con la ruta relativa al archivo.

| Componente             | Para qué sirve                                                           |
| ---------------------- | ------------------------------------------------------------------------ |
| `Callout`              | Avisos `info`, `success`, `warning` y `error`, con título e ícono        |
| `Gallery`              | Galería masonry con visor; `folder="…"` toma las imágenes de una carpeta |
| `Chat` y `ChatMessage` | Diálogos como conversación; `me` marca tus mensajes                      |
| `Spoiler`              | Bloque cerrado que se abre con un clic                                   |
| `ResourceList`         | Lista de enlaces (libros, descargas) como filas                          |
| `VideoEmbed`           | Video de YouTube o Vimeo adaptable                                       |

Los componentes con Markdown dentro (`ResourceList`, `Spoiler`) necesitan una línea en blanco antes y
después del contenido.

## Despliegue

El flujo `.github/workflows/deploy.yml` compila y publica en GitHub Pages con cada push a `main`.

## Licencia

MIT. Incluye el aviso de copyright original de Chirping Astro; ver [LICENSE](LICENSE).
