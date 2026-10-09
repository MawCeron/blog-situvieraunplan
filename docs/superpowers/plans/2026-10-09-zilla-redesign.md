# Zilla: plan de implementación

> **Para agentes:** SUB-SKILL REQUERIDA: usa superpowers:subagent-driven-development (recomendado) o superpowers:executing-plans para ejecutar este plan tarea por tarea. Los pasos usan casillas (`- [ ]`) para el seguimiento.

**Objetivo:** convertir el tema base (Chirping Astro) en Zilla: cabecera superior, portada con entrada destacada, archivo por años, página «Acerca de» y paleta/tipografías del mockup, en modo claro y oscuro, sin perder las funciones actuales del blog.

**Arquitectura:** se transforma el tema en su lugar, en la rama `rediseno`. Primero tokens, fuentes y renombrado (sin cambiar estructura); después se reemplaza el armazón (`Sidebar`, `Topbar`, `Panel` → `Header`, `Footer`), luego las páginas de listado, y al final las entradas y la limpieza. Cada tarea deja el sitio compilando y se revisa visualmente antes de la siguiente.

**Stack:** Astro 7, Tailwind CSS v4, daisyUI v5, `@fontsource` (fuentes locales), Pagefind, Bun.

**Especificación:** `docs/superpowers/specs/2026-10-09-zilla-redesign-design.md`
**Mockup de referencia:** <https://claude.ai/artifact/TahDZdory51QAVh8UQDKXS> (artboards `Main`, `Home-claro`, `Archivo`, `Acerca`).

## Restricciones globales

- Rama de trabajo: `rediseno`. No se toca `main` ni se hace push sin que Mauricio lo pida.
- Modos claro **y** oscuro, siguiendo `prefers-color-scheme` si no hay preferencia guardada.
- Fuentes locales (`@fontsource`), sin Google Fonts: Bricolage Grotesque (títulos 600/700/800) y Figtree (texto 400/500/600); JetBrains Mono se conserva para código.
- Paleta (exacta): oscuro `bg #0D1412`, `surface #131D1A`, `surface2 #1B2924`, `line #24332E`, `text #E8F0EC`, `muted #93A59D`, `accent #96BD33`, `ink #1C2606`, `warm #F0A35E`; claro `bg #F4F7F2`, `surface #FFFFFF`, `surface2 #E6EEE8`, `line #D3DED6`, `text #13201B`, `muted #52665D`, `accent #5C7A1A`, `ink #FFFFFF`, `warm #B2530C`.
- Anchos: cabecera 1120 px, listados 920 px, «Acerca de» 780 px, lectura de posts 720–780 px.
- Objetivos táctiles ≥ 44 px, `:focus-visible` visible, contraste AA, `prefers-reduced-motion` respetado.
- Sin dependencias nuevas de JavaScript (solo las dos fuentes).
- Nombres: clases `zilla-*`, `prose-zilla`, temas daisyUI `zilla-light` / `zilla-dark`.
- Se conserva: Pagefind, `Gallery` y su visor, Giscus, TOC, RSS, sitemap, OG con `satori`, Umami, `showHeroInPosts`, `SmartImage`, `Callout`, Mermaid, KaTeX, rutas actuales.
- Idioma de la interfaz: español (la clave `en` de `i18n/ui.ts` contiene los textos en español; el identificador de locale sigue siendo `en`).
- Commits en español con prefijo (`feat:`, `fix:`, `style:`, `refactor:`, `chore:`, `docs:`); autor `Mauricio Cerón`, sin añadir líneas de coautoría.
- No se reformatean los ~55 posts que ya fallan `format:check`.

## Revisión (casos que el diseño implica y ninguna tarea probaría por sí sola)

1. **Entrada sin `heroImage` en la portada:** la destacada debe verse bien sin imagen (Tarea 3, paso 8).
2. **Página 2 en adelante del listado:** no hay destacada y la lista no puede quedar vacía ni repetir la primera entrada (Tarea 3, paso 9).
3. **Títulos o extractos muy largos y descripciones faltantes en filas:** no desbordan ni rompen la fila a 390 px (Tarea 3, paso 8).
4. **Preferencia de tema guardada del tema viejo (`chirpy-dark`/`chirpy-light`):** debe tratarse como «sin preferencia» y no dejar la página sin tema (Tarea 1, paso 8).
5. **Menú y cabecera a 390 px, y navegación por teclado:** sin scroll horizontal, `details` operable con teclado, foco visible (Tarea 2, paso 9).
6. **Año con una sola entrada en el archivo y años sin entradas:** el índice de años solo enlaza los que existen (Tarea 3, paso 12).

## Receta de verificación (se usa en cada tarea)

Define estas variables y funciones en el shell antes de empezar (están en `/tmp`/el directorio temporal de sesión, no en el repo):

```bash
cd ~/Learn/blog-situvieraunplan
S=${TMPDIR:-/tmp}/zilla-shots; mkdir -p $S/ff-light $S/ff-dark
: > $S/ff-light/user.js
echo 'user_pref("ui.systemUsesDarkTheme", 1);' > $S/ff-dark/user.js

build() { ~/.bun/bin/bun run build 2>&1 | grep -E "ERROR|rror:|build\] Complete"; }
serve() { (cd dist && python3 -m http.server 4399 >/dev/null 2>&1 &); sleep 1; }
unserve() { pkill -f "[h]ttp.server 4399" || true; }
# shot <light|dark> <ruta> <ancho> <alto> <archivo>
shot() { firefox --no-remote --profile $S/ff-$1 --headless --screenshot $S/$5 --window-size=$3,$4 "http://localhost:4399$2" >/dev/null 2>&1; }
```

Cada captura se mira con la herramienta de lectura de imágenes. `pkill -f` puede matar tu propia shell si el patrón aparece en el comando; usa exactamente `http.server 4399` como arriba.

Comprobaciones por tarea: `~/.bun/bin/bun run lint`, `~/.bun/bin/bun run typecheck`, `build` sin errores.

---

### Tarea 1: Tokens, fuentes y renombrado

**Archivos:**

- Modificar: `src/styles/global.css`, `astro.config.mjs`, `src/layouts/BaseLayout.astro`, `package.json`, `bun.lock`
- Renombrar contenido (sed): `src/layouts/{BaseLayout,PageLayout,PostLayout}.astro`, `src/components/{Sidebar,Topbar,Panel,PostCard}.astro`, `src/components/islands/{ThemeToggle,Giscus,LanguageSwitcher,Mermaid}.astro`, `src/plugins/{satteri-mermaid,satteri-alert}.ts`

**Interfaces:**

- Produce: temas daisyUI `zilla-light` / `zilla-dark`; utilidades Tailwind `text-muted`, `text-warm`, `bg-surface2`, `font-display`, `font-sans`; variable CSS `--font-figtree`, `--font-bricolage`.

- [ ] **Paso 1: Renombrar `chirpy` → `zilla`**

```bash
git checkout rediseno
grep -rln "chirpy" src astro.config.mjs package.json | grep -v "^src/content/"
```

Revisa la lista (debe coincidir con los archivos de arriba) y aplica:

```bash
grep -rl "chirpy" src astro.config.mjs package.json | grep -v "^src/content/" | xargs sed -i 's/chirpy/zilla/g'
grep -rn "chirpy" src astro.config.mjs package.json | grep -v "^src/content/"
```

La segunda orden no debe devolver nada. Las menciones de `Chirpy` con mayúscula (comentarios) se dejan por ahora.

- [ ] **Paso 2: Compilar para confirmar que el renombrado no rompe nada**

Run: `build`
Expected: `Complete!` sin errores. El aspecto sigue siendo el viejo.

- [ ] **Paso 3: Commit**

```bash
git add -A && git commit -q -m "refactor: renombra chirpy a zilla (clases, temas y claves)"
```

- [ ] **Paso 4: Reemplazar los dos temas de daisyUI**

En `src/styles/global.css`, sustituye por completo los bloques `@plugin 'daisyui/theme' { name: 'zilla-light'; … }` y `@plugin 'daisyui/theme' { name: 'zilla-dark'; … }` por:

```css
/* ---------- Zilla LIGHT ---------- */
@plugin 'daisyui/theme' {
  name: 'zilla-light';
  default: true;
  prefersdark: false;
  color-scheme: light;

  --color-base-100: #ffffff; /* surface */
  --color-base-200: #f4f7f2; /* bg */
  --color-base-300: #d3ded6; /* line */
  --color-base-content: #13201b; /* text */

  --color-primary: #5c7a1a; /* accent */
  --color-primary-content: #ffffff; /* ink */
  --color-secondary: #5c7a1a;
  --color-secondary-content: #ffffff;
  --color-accent: #b2530c; /* warm */
  --color-accent-content: #ffffff;
  --color-neutral: #13201b;
  --color-neutral-content: #f4f7f2;

  --color-info: #0b6fa8;
  --color-info-content: #ffffff;
  --color-success: #16794a;
  --color-success-content: #ffffff;
  --color-warning: #9a6a00;
  --color-warning-content: #ffffff;
  --color-error: #b8322a;
  --color-error-content: #ffffff;

  --radius-selector: 0.5rem;
  --radius-field: 0.5rem;
  --radius-box: 0.75rem;
  --size-selector: 0.25rem;
  --size-field: 0.25rem;
  --border: 1px;
  --depth: 0;
  --noise: 0;
}

/* ---------- Zilla DARK ---------- */
@plugin 'daisyui/theme' {
  name: 'zilla-dark';
  default: false;
  prefersdark: true;
  color-scheme: dark;

  --color-base-100: #131d1a; /* surface */
  --color-base-200: #0d1412; /* bg */
  --color-base-300: #24332e; /* line */
  --color-base-content: #e8f0ec; /* text */

  --color-primary: #96bd33; /* accent */
  --color-primary-content: #1c2606; /* ink */
  --color-secondary: #96bd33;
  --color-secondary-content: #1c2606;
  --color-accent: #f0a35e; /* warm */
  --color-accent-content: #2a1500;
  --color-neutral: #1b2924;
  --color-neutral-content: #e8f0ec;

  --color-info: #5ab4e8;
  --color-info-content: #03202f;
  --color-success: #4fd68a;
  --color-success-content: #03230f;
  --color-warning: #f0c35e;
  --color-warning-content: #2a2000;
  --color-error: #f27b6b;
  --color-error-content: #2d0a05;

  --radius-selector: 0.5rem;
  --radius-field: 0.5rem;
  --radius-box: 0.75rem;
  --size-selector: 0.25rem;
  --size-field: 0.25rem;
  --border: 1px;
  --depth: 0;
  --noise: 0;
}

/* Tokens extra del mockup, por tema. El oscuro va después para ganar en caso de empate. */
:root,
[data-theme='zilla-light'] {
  --zilla-surface2: #e6eee8;
  --zilla-muted: #52665d;
  --zilla-warm: #b2530c;
}
[data-theme='zilla-dark'] {
  --zilla-surface2: #1b2924;
  --zilla-muted: #93a59d;
  --zilla-warm: #f0a35e;
}
@theme inline {
  --color-surface2: var(--zilla-surface2);
  --color-muted: var(--zilla-muted);
  --color-warm: var(--zilla-warm);
}
```

- [ ] **Paso 5: Declarar las fuentes en `@theme`**

En el bloque `@theme { … }` existente de `global.css`, sustituye las líneas de fuentes por:

```css
/* Fuentes — configuradas con la Fonts API de Astro (astro.config.mjs) */
--font-sans: var(--font-figtree, system-ui, sans-serif);
--font-display: var(--font-bricolage, system-ui, sans-serif);
--font-mono: var(--font-jetbrains-mono, ui-monospace, monospace);
```

- [ ] **Paso 6: Instalar las fuentes y retirar las antiguas**

```bash
~/.bun/bin/bun add @fontsource/bricolage-grotesque @fontsource/figtree
ls node_modules/@fontsource/figtree/files | grep -E "latin-(400|500|600)-normal.woff2$"
ls node_modules/@fontsource/bricolage-grotesque/files | grep -E "latin-(600|700|800)-normal.woff2$"
grep -rn "source-sans\|--font-lato\|lato" src astro.config.mjs --include=*.astro --include=*.css --include=*.mjs --include=*.ts | grep -v "src/content/"
```

Expected: seis archivos `.woff2` listados (si algún peso no existe, usa el más cercano y ajusta el paso siguiente). El último comando solo debe mostrar `astro.config.mjs` y `BaseLayout.astro`.

En `astro.config.mjs`, dentro del arreglo `fonts: [...]`, **sustituye** las entradas de «Source Sans 3» y «Lato» por estas dos (deja intacta la de JetBrains Mono):

```js
    {
      name: 'Figtree',
      cssVariable: '--font-figtree',
      provider: fontProviders.local(),
      options: {
        variants: [400, 500, 600].map((weight) => ({
          weight: String(weight),
          style: 'normal',
          src: [`./node_modules/@fontsource/figtree/files/figtree-latin-${weight}-normal.woff2`],
        })),
      },
    },
    {
      name: 'Bricolage Grotesque',
      cssVariable: '--font-bricolage',
      provider: fontProviders.local(),
      options: {
        variants: [600, 700, 800].map((weight) => ({
          weight: String(weight),
          style: 'normal',
          src: [
            `./node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-${weight}-normal.woff2`,
          ],
        })),
      },
    },
```

En `src/layouts/BaseLayout.astro`, cambia las tres líneas `<Font …>` por:

```astro
<Font cssVariable="--font-figtree" preload />
<Font cssVariable="--font-bricolage" preload />
<Font cssVariable="--font-jetbrains-mono" />
```

Retira las fuentes que ya nadie usa:

```bash
~/.bun/bin/bun remove @fontsource/source-sans-3 @fontsource/lato
```

- [ ] **Paso 7: Compilar y revisar**

Run: `build`, luego `serve` y `shot light / 1280 1400 t1-light.png` y `shot dark / 1280 1400 t1-dark.png`.
Expected: sin errores; la portada conserva la barra lateral vieja pero con la paleta verde azulada y la tipografía Figtree. Comprobación automática:

```bash
grep -c "zilla-dark" dist/index.html
grep -o "font-family:[^;]*Bricolage[^;]*" -r dist/_astro/*.css | head -1
```

Expected: el primero ≥ 1; el segundo imprime una línea (si no, la fuente no se declaró).

- [ ] **Paso 8: Preferencia de tema del tema viejo**

El script de `BaseLayout` ya valida el valor guardado. Compruébalo:

```bash
grep -n "valid = stored" src/layouts/BaseLayout.astro
```

Expected: `var valid = stored === 'zilla-dark' || stored === 'zilla-light';`. Un valor viejo (`chirpy-dark`) no es válido, así que se usa el modo del sistema y se reescribe en `localStorage`.

- [ ] **Paso 9: Lint, typecheck y commit**

Run: `~/.bun/bin/bun run lint && ~/.bun/bin/bun run typecheck`
Expected: sin errores ni avisos.

```bash
git add -A && git commit -q -m "feat: paleta, temas zilla-light/dark y fuentes Figtree y Bricolage Grotesque"
```

**Revisión visual de Mauricio:** colores y tipografía de la portada en claro y oscuro.

---

### Tarea 2: Cabecera, pie y retirada de barra lateral, widgets e idioma

**Archivos:**

- Crear: `src/components/Header.astro`
- Reemplazar: `src/components/Footer.astro`
- Modificar: `src/layouts/BaseLayout.astro`, `src/layouts/PostLayout.astro`, `src/i18n/ui.ts`, `src/i18n/utils.ts`, `src/utils/posts.ts`, `src/components/SEO.astro`, `src/components/islands/Giscus.astro`, `src/config.ts`, `src/styles/global.css`
- Eliminar: `src/components/{Sidebar,Topbar,Panel}.astro`, `src/components/islands/LanguageSwitcher.astro`

**Interfaces:**

- Consume: `NAV`, `SOCIALS`, `SITE` (`src/config.ts`); `getPosts`, `getTagsWithCount`, `postPath`, `tagPath` (`src/utils/posts.ts`); `localizedPath`, `useTranslations`, `withBase` (`src/i18n/utils.ts`); islands `SearchButton`, `ThemeToggle`.
- Produce: `<Header locale />`, `<Footer locale />`; claves i18n `footer.latest`, `footer.popularTags`; `Locale` = `'en'` únicamente.

- [ ] **Paso 1: Quitar el segundo idioma**

```
src/config.ts:      export const locales = ['en'] as const;
src/i18n/ui.ts:     borrar el bloque `fr: { … },` completo (líneas 10 a 107)
src/i18n/utils.ts:  formatDate: const lang = 'es-MX';
                    htmlLang(): devolver 'es-MX' siempre
                    localeLabel(): devolver 'Español' siempre
src/utils/posts.ts: groupByYearMonth: const lang = 'es-MX';
src/components/SEO.astro: título del feed = `${SITE.title} — RSS`; og:locale = 'es_MX'
src/components/islands/Giscus.astro: data-locale="es"
src/layouts/BaseLayout.astro: borrar el <link rel="alternate" … '/fr/rss.xml'>
```

Aplica cada edición abriendo el archivo; los números de línea son los de hoy. Después:

Run: `~/.bun/bin/bun run typecheck`
Expected: errores solo en archivos que se tocan más abajo (`Panel.astro`, `LanguageSwitcher.astro`, `Topbar.astro`, `PostLayout.astro` por `translationLinks`). Cualquier otro error: corrígelo quitando la rama `'fr'` correspondiente.

- [ ] **Paso 2: Añadir las claves de textos nuevas**

En `src/i18n/ui.ts`, dentro del único bloque que queda (`en`), añade junto a las claves `footer.*`:

```ts
    'footer.latest': 'Últimos actualizados',
    'footer.popularTags': 'Etiquetas populares',
```

- [ ] **Paso 3: Crear `Header.astro`**

```astro
---
import { Image } from 'astro:assets';
import { NAV, SITE, type Locale } from '../config';
import { localizedPath, useTranslations, withBase } from '../i18n/utils';
import type { UIKey } from '../i18n/ui';
import SearchButton from './islands/SearchButton.astro';
import ThemeToggle from './islands/ThemeToggle.astro';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
const t = useTranslations(locale);
const home = localizedPath('/', locale);
const root = home.replace(/\/+$/, '') || '/';
const current = Astro.url.pathname.replace(/\/+$/, '') || '/';

const items = NAV.map((item) => {
  const href = localizedPath(item.href, locale);
  const path = href.replace(/\/+$/, '') || '/';
  const active = path === current || (path !== root && current.startsWith(path + '/'));
  return { href, active, label: t(`nav.${item.key}` as UIKey) };
});

const avatar = SITE.author.avatar;
const isStringAvatar = typeof avatar === 'string';
---

<header class="border-base-300 w-full border-b">
  <div class="mx-auto flex max-w-[1120px] flex-wrap items-center gap-x-5 gap-y-3 px-6 py-3.5">
    <a href={home} class="flex items-center gap-3" aria-label={SITE.title}>
      {
        avatar &&
          (isStringAvatar ? (
            <img
              src={avatar.startsWith('/') ? withBase(avatar) : avatar}
              alt=""
              width="42"
              height="42"
              class="size-[42px] rounded-full object-cover"
              loading="eager"
            />
          ) : (
            <Image
              src={avatar}
              alt=""
              width={84}
              height={84}
              class="size-[42px] rounded-full object-cover"
              loading="eager"
            />
          ))
      }
      <span class="flex flex-col leading-tight">
        <span class="font-display text-xl font-extrabold tracking-tight">{SITE.title}</span>
        {SITE.description && <span class="text-muted text-xs">{SITE.description}</span>}
      </span>
    </a>

    <nav aria-label="Principal" class="ml-auto hidden flex-wrap justify-end gap-0.5 md:flex">
      {
        items.map((item) => (
          <a
            href={item.href}
            aria-current={item.active ? 'page' : undefined}
            class="zilla-nav-link"
          >
            {item.label}
          </a>
        ))
      }
    </nav>

    <div class="ml-auto flex items-center gap-2.5 md:ml-0">
      <SearchButton locale={locale} />
      <ThemeToggle locale={locale} />
    </div>

    <details class="zilla-menu w-full md:hidden">
      <summary class="zilla-menu__summary">{t('nav.toggleMenu')}</summary>
      <nav aria-label="Principal (móvil)" class="mt-2 flex flex-col gap-0.5">
        {
          items.map((item) => (
            <a
              href={item.href}
              aria-current={item.active ? 'page' : undefined}
              class="zilla-nav-link"
            >
              {item.label}
            </a>
          ))
        }
      </nav>
    </details>
  </div>
</header>
```

- [ ] **Paso 4: Reemplazar `Footer.astro`**

```astro
---
import { Icon } from 'astro-icon/components';
import { SITE, SOCIALS, type Locale } from '../config';
import { localizedPath, useTranslations, withBase } from '../i18n/utils';
import { getPosts, getTagsWithCount, postPath, tagPath } from '../utils/posts';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
const t = useTranslations(locale);
const year = new Date().getFullYear();

const [posts, tags] = await Promise.all([getPosts(locale), getTagsWithCount(locale)]);
const time = (p: (typeof posts)[number]) => (p.data.updatedDate ?? p.data.pubDate).valueOf();
const recent = posts
  .slice()
  .sort((a, b) => time(b) - time(a))
  .slice(0, 4);
const popular = tags.slice(0, 8);
const showPrivacy = SITE.footer.showPrivacyPolicy ?? SITE.showPrivacyPolicy;

const headingClass =
  'font-display text-muted mb-3.5 text-[13px] font-bold tracking-[0.16em] uppercase';
---

<footer aria-label="Site Info" class="border-base-300 bg-base-100 mt-auto w-full border-t">
  <div class="mx-auto max-w-[1120px] px-6 pt-12 pb-7">
    <div class="flex flex-wrap gap-x-16 gap-y-10">
      {
        recent.length > 0 && (
          <section class="min-w-0 flex-[1_1_360px]">
            <h2 class={headingClass}>{t('footer.latest')}</h2>
            <ul class="flex flex-col gap-2.5">
              {recent.map((post) => (
                <li>
                  <a href={postPath(post)} class="hover:text-primary leading-snug">
                    {post.data.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )
      }
      {
        popular.length > 0 && (
          <section class="min-w-0 flex-[1_1_300px]">
            <h2 class={headingClass}>{t('footer.popularTags')}</h2>
            <div class="flex flex-wrap gap-2">
              {popular.map((tag) => (
                <a href={tagPath(locale, tag.name)} class="zilla-chip">
                  {tag.name}
                </a>
              ))}
            </div>
          </section>
        )
      }
    </div>

    <div
      class="border-base-300 text-muted mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t pt-5 text-[13px]"
    >
      <p>
        © {year}
        {SITE.author.name}. {t('footer.copyright')}
        {
          showPrivacy && (
            <>
              {' '}
              ·{' '}
              <a href={localizedPath('/privacy', locale)} class="hover:text-primary underline">
                {t('footer.privacy')}
              </a>
            </>
          )
        }
      </p>
      <div class="flex gap-1.5">
        {
          SOCIALS.map((s) => (
            <a
              href={s.href.startsWith('/') ? withBase(s.href) : s.href}
              rel="noopener"
              class="zilla-icon-link"
              aria-label={s.label}
              target={s.href.startsWith('http') ? '_blank' : undefined}
            >
              <Icon name={s.icon} width={18} height={18} />
            </a>
          ))
        }
      </div>
      <p>
        {t('footer.poweredBy')}
        <a href="https://astro.build" rel="noopener" class="hover:text-primary">Astro</a>
        · {t('footer.theme')} Zilla
      </p>
    </div>
  </div>
</footer>
```

- [ ] **Paso 5: Simplificar `BaseLayout.astro`**

En el frontmatter, quita los imports de `Sidebar`, `Topbar`, `Panel` y añade `import Header from '../components/Header.astro';`. Quita `hidePanel` de `Props` y de la desestructuración (nadie lo pasa). Conserva `crumbs` y `availableLocales` en `Props` con el comentario `/** Sin efecto en Zilla; se conserva para no tocar cada página. */` y **no** los desestructures. Sustituye todo lo que va desde `<Sidebar … />` hasta el `</div>` que cierra `chirpy-main-wrapper` (ahora `zilla-main-wrapper`) por:

```astro
<div class="flex min-h-screen flex-col items-center">
  <Header locale={locale} />
  <main
    id="main"
    aria-label="Main Content"
    class:list={['w-full flex-1 px-6 py-12', narrow ? 'max-w-[780px]' : 'max-w-[920px]']}
  >
    <slot />
  </main>
  <Footer locale={locale} />
</div>
```

En `PostLayout.astro` borra el bloque final `<script is:inline define:vars={{ links: translationLinks }}> … </script>`, la constante `translationLinks` y su cálculo, y por ahora **quita** la línea `<TableOfContents slot="aside-bottom" … />` (la Tarea 4 devuelve la tabla de contenidos en su sitio).

- [ ] **Paso 6: Estilos de cabecera y pie en `global.css`**

Dentro de un bloque `@layer components { … }` nuevo, añade (y borra las reglas `.zilla-social` viejas del bloque «Layout chrome»):

```css
@layer components {
  .zilla-nav-link {
    @apply text-muted hover:bg-surface2 rounded-[10px] px-3.5 py-2.5 text-sm font-semibold transition-colors;
  }
  .zilla-nav-link[aria-current='page'] {
    @apply text-primary;
  }
  .zilla-menu__summary {
    @apply border-base-300 bg-base-100 flex h-11 cursor-pointer list-none items-center rounded-xl border px-4 text-sm font-semibold;
  }
  .zilla-menu__summary::-webkit-details-marker {
    display: none;
  }
  .zilla-social {
    @apply border-base-300 bg-base-100 text-base-content hover:bg-surface2 flex size-11 items-center justify-center rounded-full border transition-colors;
  }
  .zilla-icon-link {
    @apply text-base-content hover:bg-surface2 flex size-11 items-center justify-center rounded-full transition-colors;
  }
  .zilla-chip {
    @apply border-base-300 bg-base-200 text-muted hover:border-primary hover:text-primary rounded-full border px-3.5 py-1 text-sm transition-colors;
  }
  :focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 3px;
    border-radius: 8px;
  }
}
```

Cambia también `.search-pill` a `h-11` (objetivo táctil de 44 px) en su regla existente.

- [ ] **Paso 7: Eliminar lo que ya no se usa**

```bash
git rm src/components/Sidebar.astro src/components/Topbar.astro src/components/Panel.astro src/components/islands/LanguageSwitcher.astro
~/.bun/bin/bun run typecheck && ~/.bun/bin/bun run lint
```

Expected: sin errores. Si el typecheck señala `slot="aside-bottom"` u otros restos, elimínalos.

- [ ] **Paso 8: Compilar y revisar visualmente**

Run: `build`, `serve`, y capturas de `/` en claro y oscuro a 1280×1200 y a 390×1200 (`t2-*.png`).
Expected: cabecera con mascota, nombre, eslogan, menú, búsqueda y botón de tema; pie con las tres franjas; sin barra lateral. Las fechas ahora salen en español.

- [ ] **Paso 9: Menú móvil y teclado**

Con la captura de 390 px: no hay scroll horizontal (`shot` a 390 de ancho no debe mostrar contenido cortado), y el `<details>` se abre con Enter/Espacio al enfocar el resumen (Tab). Comprueba en el HTML:

```bash
grep -c '<details class="zilla-menu' dist/index.html
```

Expected: 1.

- [ ] **Paso 10: Commits**

```bash
git add -A && git commit -q -m "feat: cabecera y pie de Zilla; retira barra lateral, widgets e idioma secundario"
```

**Revisión visual de Mauricio:** cabecera y pie, en claro y oscuro, escritorio y móvil.

---

### Tarea 3: Portada, listados, archivo y «Acerca de»

**Archivos:**

- Crear: `src/components/FeaturedPost.astro`, `src/components/PostRow.astro`
- Reemplazar: `src/components/PostList.astro`, `src/components/Pagination.astro` (plantilla), `src/pages/[...locale]/archives.astro`, `src/pages/[...locale]/about.astro`
- Modificar: `src/pages/[...locale]/index.astro`, `src/pages/[...locale]/page/[page].astro`, `src/i18n/ui.ts`
- Eliminar: `src/components/PostCard.astro`

**Interfaces:**

- Consume: `getPosts`, `postPath`, `heroImage`, `shouldShowHero`, `groupByYearMonth` (`src/utils/posts.ts`); `formatDate`, `isoDate`, `useTranslations`, `localizedPath`.
- Produce: `<FeaturedPost post locale />`, `<PostRow post locale />`, `<PostList posts locale />` (filas), claves `home.latestEntry`, `home.readMore`, `home.recent`, `home.viewArchive`, `archives.subtitle`, `archives.jump`.

- [ ] **Paso 1: Claves de texto**

En `src/i18n/ui.ts`, bloque `en`:

```ts
    'home.latestEntry': 'Última entrada',
    'home.readMore': 'Leer entrada',
    'home.recent': 'Más recientes',
    'home.viewArchive': 'Ver todo el archivo',
    'archives.subtitle': 'Todas las entradas, de la más reciente a la más antigua.',
    'archives.jump': 'Ir a un año',
```

- [ ] **Paso 2: Crear `PostRow.astro`**

```astro
---
import type { Locale } from '../config';
import { formatDate, isoDate } from '../i18n/utils';
import { type Post, postPath, heroImage, shouldShowHero } from '../utils/posts';
import SmartImage from './SmartImage.astro';

interface Props {
  post: Post;
  locale: Locale;
}

const { post, locale } = Astro.props;
const img = shouldShowHero(post) ? heroImage(post) : undefined;
const date = formatDate(post.data.pubDate, locale, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});
---

<a
  href={postPath(post)}
  class="group border-base-300 flex flex-wrap items-center gap-x-6 gap-y-4 border-b py-6"
>
  {
    img && (
      <div class="border-base-300 h-[118px] w-[184px] shrink-0 overflow-hidden rounded-xl border max-sm:h-[160px] max-sm:w-full">
        <SmartImage
          src={img}
          alt=""
          class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          widths={[184, 368, 552]}
          sizes="(max-width: 640px) 100vw, 184px"
          quality={75}
        />
      </div>
    )
  }
  <div class="min-w-0 flex-[1_1_300px]">
    <div class="text-muted text-[13px]">
      <time class="text-warm font-semibold" datetime={isoDate(post.data.pubDate)}>{date}</time>
      {post.data.categories.length > 0 && <> · {post.data.categories.join(', ')}</>}
    </div>
    <h3
      class="font-display group-hover:text-primary my-1.5 text-[22px] leading-[1.18] font-bold tracking-[-0.012em] transition-colors"
    >
      {post.data.title}
    </h3>
    {
      post.data.description && (
        <p class="text-muted line-clamp-2 text-[15px]">{post.data.description}</p>
      )
    }
  </div>
</a>
```

- [ ] **Paso 3: Reemplazar `PostList.astro`**

```astro
---
import type { Locale } from '../config';
import { useTranslations } from '../i18n/utils';
import type { Post } from '../utils/posts';
import PostRow from './PostRow.astro';

interface Props {
  posts: Post[];
  locale: Locale;
}

const { posts, locale } = Astro.props;
const t = useTranslations(locale);
---

{
  posts.length === 0 ? (
    <p class="border-base-300 text-muted rounded-xl border border-dashed px-6 py-10 text-center">
      {t('list.empty')}
    </p>
  ) : (
    <div id="post-list">
      {posts.map((post) => (
        <PostRow post={post} locale={locale} />
      ))}
    </div>
  )
}
```

- [ ] **Paso 4: Crear `FeaturedPost.astro`**

```astro
---
import type { Locale } from '../config';
import { formatDate, isoDate, useTranslations } from '../i18n/utils';
import { type Post, postPath, heroImage, shouldShowHero } from '../utils/posts';
import SmartImage from './SmartImage.astro';

interface Props {
  post: Post;
  locale: Locale;
}

const { post, locale } = Astro.props;
const t = useTranslations(locale);
const img = shouldShowHero(post) ? heroImage(post) : undefined;
const date = formatDate(post.data.pubDate, locale, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});
---

<article>
  <a href={postPath(post)} class="group block">
    {
      img && (
        <div class="border-base-300 h-[380px] overflow-hidden rounded-[18px] border max-sm:h-[220px]">
          <SmartImage
            src={img}
            alt={post.data.heroImageAlt ?? ''}
            class="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            loading="eager"
            fetchpriority="high"
            widths={[480, 768, 1024, 1280]}
            sizes="(max-width: 960px) 100vw, 920px"
            quality={80}
          />
        </div>
      )
    }
    <div class="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2.5 text-sm">
      <span
        class="bg-primary text-primary-content rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wider uppercase"
      >
        {t('home.latestEntry')}
      </span>
      <time class="text-warm font-semibold" datetime={isoDate(post.data.pubDate)}>{date}</time>
      {
        post.data.categories.map((c) => (
          <span class="border-base-300 text-muted rounded-full border px-3 py-0.5">{c}</span>
        ))
      }
    </div>
    <h1
      class="font-display group-hover:text-primary mt-3.5 mb-3 text-[2.875rem] leading-[1.04] font-extrabold tracking-[-0.025em] transition-colors max-sm:text-[2rem]"
    >
      {post.data.title}
    </h1>
    {
      post.data.description && (
        <p class="text-muted max-w-[64ch] text-lg">{post.data.description}</p>
      )
    }
    <span class="text-primary mt-4 inline-flex items-center gap-2 font-semibold">
      {t('home.readMore')}
      <span aria-hidden="true">→</span>
    </span>
  </a>
</article>
```

- [ ] **Paso 5: Portada (`index.astro`)**

Sustituye el import de `PostList` por añadir `import FeaturedPost from '~/components/FeaturedPost.astro';` junto a él y, en la plantilla:

```astro
<BaseLayout title={SITE.title} description={SITE.description} pathWithoutLocale="/">
  {pagePosts[0] && <FeaturedPost post={pagePosts[0]} locale={locale} />}

  <div class="mt-16 mb-1 flex items-center gap-4">
    <h2 class="font-display text-muted text-[13px] font-bold tracking-[0.16em] uppercase">
      {t('home.recent')}
    </h2>
    <div class="bg-base-300 h-px flex-1"></div>
    <a href={localizedPath('/archives', locale)} class="hover:text-primary text-sm font-semibold">
      {t('home.viewArchive')} →
    </a>
  </div>
  <PostList posts={pagePosts.slice(1)} locale={locale} />
  <Pagination
    currentPage={currentPage}
    lastPage={lastPage}
    hrefForPage={hrefForPage}
    locale={locale}
  />
</BaseLayout>
```

Añade en el frontmatter `import { useTranslations } from '~/i18n/utils';` (junto a `localizedPath`) y `const t = useTranslations(locale);`.

- [ ] **Paso 6: Páginas 2 en adelante (`page/[page].astro`)**

No lleva destacada. Deja `<PostList posts={pagePosts} locale={locale} />` como está (ahora renderiza filas). Si la plantilla tenía un encabezado propio, quítalo.

- [ ] **Paso 7: Paginación**

En `src/components/Pagination.astro` conserva el frontmatter (la lógica `numbers`, `prev`, `next`) y reemplaza solo la plantilla `<nav>…</nav>` por:

```astro
<nav
  aria-label={`${t('pagination.page')} ${currentPage} ${t('pagination.of')} ${lastPage}`}
  class="mt-10 flex flex-wrap items-center justify-center gap-2"
>
  {
    prev ? (
      <a rel="prev" href={prev} class="zilla-page">
        ← {t('pagination.previous')}
      </a>
    ) : (
      <span class="zilla-page pointer-events-none opacity-60">← {t('pagination.previous')}</span>
    )
  }
  {
    numbers.map((n) =>
      n === '…' ? (
        <span class="text-muted flex h-11 min-w-11 items-center justify-center">…</span>
      ) : (
        <a
          href={hrefForPage(n)}
          aria-current={n === currentPage ? 'page' : undefined}
          class="zilla-page min-w-11 justify-center"
        >
          {n}
        </a>
      ),
    )
  }
  {
    next ? (
      <a rel="next" href={next} class="zilla-page">
        {t('pagination.next')} →
      </a>
    ) : (
      <span class="zilla-page pointer-events-none opacity-60">{t('pagination.next')} →</span>
    )
  }
</nav>
```

Y en `global.css`, dentro del bloque `@layer components` de la Tarea 2:

```css
.zilla-page {
  @apply hover:bg-surface2 flex h-11 items-center rounded-xl px-3.5 text-[15px] font-semibold transition-colors;
}
.zilla-page[aria-current='page'] {
  @apply bg-primary text-primary-content;
}
```

- [ ] **Paso 8: Compilar y revisar portada**

Run: `build`, `serve`, capturas de `/` en claro/oscuro a 1280 y 390 (`t3-home-*.png`). Revisa los casos de la lista de Revisión:

- Destacada **con** imagen y **sin** ella (para probar sin imagen, mira la portada de un post sin `heroImage`: cualquier página de etiqueta o `/page/2/` no tiene destacada; para la destacada sin imagen añade temporalmente `showFeaturedImage: false` al post más reciente y reconstruye, luego revierte).
- Títulos largos y extractos largos en filas a 390 px: sin desbordes ni scroll horizontal.
- Una entrada sin `description`: la fila no deja un hueco raro.

- [ ] **Paso 9: Página 2**

```bash
ls dist/page/2/index.html
grep -c "zilla-featured\|Última entrada" dist/page/2/index.html
grep -c "Última entrada" dist/index.html
```

Expected: el archivo existe; el segundo da `0`; el tercero da `1`. Además la primera entrada de `/page/2/` no debe ser la misma que la destacada de `/`.

- [ ] **Paso 10: Eliminar `PostCard.astro`**

```bash
git rm src/components/PostCard.astro
grep -rn "PostCard" src | grep -v "^src/content/"
```

Expected: el `grep` no devuelve nada. Elimina también las reglas `.zilla-card*` de `global.css` (se confirma en la Tarea 5).

- [ ] **Paso 11: Archivo (`archives.astro`)**

Mantén el frontmatter actual (imports, `getStaticPaths`, `posts`, `groups`) y sustituye la plantilla y el bloque `<style>` por:

```astro
<BaseLayout
  title={t('archives.title')}
  pathWithoutLocale="/archives/"
  crumbs={[{ label: t('archives.title') }]}
>
  <h1
    class="font-display mb-2.5 text-[3.75rem] leading-none font-extrabold tracking-[-0.03em] max-sm:text-5xl"
  >
    {t('archives.title')}
  </h1>
  <p class="text-muted mb-7 max-w-[56ch] text-lg">{t('archives.subtitle')}</p>

  {
    groups.length === 0 ? (
      <p class="text-muted">{t('archives.empty')}</p>
    ) : (
      <>
        <nav aria-label={t('archives.jump')} class="mb-10 flex flex-wrap gap-2">
          {groups.map((g) => (
            <a href={`#y-${g.year}`} class="zilla-year-chip">
              {g.year}
            </a>
          ))}
        </nav>
        {groups.map((g) => {
          const yearPosts = g.months.flatMap((m) => m.posts);
          return (
            <section
              id={`y-${g.year}`}
              class="border-base-300 flex flex-wrap gap-x-8 gap-y-3 border-t py-9"
            >
              <h2 class="font-display text-primary w-[150px] shrink-0 text-[3.5rem] leading-none font-extrabold tracking-[-0.03em] max-sm:text-5xl">
                {g.year}
              </h2>
              <ul class="min-w-0 flex-[1_1_400px]">
                {yearPosts.map((p) => (
                  <li>
                    <a
                      href={postPath(p)}
                      class="group hover:bg-surface2 flex min-h-11 items-baseline gap-5 rounded-[10px] px-2.5 py-2.5"
                    >
                      <span class="text-warm w-14 shrink-0 text-sm font-semibold">
                        {formatDate(p.data.pubDate, locale, { day: '2-digit', month: 'short' })}
                      </span>
                      <span class="group-hover:text-primary min-w-0 flex-1 text-[17px] leading-snug">
                        {p.data.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </>
    )
  }
</BaseLayout>
```

Y en `global.css`: `.zilla-year-chip { @apply border-base-300 bg-base-100 hover:border-primary hover:text-primary flex h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors; }` dentro del bloque `@layer components`.

- [ ] **Paso 12: Años del archivo**

```bash
grep -o 'id="y-[0-9]*"' dist/archives/index.html | sort | uniq -c | sort -rn | head -3
grep -o 'href="#y-[0-9]*"' dist/archives/index.html | wc -l
grep -o 'id="y-[0-9]*"' dist/archives/index.html | wc -l
```

Expected: los dos conteos coinciden (cada chip apunta a una sección que existe); ningún `id` se repite.

- [ ] **Paso 13: «Acerca de» (`about.astro`)**

Sustituye el archivo por:

```astro
---
import { getEntry, render } from 'astro:content';
import { Image } from 'astro:assets';
import BaseLayout from '~/layouts/BaseLayout.astro';
import { SITE } from '~/config';

export function getStaticPaths() {
  return SITE.locales.map((l) => ({
    params: { locale: l === SITE.defaultLocale ? undefined : l },
    props: { locale: l },
  }));
}
const { locale } = Astro.props;
const entry = await getEntry('pages', `${locale}/about`);
if (!entry) return Astro.rewrite('/404');
const { Content } = await render(entry);
const avatar = SITE.author.avatar;
---

<BaseLayout
  title={entry.data.title}
  description={entry.data.description ?? SITE.description}
  pathWithoutLocale="/about/"
  narrow
>
  <div class="mb-12 flex flex-wrap items-center gap-x-8 gap-y-6">
    {
      avatar && typeof avatar !== 'string' && (
        <Image
          src={avatar}
          alt={SITE.author.name}
          width={264}
          height={264}
          class="border-primary size-[132px] rounded-full border-[3px] object-cover"
          loading="eager"
        />
      )
    }
    <div>
      <h1
        class="font-display mb-1.5 text-[3.75rem] leading-none font-extrabold tracking-[-0.03em] max-sm:text-5xl"
      >
        {entry.data.title}
      </h1>
      {entry.data.description && <p class="text-muted text-lg">{entry.data.description}</p>}
    </div>
  </div>
  <div class="prose-zilla zilla-about max-w-none">
    <Content />
  </div>
</BaseLayout>
```

En `global.css`: `.zilla-about > p:first-child { @apply font-display text-2xl leading-snug; max-width: 34ch; }` y `.zilla-about h2 { @apply font-display text-primary border-0 text-3xl font-extrabold tracking-tight; }` dentro de `@layer components`. Si el avatar es una cadena (ruta pública), el bloque de imagen se omite: hoy es `ImageMetadata`.

- [ ] **Paso 14: Capturas y verificación**

Run: `build`, `serve`, y capturas claro/oscuro de `/`, `/archives/`, `/about/` a 1280 y 390 (`t3-*.png`).
Expected: coinciden con los artboards `Main`, `Home-claro`, `Archivo` y `Acerca` del mockup (cabecera, destacada, filas, años grandes, avatar con borde).

- [ ] **Paso 15: Lint, typecheck y commits**

```bash
~/.bun/bin/bun run lint && ~/.bun/bin/bun run typecheck
git add -A && git commit -q -m "feat: portada con entrada destacada y filas, archivo por años y acerca de de Zilla"
```

**Revisión visual de Mauricio:** portada, archivo y «Acerca de» en ambos modos, escritorio y móvil.

---

### Tarea 4: Entradas, TOC, contenido y demás páginas

**Archivos:**

- Modificar: `src/layouts/PostLayout.astro`, `src/layouts/PageLayout.astro`, `src/components/PostNav.astro`, `src/components/islands/TableOfContents.astro`, `src/styles/global.css` (bloque `prose-zilla`), `src/pages/404.astro`, `src/pages/[...locale]/{tags,categories}/*.astro`, `src/pages/[...locale]/{search,privacy}.astro`

**Interfaces:**

- Consume: `TableOfContents` (`headings`, `locale`), `PostNav` (`prev`, `next`, `locale`), `shouldShowHero`, `SITE.showHeroInPosts`.

- [ ] **Paso 1: Estructura de la entrada con TOC lateral**

En `PostLayout.astro`, vuelve a poner la tabla de contenidos. Envuelve el `<article>` en una rejilla y mueve el TOC a una columna:

```astro
<div class="xl:grid xl:grid-cols-[minmax(0,1fr)_15rem] xl:gap-10">
  <article class="mx-auto w-full max-w-[780px] min-w-0">
    …cabecera, hero, contenido, PostNav, comentarios (sin cambios de lógica)…
  </article>
  {
    post.data.toc && headings.length > 0 && (
      <aside aria-label={t('post.toc')}>
        <TableOfContents headings={headings} locale={locale} />
      </aside>
    )
  }
</div>
```

Como la rejilla vive dentro del `<main>` (920 px), `BaseLayout` necesita más ancho en entradas: pasa `wide` o ensancha: en `BaseLayout.astro` añade la prop `wide?: boolean` y usa `narrow ? 'max-w-[780px]' : wide ? 'max-w-[1120px]' : 'max-w-[920px]'`; `PostLayout` pasa `wide`. Quita el `articleClass` de caja/borde y deja `class="…"` como arriba.

- [ ] **Paso 2: TOC plegable en pantallas menores**

En `PostLayout.astro`, justo antes del contenido (`<div class="prose-zilla …">`), añade:

```astro
{
  post.data.toc && headings.length > 0 && (
    <details class="zilla-toc-mobile xl:hidden">
      <summary class="zilla-menu__summary">{t('post.toc')}</summary>
      <ol class="mt-2 space-y-1.5 px-1 text-sm">
        {headings
          .filter((h) => h.depth >= 2 && h.depth <= 3)
          .map((h) => (
            <li class={h.depth === 3 ? 'pl-4' : ''}>
              <a href={`#${h.slug}`} class="hover:text-primary">
                {h.text}
              </a>
            </li>
          ))}
      </ol>
    </details>
  )
}
```

Y en `TableOfContents.astro` cambia `top-20` por `top-8` (ya no hay barra superior fija) y los colores `text-base-content/60` por `text-muted`.

- [ ] **Paso 3: Cabecera de la entrada**

En `PostLayout.astro`, aplica al `<h1>`: `class="font-display text-[2.5rem] leading-[1.08] font-extrabold tracking-[-0.025em] max-sm:text-[2rem]"`; la descripción `text-muted text-lg`; la fecha en `text-warm font-semibold`; el hero (`showHero`) sin cambios de lógica. `showHero` ya es `shouldShowHero(post) && (post.data.showHeroInPost ?? SITE.showHeroInPosts)`.

- [ ] **Paso 4: Retocar `prose-zilla`**

En `global.css`, en el bloque `.prose-zilla`: títulos con `font-display`, h2 sin subrayado de línea y con más aire, enlaces en el acento, cita con barra de acento. Cambios concretos:

```css
.prose-zilla h1,
.prose-zilla h2,
.prose-zilla h3,
.prose-zilla h4 {
  @apply font-display text-base-content scroll-mt-24 font-bold tracking-[-0.015em];
}
.prose-zilla h2 {
  @apply mt-12 mb-4 border-0 text-[1.75rem] leading-tight font-extrabold;
}
.prose-zilla blockquote {
  @apply border-primary text-muted my-6 border-l-4 pl-4 italic;
}
```

El resto (código, tablas, callouts, imágenes, galería) usa tokens de daisyUI y se revisa en el paso 6.

- [ ] **Paso 5: Páginas sin diseño propio en el mockup**

Para cada ruta: `/posts/<un post con código y tabla>/`, `/posts/bug-disponibilidad-fantasma/`, `/categories/`, `/tags/`, `/tags/linux/`, `/categories/linux/`, `/privacy/`, `/search/`, `/404`: haz `shot` claro y oscuro a 1280 y 390 y corrige lo que se vea fuera de estilo. Reglas para decidir: usar `font-display` en títulos de página, `text-muted` en textos secundarios, `zilla-chip` para etiquetas, filas con `PostList` para listados, `rounded-xl border border-base-300 bg-base-100` para tarjetas. `PageLayout.astro` pasa a usar `BaseLayout` con `narrow` y el mismo encabezado que «Acerca de» sin avatar.

- [ ] **Paso 6: Contenido dentro de los posts, en ambos modos**

Revisa en claro y oscuro: encabezados, enlaces, listas, cita, tabla, bloque de código (Expressive Code), código en línea, imagen, `Callout`, la galería del post de siluetas (`/posts/es-viernes-de-siluetas/`) y su visor (clic), y un diagrama Mermaid si existe. Cada elemento debe tener contraste AA; si algo se ve apagado o ilegible, ajusta su regla en `global.css` y vuelve a revisar.

- [ ] **Paso 7: Verificación**

```bash
~/.bun/bin/bun run lint && ~/.bun/bin/bun run typecheck && build
grep -c "post-hero\|<figure" dist/posts/bug-disponibilidad-fantasma/index.html
grep -c "xl:hidden" dist/posts/bug-disponibilidad-fantasma/index.html
```

Expected: sin errores; el hero sigue apareciendo según `showHeroInPosts`; el TOC plegable existe.

- [ ] **Paso 8: Commit**

```bash
git add -A && git commit -q -m "feat: entradas de Zilla con TOC lateral y contenido restilizado; páginas secundarias al nuevo estilo"
```

**Revisión visual de Mauricio:** una entrada con código/galería, categorías, etiquetas, privacidad, búsqueda y 404.

---

### Tarea 5: Limpieza y documentación

**Archivos:**

- Modificar: `src/styles/global.css`, `package.json`, `README.md`, `AGENTS.md`, `LICENSE`, `.env.example`, `src/config.ts`, `src/types/config.ts`

- [ ] **Paso 1: CSS sin uso**

```bash
grep -o "\.zilla-[a-z0-9_-]*" src/styles/global.css | sort -u | while read c; do
  n=$(grep -rl "${c#.}" src --include=*.astro --include=*.ts --include=*.mdx | grep -v global.css | wc -l)
  [ "$n" = 0 ] && echo "$c"
done
```

Cada clase listada no se usa fuera de `global.css`: borra su regla (y las de `@theme` del sidebar: `--color-sidebar-*`, `--width-sidebar*`, `--width-panel`, `--height-topbar`). Repite hasta que no salga nada.

- [ ] **Paso 2: Opciones de config sin uso**

Si ya nadie lee `SITE.footer.leftText`, `rightText`, `showThemeCredits`, `boxedArticles`, `dynamicPostCardHeight` o `post.data.dynamicPostCardHeight`, quítalos de `src/config.ts`, `src/types/config.ts` y `src/content.config.ts` (confirma con `grep -rn` antes de borrar). `showFeaturedImages`, `showHeroInPosts`, `showFeaturedImage` y `showHeroInPost` se quedan.

- [ ] **Paso 3: Paquete, README, AGENTS y licencia**

- `package.json`: `"name": "zilla"` y revisa que las palabras clave no mencionen `chirpy` ni `chirping-astro`.
- `README.md`: reemplázalo por un README breve de Zilla (qué es, cómo correr `bun run dev`/`build`, estructura de carpetas, cómo se configura `src/config.ts`, que deriva de Chirping Astro).
- `AGENTS.md`: sustituye las referencias al tema viejo por Zilla y documenta los tokens (`zilla-*`) y la Receta de verificación de este plan.
- `LICENSE`: conserva la línea `Copyright (c) 2026 Kannan Suresh and contributors` y añade debajo `Copyright (c) 2026 Mauricio Cerón (Zilla)`, más la nota: «Zilla is derived from Chirping Astro (https://github.com/kannansuresh/chirping-astro), MIT.».
- `.env.example`: sustituye cualquier mención de `chirping-astro` por el nombre del repo.

- [ ] **Paso 4: Verificación final**

```bash
~/.bun/bin/bun run lint && ~/.bun/bin/bun run typecheck && build
ls dist/_pagefind dist/rss.xml dist/sitemap-index.xml dist/og | head
grep -c "cloud.umami.is/script.js" dist/index.html
```

Expected: sin errores; existen Pagefind, RSS, sitemap y la carpeta de imágenes OG; Umami sigue en la portada. Capturas finales claro/oscuro de portada, archivo, acerca de, una entrada y la búsqueda abierta (clic en el botón de búsqueda) a 1280 y 390.

- [ ] **Paso 5: Commit**

```bash
git add -A && git commit -q -m "chore: limpieza de CSS y config sin uso; documentación y licencia de Zilla"
```

**Revisión final de Mauricio:** recorrido completo en claro y oscuro, escritorio y móvil, y decisión de fusionar `rediseno` en `main`.

---

## Autorrevisión

- **Cobertura de la especificación:** tokens y fuentes (T1), renombrado (T1), cabecera/pie y retirada de sidebar/topbar/panel/idioma (T2), portada y paginación (T3), archivo (T3), acerca de (T3), entrada con TOC y `showHeroInPosts` (T4), categorías/etiquetas/privacidad/404/búsqueda (T4), accesibilidad (T2, T3, T4), limpieza y licencia (T5), verificación final (T5).
- **Consistencia de nombres:** `Header`, `Footer`, `FeaturedPost`, `PostRow`, `PostList`, `zilla-*`, `prose-zilla`, claves `home.*`, `footer.*`, `archives.*` se definen antes de usarse.
- **Decisión que queda abierta por diseño:** el menú móvil es `<details>` (T2); si en la revisión de Mauricio no gusta, se cambia en esa misma tarea.
