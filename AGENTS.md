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

## Editorial

Guía para escribir o editar contenido en este blog. El objetivo no es sonar "profesional": es sonar como Maw.

### Quién escribe y para qué

Blog personal de Mauricio "Maw" Cerón: sysadmin y desarrollador mexicano. Nació como notas técnicas para su yo del futuro y creció a cuaderno de opinión, anécdotas, anime, fotografía, deportes y todo lo que le interesa. Se escribe en español; el locale `en` es solo una convención del tema.

### La voz

- **Primera persona y conversación directa.** "Les voy a contar", "si lo piensas", "¿ya vieron?". Nunca un informe impersonal.
- **Español mexicano, sin neutralizar.** *Chamba, neta, nomás, compa, pa', desmadre, valió*. Si una palabra no la dirías en voz alta, no va.
- **Humor seco y autodespreciativo.** Maw se ríe de sí mismo antes de que lo haga el lector: "soy terco", "es muy TOC de mi parte", "no estoy tan loco".
- **Digresiones con paréntesis o rayas.** La voz al margen es parte del estilo: *—como haría una persona sensata—*, *(--el mismo error que cometió KyoAni--)*.
- **Cultura pop sin pedir permiso.** Modern Family, Sherlock, Doctor Who, K-On!, Batman, Reddit. La referencia ilustra, no presume.
- **Honestidad epistémica.** Si no sabe, lo dice: "esto es de memoria", "no encontré fuentes", "no lo sabemos". No finge certezas.
- **Opinión con nombre y apellido.** El blog no es neutral. Cuando hay postura, se defiende con argumentos y se reconocen los límites.
- **Cierre que regresa al inicio.** Una frase, una pregunta o una recomendación concreta. Nunca "en conclusión".

### Estructura según el tipo de entrada

- **Ensayo de opinión:** tesis → contexto histórico → ejemplos → objeción o límite → cierre que conecta con la apertura. Ejemplo: `git-y-el-precio-de-la-fidelidad...md`.
- **Tutorial técnico:** problema real → qué es la herramienta → cómo se usa → qué aprendiste → recomendación directa. Ejemplo: `mailpit-el-salvavidas...md`.
- **Anécdota personal:** escena cotidiana → digresión → reflexión. Ejemplo: `como-organizo-musica.mdx`.
- **Reseña:** confesión de preferencias → contexto → análisis → para quién sí y para quién no. Ejemplo: `hibike-euphonium...mdx`.
- **Divulgación:** pregunta → respuesta honesta → matices y fuentes → "esto sí se sabe / esto no". Ejemplo: `7-preguntas-que-te-haran-dudar-de-la-realidad...md`.

### Convenciones del contenido

- **Archivo:** `src/content/posts/en/<slug>.md` o `.mdx`, en kebab-case descriptivo y sin fecha. El slug es la URL.
- **Frontmatter obligatorio:** `title` (máx. 140), `description` (máx. 280, 1–2 frases), `pubDate` (`YYYY-MM-DD`).
- **Frontmatter opcional:** `updatedDate`, `tags` (minúsculas), `categories` (Capitalizadas), `heroImage`, `heroImageAlt`, `toc`, `draft`, `pinned`, `comments`, `math`, `mermaid`, `unlisted`.
- **Borradores:** `draft: true`. En producción también se ocultan las fechas futuras. No los trates como publicados.
- **Imágenes:** hero en `src/assets/images/posts/heroes/<slug>.<ext>` y cuerpo en `src/assets/images/posts/<slug>/`. Siempre con alt text. En MDX se importan; en `.md` se usa la ruta relativa.
- **MD vs. MDX:** usa `.md` salvo que necesites componentes o imports. En MDX no hay comentarios HTML: usa `{/* */}`.
- **Componentes disponibles:** `Callout`, `ResourceList`, `VideoEmbed`, `Gallery`, `Spoiler`, `Chat`, `ChatMessage`, `PodcastPlayer`. Úsalos con moderación; el texto debe sostenerse solo.
- **Código:** bloques con lenguaje declarado. Los comandos llevan el prompt solo si aporta claridad.
- **Enlaces:** enlaza fuentes reales en divulgación y tutoriales; enlaza posts anteriores cuando exista relación.
- **Títulos:** concretos, con gancho y a veces con dos puntos. Pueden ser largos; el blog no optimiza para SEO a costa del tono.

### Lo que no se hace

- No escribir en español neutro, corporativo ni "content marketing".
- No usar emojis para sustituir el tono.
- No rellenar con listas vacías ni párrafos de transición.
- No explicar lo obvio con condescendencia.
- No esconder la opinión detrás de "podría argumentarse".
- No cerrar con "en conclusión" ni con un resumen que repita todo.

### Antes de publicar

1. ¿La primera frase engancha y es concreta?
2. ¿Se siente alguien hablando, no alguien redactando?
3. ¿Hay al menos un detalle real (nombre, cifra, escena, error propio)?
4. ¿Las afirmaciones dudosas están marcadas como dudosas?
5. ¿El cierre conecta con la apertura o invita a algo?
6. ¿Pasa `bun run lint`, `bun run typecheck` y `bun run build`?

