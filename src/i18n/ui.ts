/**
 * UI dictionaries.
 * Add new locales by adding a key to `messages` and to `SITE.locales` in
 * src/config.ts. All keys must exist for every locale (TypeScript enforces it).
 */

import type { Locale } from '../config';

export const messages = {
  en: {
    'site.skipToContent': 'Saltar al contenido',
    'nav.home': 'Inicio',
    'nav.posts': 'Entradas',
    'nav.tags': 'Etiquetas',
    'nav.categories': 'Categorías',
    'nav.archives': 'Archivo',
    'nav.about': 'Acerca de',
    'nav.search': 'Buscar',
    'nav.toggleMenu': 'Alternar menú',

    'theme.toggle': 'Cambiar tema',
    'theme.light': 'Claro',
    'theme.dark': 'Oscuro',
    'theme.system': 'Sistema',

    'lang.switcher': 'Idioma',
    'lang.en': 'Inglés',
    'lang.fr': 'Francés',
    'lang.es': 'Español',

    'post.publishedOn': 'Publicado el',
    'post.updatedOn': 'Actualizado el',
    'post.readingTime': 'min de lectura',
    'post.toc': 'Tabla de contenidos',
    'post.tags': 'Etiquetas',
    'post.categories': 'Categorías',
    'post.previous': 'Anterior',
    'post.next': 'Siguiente',
    'post.comments': 'Comentarios',
    'post.commentsDisabled': 'Los comentarios están desactivados para esta entrada.',
    'post.commentsSetupTitle': 'Los comentarios necesitan configuración',
    'post.commentsSetupBody':
      'Giscus está habilitado pero aún no configurado. Añade los datos del repositorio abajo para empezar a recibir comentarios.',
    'post.commentsSetupStep1':
      'Visita `giscus.app` y selecciona tu repositorio público de GitHub (las Discussions deben estar habilitadas).',
    'post.commentsSetupStep2':
      'Copia los valores generados de `data-repo-id`, `data-category` y `data-category-id`.',
    'post.commentsSetupStep3':
      'Define las variables de entorno `PUBLIC_GISCUS_ENABLED`, `PUBLIC_GISCUS_REPO`, `PUBLIC_GISCUS_REPO_ID`, `PUBLIC_GISCUS_CATEGORY` y `PUBLIC_GISCUS_CATEGORY_ID` en tu archivo `.env`.',
    'post.commentsSetupStep4':
      'Reconstruye el sitio — este aviso será reemplazado por el hilo de comentarios en vivo.',
    'post.commentsSetupDocs': 'Abrir giscus.app',
    'post.share': 'Compartir',
    'post.copyLink': 'Copiar enlace',
    'post.copied': '¡Copiado!',
    'post.author': 'Autor',

    'list.allPosts': 'Todas las entradas',
    'list.empty': 'No se encontraron entradas.',
    'list.tagPosts': 'Entradas etiquetadas',
    'list.categoryPosts': 'Entradas en',
    'list.totalPosts': 'entradas',
    'list.totalPostsOne': 'entrada',

    'pagination.previous': 'Página anterior',
    'pagination.next': 'Página siguiente',
    'pagination.page': 'Página',
    'pagination.of': 'de',

    'archives.title': 'Archivo',
    'archives.empty': 'Aún no hay entradas.',

    'tags.title': 'Etiquetas',
    'tags.empty': 'Aún no hay etiquetas.',

    'categories.title': 'Categorías',
    'categories.empty': 'Aún no hay categorías.',

    'search.title': 'Buscar',
    'search.placeholder': 'Buscar en el sitio',
    'search.openLabel': 'Abrir búsqueda',
    'search.closeLabel': 'Cerrar búsqueda',
    'search.empty': 'Sin resultados.',
    'search.loading': 'Cargando búsqueda…',
    'search.typeToStart': 'Escribe para buscar…',
    'search.hintShortcut': 'Presiona / en cualquier lugar para abrir la búsqueda',
    'search.searching': 'Buscando…',
    'search.noResultsFor': 'Sin resultados para',
    'search.resultsCount': 'resultados',
    'search.resultsCountOne': 'resultado',
    'search.hintNavigate': 'para navegar',
    'search.hintSelect': 'para abrir',
    'search.clearLabel': 'Limpiar',

    'code.copy': 'Copiar',
    'code.copied': 'Copiado',

    '404.title': 'Página no encontrada',
    '404.description': 'La página que buscas salió volando.',
    '404.cta': 'Volver al inicio',

    'footer.poweredBy': 'Desarrollado con',
    'footer.theme': 'Tema',
    'footer.privacy': 'Política de privacidad',
    'footer.copyright': 'Todos los derechos reservados.',
    'home.latestEntry': 'Última entrada',
    'home.readMore': 'Leer entrada',
    'home.recent': 'Más recientes',
    'home.viewArchive': 'Ver todo el archivo',
    'archives.subtitle': 'Todas las entradas, de la más reciente a la más antigua.',
    'archives.jump': 'Ir a un año',
    'footer.latest': 'Últimos actualizados',
    'footer.popularTags': 'Etiquetas populares',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof messages)['en'];
