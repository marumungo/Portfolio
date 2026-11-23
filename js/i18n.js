// Sistema de idioma ES/EN - textos fijos del sitio + estado global de idioma.
// Los textos de proyectos (que dependen de js/projects-data.js) se resuelven en render-projects.js.

(function () {
  'use strict';

  const STRINGS = {
    es: {
      nav_home: 'Inicio',
      nav_how: 'Cómo trabajo',
      nav_path: 'Trayectoria',
      nav_tools: 'Herramientas',
      nav_projects: 'Proyectos',
      nav_contact: 'Contacto',
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
      how_label: 'Cómo trabajo',
      how_1_title: 'Mirada técnica y creativa',
      how_1_text: 'Combino el criterio técnico de la obra con la sensibilidad del diseño, acompañando cada proyecto desde la idea hasta su materialización.',
      how_2_title: 'Del proyecto a la obra',
      how_2_text: 'Elaboro planos y replanteos, coordino con contratistas y hago el seguimiento en obra con visitas e inspecciones para asegurar que lo proyectado se cumpla.',
      how_3_title: 'Tecnología al servicio del proyecto',
      how_3_text: 'Mi formación en programación y en metodología BIM me permite incorporar nuevas herramientas y trabajar de forma cada vez más integrada y eficiente.',
      path_label: 'Formación y experiencia',
      path_exp_title: 'Experiencia laboral',
      exp_1_role: 'Arquitecta - Gobierno de la Ciudad de Buenos Aires',
      exp_1_date: 'Junio 2025 - Actualidad',
      exp_1_text: 'Participación en el desarrollo de proyectos y dirección de obras públicas de la Comuna 2. Elaboración de planos y replanteos, coordinación con contratistas y seguimiento de obra mediante visitas e inspecciones para verificar avances y asegurar el cumplimiento de los proyectos.',
      path_edu_title: 'Estudios',
      edu_1_title: 'Arquitectura - FADU, UBA',
      edu_1_text: 'Graduada como arquitecta. Promedio 8,22.',
      edu_2_title: 'Bachiller en lenguas - Colegio del Libertador',
      edu_2_text: 'Secundario con orientación en idiomas. Promedio 9,23.',
      path_courses_title: 'Cursos y certificaciones',
      course_1_title: 'Curso Metodología BIM (Revit) - Centro de e-Learning, UTN',
      course_1_text: 'Modelado BIM, desarrollo de familias, documentación técnica y cómputos métricos mediante Autodesk Revit.',
      course_2_title: 'Desarrollo Full Stack - Coderhouse',
      course_2_text: 'Desarrollo web, JavaScript, React JS y programación backend.',
      course_3_title: 'First Certificate Exam - Cambridge',
      course_3_text: 'Certificación internacional de inglés, nivel B2.',
      path_lang_title: 'Idiomas',
      lang_en_name: 'Inglés',
      lang_pt_name: 'Portugués',
      lvl_adv: 'Avanzado',
      lvl_int_adv: 'Intermedio / Avanzado',
      lvl_basic: 'Básico',
      lvl_basic_int: 'Básico / Intermedio',
      tools_label: 'Herramientas y BIM',
      bim_title: 'Metodología BIM',
      bim_text: 'Estoy incorporando BIM a mi práctica profesional. Realicé el curso de Metodología BIM (Revit) en el Centro de e-Learning de la UTN, donde trabajé modelado, desarrollo de familias, documentación técnica y cómputos métricos con Autodesk Revit.',
      bim_chip_1: 'Modelado BIM',
      bim_chip_2: 'Desarrollo de familias',
      bim_chip_3: 'Documentación técnica',
      bim_chip_4: 'Cómputos métricos',
      tools_list_title: 'Herramientas',
      connect_text: 'Si te interesa mi trabajo o querés conversar sobre un proyecto, escribime o encontrame en estas redes.',
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
      footer_credit: 'Sitio realizado por',
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
      hero_contact_btn: 'Contactame',
      path_study_title: 'Formación',
      badge_honor: 'Diploma de honor',
      exp_cta: 'Ver proyectos y obras',
      bim_cta: 'Ver mi trabajo final',
      bim_cap: 'PDF',
      cv_btn: 'Descargar CV',
      bim_shot_cap: 'Trabajo final integrador · Vivienda unifamiliar',
      cv_langs_title: 'Idioma del CV',
      cv_langs_label: 'Elegir idioma del CV',
      cv_hint_es: 'PDF · Español',
      cv_hint_en: 'PDF · Inglés',
    },
    en: {
      nav_home: 'Home',
      nav_how: 'How I work',
      nav_path: 'Background',
      nav_tools: 'Tools',
      nav_projects: 'Projects',
      nav_contact: 'Contact',
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
      how_label: 'How I work',
      how_1_title: 'A technical and creative approach',
      how_1_text: 'I combine the technical rigor of construction with design sensitivity, following each project from the initial idea through to its realization.',
      how_2_title: 'From project to site',
      how_2_text: 'I prepare drawings and set-outs, coordinate with contractors and monitor progress on site through visits and inspections to make sure the design is delivered as planned.',
      how_3_title: 'Technology serving the project',
      how_3_text: 'My background in programming and BIM methodology lets me adopt new tools and work in an increasingly integrated and efficient way.',
      path_label: 'Education & experience',
      path_exp_title: 'Work experience',
      exp_1_role: 'Architect - Government of the City of Buenos Aires',
      exp_1_date: 'June 2025 - Present',
      exp_1_text: 'Taking part in the development of projects and site supervision of public works in Comuna 2. Preparation of drawings and set-outs, coordination with contractors, and site monitoring through visits and inspections to verify progress and ensure projects are delivered as designed.',
      path_edu_title: 'Studies',
      edu_1_title: 'Architecture - FADU, UBA',
      edu_1_text: 'Graduated as an architect. Average grade: 8.22.',
      edu_2_title: 'Languages baccalaureate - Colegio del Libertador',
      edu_2_text: 'High school with a focus on languages. Average grade: 9.23.',
      path_courses_title: 'Courses & certifications',
      course_1_title: 'BIM Methodology (Revit) Course - e-Learning Center, UTN',
      course_1_text: 'BIM modeling, family development, technical documentation and quantity take-offs using Autodesk Revit.',
      course_2_title: 'Full Stack Development - Coderhouse',
      course_2_text: 'Web development, JavaScript, React JS and backend programming.',
      course_3_title: 'First Certificate Exam - Cambridge',
      course_3_text: 'International English certification, B2 level.',
      path_lang_title: 'Languages',
      lang_en_name: 'English',
      lang_pt_name: 'Portuguese',
      lvl_adv: 'Advanced',
      lvl_int_adv: 'Intermediate / Advanced',
      lvl_basic: 'Basic',
      lvl_basic_int: 'Basic / Intermediate',
      tools_label: 'Tools & BIM',
      bim_title: 'BIM methodology',
      bim_text: 'I am bringing BIM into my professional practice. I completed the BIM Methodology (Revit) course at the UTN e-Learning Center, working on modeling, family development, technical documentation and quantity take-offs with Autodesk Revit.',
      bim_chip_1: 'BIM modeling',
      bim_chip_2: 'Family development',
      bim_chip_3: 'Technical documentation',
      bim_chip_4: 'Quantity take-offs',
      tools_list_title: 'Tools',
      connect_text: 'If you are interested in my work or want to talk about a project, write to me or find me on these networks.',
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
      footer_credit: 'Site built by',
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
      hero_contact_btn: 'Contact me',
      path_study_title: 'Education',
      badge_honor: 'Honors diploma',
      exp_cta: 'See projects and works',
      bim_cta: 'View my final project',
      bim_cap: 'PDF',
      cv_btn: 'Download CV',
      bim_shot_cap: 'Final integrative project · Single-family house',
      cv_langs_title: 'CV language',
      cv_langs_label: 'Choose the CV language',
      cv_hint_es: 'PDF · Spanish',
      cv_hint_en: 'PDF · English',
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
    // Enlaces que cambian según el idioma (ej. el CV en español o en inglés)
    document.querySelectorAll('[data-href-es]').forEach(el => {
      el.setAttribute('href', lang === 'en' ? el.dataset.hrefEn : el.dataset.hrefEs);
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
