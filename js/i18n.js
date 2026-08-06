// Sistema de idioma ES/EN - textos fijos del sitio + estado global de idioma.
// Los textos de proyectos (que dependen de js/projects-data.js) se resuelven en render-projects.js.

(function () {
  'use strict';

  const STRINGS = {
    es: {
      nav_home: 'Home',
      nav_projects: 'Proyectos',
      brand_role: 'Arquitecta',
      home_eyebrow_1: 'Arquitecta',
      home_eyebrow_2: 'UBA',
      home_about_label: 'Sobre mí',
      home_bio: 'Arquitecta graduada de FADU-UBA, con experiencia en intervenciones de espacio público y dirección de obra. Me apasiona transformar ideas en espacios reales y participar en el proceso completo de un proyecto, desde el diseño hasta su materialización, combinando una mirada técnica y creativa. Me interesa especialmente el desarrollo inmobiliario y el potencial de la arquitectura para transformar el entorno cotidiano de las personas. Actualmente, me encuentro incorporando la metodología BIM como parte de una práctica profesional cada vez más integrada y eficiente.',
      home_contact_title: 'Conectemos',
      home_featured_label: 'Proyectos destacados',
      home_featured_all: 'Ver todos',
      home_cv_label: 'Curriculum Vitae',
      home_quote: '"Diseñar espacios es interpretar necesidades y descubrir oportunidades."',
      projects_sidebar_title: 'Proyectos',
      projects_sidebar_text: 'Una selección de mis proyectos que abordan distintas escalas, contextos y necesidades.',
      projects_sidebar_label: 'Categorías',
      filter_all: 'Todos',
      filter_urbano: 'Urbano',
      filter_residencial: 'Residencial',
      filter_institucional: 'Institucional',
      projects_empty: 'No hay proyectos en esta categoría todavía.',
      projects_count_singular: '1 proyecto',
      projects_count_plural: '{n} proyectos',
      footer_copy: '© {year} Mariana Mungo - Todos los derechos reservados.',
      footer_tagline: 'Espacios diseñados para ser habitados',
      overlay_view_project: 'Ver proyecto →',
      detail_back: '← Volver a proyectos',
      detail_behance: 'Ver publicación completa en Behance ↗',
      pager_prev_label: '← Proyecto anterior',
      pager_next_label: 'Proyecto siguiente →',
      meta_location: 'Ubicación',
      meta_year: 'Año',
      meta_surface: 'Superficie',
      meta_role: 'Rol',
      meta_type: 'Tipo',
      description_pending: 'Memoria descriptiva en revisión - pronto vas a poder leer el detalle completo de este proyecto acá.',
    },
    en: {
      nav_home: 'Home',
      nav_projects: 'Projects',
      brand_role: 'Architect',
      home_eyebrow_1: 'Architect',
      home_eyebrow_2: 'UBA',
      home_about_label: 'About me',
      home_bio: "Architect graduated from FADU-UBA, with experience in public space interventions and site management. I'm passionate about turning ideas into real spaces and being part of a project's full process, from design through to construction, combining a technical and creative outlook. I'm especially interested in real estate development and architecture's potential to transform people's everyday surroundings. I'm currently incorporating BIM methodology as part of an increasingly integrated and efficient professional practice.",
      home_contact_title: "Let's connect",
      home_featured_label: 'Featured projects',
      home_featured_all: 'View all',
      home_cv_label: 'Resume',
      home_quote: '"Designing spaces means interpreting needs and discovering opportunities."',
      projects_sidebar_title: 'Projects',
      projects_sidebar_text: 'A selection of my projects addressing different scales, contexts and needs.',
      projects_sidebar_label: 'Categories',
      filter_all: 'All',
      filter_urbano: 'Urban',
      filter_residencial: 'Residential',
      filter_institucional: 'Institutional',
      projects_empty: 'No projects in this category yet.',
      projects_count_singular: '1 project',
      projects_count_plural: '{n} projects',
      footer_copy: '© {year} Mariana Mungo - All rights reserved.',
      footer_tagline: 'Spaces designed to be inhabited',
      overlay_view_project: 'View project →',
      detail_back: '← Back to projects',
      detail_behance: 'View full post on Behance ↗',
      pager_prev_label: '← Previous project',
      pager_next_label: 'Next project →',
      meta_location: 'Location',
      meta_year: 'Year',
      meta_surface: 'Surface area',
      meta_role: 'Role',
      meta_type: 'Type',
      description_pending: 'Project description under review - the full write-up for this project will be available here soon.',
    },
  };

  const STORAGE_KEY = 'mm-lang';
  let lang = localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'es';
  const listeners = [];

  function t(key) {
    return (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.es[key] || key;
  }

  function applyStatic() {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      el.setAttribute('aria-label', t(el.dataset.i18nAria));
    });

    document.querySelectorAll('[data-lang-set]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.langSet === lang);
    });

    const yearEl = document.getElementById('year');
    const footerCopy = document.querySelector('[data-i18n-footer-copy]');
    if (footerCopy) {
      footerCopy.textContent = t('footer_copy').replace('{year}', yearEl ? yearEl.textContent : new Date().getFullYear());
    }
  }

  function setLang(next) {
    if (next !== 'es' && next !== 'en') return;
    if (next === lang) return;
    lang = next;
    localStorage.setItem(STORAGE_KEY, lang);
    applyStatic();
    listeners.forEach(fn => fn(lang));
  }

  function onChange(fn) {
    listeners.push(fn);
  }

  function getLang() {
    return lang;
  }

  window.MM_I18N = { t, getLang, setLang, onChange, applyStatic };

  document.addEventListener('DOMContentLoaded', () => {
    applyStatic();
    document.querySelectorAll('[data-lang-set]').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.langSet));
    });
  });
})();
