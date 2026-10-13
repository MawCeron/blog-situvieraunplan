## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Zilla

Tema del blog (derivado de Chirping Astro). Detalles que no se ven en el código:

- **Colores y tipografía:** los dos temas de daisyUI, `zilla-light` y `zilla-dark`, están en `src/styles/global.css`.
  Utilidades propias: `text-muted`, `text-warm`, `bg-surface2` y `font-display` (Bricolage Grotesque). Las clases
  propias llevan prefijo `zilla-`.
- **Idioma:** solo existe el locale `en`, que contiene los textos en español (`src/i18n/ui.ts`).
- **Verificar un cambio:** `bun run lint`, `bun run typecheck` y `bun run build`, y mirar el resultado en claro y
  oscuro, en escritorio y a 390 px.

### Trampas conocidas

- **Texto y expresiones en líneas distintas:** Astro elimina el espacio entre ellos (`2026Maw Ceron`). Escribe la
  frase en una plantilla (`{`© ${year} ${name}`}`) o usa `{' '}`.
- **Clases de daisyUI:** `.chat`, `.chat-bubble` o `.avatar` ya existen; no las reutilices con otro significado.
- **Estilo del prose:** `.prose-zilla` da margen y borde a las imágenes y márgenes a los párrafos. Anúlalos dentro de
  componentes nuevos.
- **MDX:** no admite comentarios HTML (`<!-- -->`); usa `{/* */}`. Las listas dentro de un componente necesitan
  líneas en blanco alrededor.
- **Expressive Code:** al cambiar sus opciones en `astro.config.mjs`, borra `.astro/data-store.json` (caché del HTML
  renderizado) y reinicia el servidor; si no, los posts enlazan un `ec.<hash>.css` que ya no existe y los bloques
  de código salen sin estilo.
- **Fechas:** los posts guardan solo el día; se formatean en UTC (`formatDate`) para que no se corran un día en
  zonas al oeste de Greenwich.
- **Capturas con Firefox sin interfaz:** para forzar el modo oscuro usa la preferencia `ui.systemUsesDarkTheme`.
