/**
 * UI dictionaries.
 * Add new locales by adding a key to `messages` and to `SITE.locales` in
 * src/config.ts. All keys must exist for every locale (TypeScript enforces it).
 */

import type { Locale } from '../config';

export const messages = {
  fr: {
    'site.skipToContent': 'Aller au contenu',
    'nav.home': 'Accueil',
    'nav.posts': 'Articles',
    'nav.tags': 'Étiquettes',
    'nav.categories': 'Catégories',
    'nav.archives': 'Archives',
    'nav.about': 'À propos',
    'nav.search': 'Rechercher',
    'nav.toggleMenu': 'Basculer le menu',

    'theme.toggle': 'Changer de thème',
    'theme.light': 'Clair',
    'theme.dark': 'Sombre',
    'theme.system': 'Système',

    'lang.switcher': 'Langue',
    'lang.en': 'Anglais',
    'lang.fr': 'Français',
    'lang.es': 'Espagnol',

    'post.publishedOn': 'Publié le',
    'post.updatedOn': 'Mis à jour le',
    'post.readingTime': 'min de lecture',
    'post.toc': 'Sommaire',
    'post.tags': 'Étiquettes',
    'post.categories': 'Catégories',
    'post.previous': 'Précédent',
    'post.next': 'Suivant',
    'post.comments': 'Commentaires',
    'post.commentsDisabled': 'Les commentaires sont désactivés pour cet article.',
    'post.commentsSetupTitle': 'Les commentaires doivent être configurés',
    'post.commentsSetupBody':
      'Giscus est activé mais pas encore configuré. Renseignez les informations du dépôt ci-dessous pour activer les commentaires.',
    'post.commentsSetupStep1':
      'Rendez-vous sur `giscus.app` et sélectionnez votre dépôt GitHub public (les Discussions doivent être activées).',
    'post.commentsSetupStep2':
      'Copiez les valeurs générées de `data-repo-id`, `data-category` et `data-category-id`.',
    'post.commentsSetupStep3':
      'Définissez les variables d\u2019environnement `PUBLIC_GISCUS_ENABLED`, `PUBLIC_GISCUS_REPO`, `PUBLIC_GISCUS_REPO_ID`, `PUBLIC_GISCUS_CATEGORY` et `PUBLIC_GISCUS_CATEGORY_ID` dans votre fichier `.env`.',
    'post.commentsSetupStep4':
      'Reconstruisez le site — cet avis sera remplacé par le fil de commentaires en direct.',
    'post.commentsSetupDocs': 'Ouvrir giscus.app',
    'post.share': 'Partager',
    'post.copyLink': 'Copier le lien',
    'post.copied': 'Copié !',
    'post.author': 'Auteur',

    'list.allPosts': 'Tous les articles',
    'list.empty': 'Aucun article.',
    'list.tagPosts': 'Articles étiquetés',
    'list.categoryPosts': 'Articles dans',
    'list.totalPosts': 'articles',
    'list.totalPostsOne': 'article',

    'pagination.previous': 'Page précédente',
    'pagination.next': 'Page suivante',
    'pagination.page': 'Page',
    'pagination.of': 'sur',

    'archives.title': 'Archives',
    'archives.empty': 'Aucun article pour le moment.',

    'tags.title': 'Étiquettes',
    'tags.empty': 'Aucune étiquette.',

    'categories.title': 'Catégories',
    'categories.empty': 'Aucune catégorie.',

    'search.title': 'Recherche',
    'search.placeholder': 'Rechercher sur le site',
    'search.openLabel': 'Ouvrir la recherche',
    'search.closeLabel': 'Fermer la recherche',
    'search.empty': 'Aucun résultat.',
    'search.loading': 'Chargement de la recherche…',
    'search.typeToStart': 'Tapez pour rechercher…',
    'search.hintShortcut': 'Appuyez sur / pour ouvrir la recherche',
    'search.searching': 'Recherche…',
    'search.noResultsFor': 'Aucun résultat pour',
    'search.resultsCount': 'résultats',
    'search.resultsCountOne': 'résultat',
    'search.hintNavigate': 'pour naviguer',
    'search.hintSelect': 'pour ouvrir',
    'search.clearLabel': 'Effacer',

    'code.copy': 'Copier',
    'code.copied': 'Copié',

    '404.title': 'Page introuvable',
    '404.description': 'La page que vous cherchez s\u2019est envolée.',
    '404.cta': 'Retour à l\u2019accueil',

    'footer.poweredBy': 'Propulsé par',
    'footer.theme': 'Thème',
    'footer.privacy': 'Politique de confidentialité',
    'footer.copyright': 'Tous droits réservés.',
  },

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
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof messages)['en'];
