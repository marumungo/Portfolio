// Main JS

(function () {
  'use strict';

  // DOM
  const navbar      = document.querySelector('.navbar');
  const navBrand    = document.querySelector('.navbar__brand');
  const navLinks    = document.querySelectorAll('.navbar__link');
  const mobileLinks = document.querySelectorAll('.navbar__mobile a');
  const hamburger   = document.querySelector('.navbar__hamburger');
  const mobileMenu  = document.querySelector('.navbar__mobile');
  const sections    = document.querySelectorAll('.page-section');

  // Filtro proyectos
  const tabs          = document.querySelectorAll('.projects__tab');
  const sidebarFilter = document.querySelectorAll('.projects__sidebar-filter');
  const countEl       = document.querySelector('.projects__count');
  const emptyState    = document.querySelector('.projects__empty');

  const PAGE_TRANSITION_MS = 220;

  // Título de pestaña según la ruta activa (el sitio es una sola página con
  // routing por hash, así que el <title> del HTML nunca cambiaba solo).
  const BASE_TITLE = 'Mariana Mungo - Arquitecta';

  function updateTitle(hash) {
    const lang = window.MM_I18N ? window.MM_I18N.getLang() : 'es';

    if (hash.startsWith('proyecto/')) {
      const slug = decodeURIComponent(hash.slice('proyecto/'.length));
      const project = typeof projects !== 'undefined' ? projects.find(p => p.slug === slug) : null;
      if (project) {
        const title = (lang === 'en' && project.en && project.en.title) ? project.en.title : project.title;
        document.title = `${title} · ${BASE_TITLE}`;
        return;
      }
    }

    if (hash === 'proyectos') {
      document.title = (lang === 'en' ? 'Projects' : 'Proyectos') + ` · ${BASE_TITLE}`;
      return;
    }

    document.title = BASE_TITLE;
  }
  window.mmUpdateTitle = updateTitle;

  // Navegacion

  function updateNavState(activeNavId) {
    const key = link => link.dataset.section || link.dataset.page;
    // "Proyectos" del navbar lleva a los destacados del inicio; también se marca en la lista completa y en cada proyecto
    const active = activeNavId === 'proyectos' ? 'destacados' : activeNavId;
    navLinks.forEach(link => {
      link.classList.toggle('active', key(link) === active);
    });
    mobileLinks.forEach(link => {
      link.classList.toggle('active', key(link) === active);
    });
  }

  // Secciones del recorrido dentro de #home (se pueden abrir con #id y desde el navbar)
  const SECTION_IDS = ['como-trabajo', 'trayectoria', 'herramientas', 'destacados', 'contacto'];

  function homeActive() {
    return document.getElementById('home').classList.contains('active');
  }

  // Con el efecto de capas (sticky) un panel ya superado queda pegado arriba, así que scrollIntoView
  // no serviría: se calcula la posición que tiene la sección en el flujo normal de la página.
  function scrollToSection(id, smooth = true) {
    const el = document.getElementById(id);
    if (!el) return;
    let y = document.getElementById('home').offsetTop; // offsetTop ignora la animación de entrada (transform)
    for (let s = el.previousElementSibling; s; s = s.previousElementSibling) y += s.offsetHeight;
    window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'instant' });
  }

  // Efecto de capas del inicio: solo si todas las pantallas entran en la altura de la ventana
  // (si no, un panel pegado arriba cortaría su parte de abajo) y sin "reducir movimiento".
  const homeEl = document.getElementById('home');
  function updateStack() {
    if (!homeActive()) return;
    let fits = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (fits) {
      homeEl.querySelectorAll('.home__hero, .home__panel:not(.home__connect), .home__featured').forEach(el => {
        if (el.offsetHeight > window.innerHeight + 2) fits = false;
      });
    }
    homeEl.classList.toggle('home--stack', fits);
  }

  function switchPage(targetId, activeNavId, opts = {}) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const current = document.querySelector('.page-section.active');

    const finishSwitch = () => {
      if (current && current !== target) {
        current.classList.remove('active', 'page-leave', 'page-enter');
      }
      target.classList.remove('page-leave', 'page-enter');
      target.classList.add('active');
      // Trigger reflow para (re)disparar la animación de entrada
      void target.offsetWidth;
      target.classList.add('page-enter');

      updateNavState(activeNavId || targetId);
      updateStack();
      updateReveal();
      if (opts.afterSwitch) opts.afterSwitch();
      else window.scrollTo({ top: 0, behavior: 'instant' });
      closeMobileMenu();
    };

    if (current && current !== target) {
      current.classList.add('page-leave');
      setTimeout(finishSwitch, PAGE_TRANSITION_MS);
    } else {
      finishSwitch();
    }

    history.replaceState(null, null, '#' + (opts.hash || (targetId === 'proyecto-detalle' ? location.hash.replace('#', '') : targetId)));
  }

  // Router: home, proyectos, o proyecto/{slug}
  function route() {
    const hash = window.location.hash.replace('#', '');

    if (hash.startsWith('proyecto/')) {
      const slug = decodeURIComponent(hash.slice('proyecto/'.length));
      const ok = typeof window.renderProjectDetail === 'function' && window.renderProjectDetail(slug);
      if (ok) {
        switchPage('proyecto-detalle', 'proyectos');
        updateTitle(hash);
        return;
      }
      location.hash = '#proyectos';
      return;
    }

    if (SECTION_IDS.includes(hash)) {
      switchPage('home', hash, { hash, afterSwitch: () => scrollToSection(hash, false) });
      updateTitle('home');
      return;
    }

    if (hash && document.getElementById(hash)) {
      switchPage(hash);
      updateTitle(hash);
    } else {
      switchPage('home');
      updateTitle('home');
    }
  }

  window.addEventListener('hashchange', route);

  // Navegación del navbar: páginas (inicio, proyectos) y secciones del recorrido
  function navigateTo({ section, page }) {
    if (section) {
      if (homeActive()) {
        closeMobileMenu();
        scrollToSection(section);
        history.replaceState(null, null, '#' + section);
      } else {
        location.hash = '#' + section;
      }
      return;
    }
    if (page === 'home' && homeActive()) {
      closeMobileMenu();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.replaceState(null, null, '#home');
      return;
    }
    location.hash = '#' + page;
  }

  // Click en el logo/marca: siempre vuelve al inicio
  if (navBrand) {
    navBrand.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo({ page: 'home' });
    });
  }

  [...navLinks, ...mobileLinks].forEach(link => {
    link.addEventListener('click', () => navigateTo(link.dataset));
  });

  // Resalta en el navbar la sección que se está viendo mientras se scrollea el inicio.
  // Se calcula en el scroll (y no con IntersectionObserver) porque con el efecto de capas
  // los paneles ya superados siguen "visibles" pegados arriba.
  const spyTargets = [
    ['.home__hero', 'home'],
    ['#como-trabajo', 'como-trabajo'],
    ['#trayectoria', 'trayectoria'],
    ['#herramientas', 'herramientas'],
    ['.home__featured', 'destacados'],
    ['#contacto', 'contacto'],
  ].map(([selector, key]) => ({ el: document.querySelector(selector), key })).filter(t => t.el);

  let spyQueued = false;
  function updateSpy() {
    spyQueued = false;
    if (!homeActive()) return;
    updateReveal();
    let key = 'home';
    spyTargets.forEach(t => {
      if (t.el.getBoundingClientRect().top <= window.innerHeight * 0.5) key = t.key;
    });
    updateNavState(key);
  }
  window.addEventListener('scroll', () => {
    if (!spyQueued) {
      spyQueued = true;
      requestAnimationFrame(updateSpy);
    }
  }, { passive: true });

  // Botones que llevan a una sección (ej. "Contactame")
  document.querySelectorAll('[data-go-section]').forEach(btn => {
    btn.addEventListener('click', () => navigateTo({ section: btn.dataset.goSection }));
  });

  window.addEventListener('resize', debounce(() => { updateStack(); updateReveal(); }, 150));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(updateStack);
  if (window.MM_I18N) window.MM_I18N.onChange(() => requestAnimationFrame(updateStack));

  // Menu movil
  function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Cerrar con clickeos externos
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target) && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // Efecto navbar escroleo
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Filtros de proyectos
  let currentFilter = 'all';
  const FILTER_TRANSITION_MS = 220;

  function applyFilter(filter) {
    currentFilter = filter;
    const cards = document.querySelectorAll('.card');
    let visible = 0;

    cards.forEach(card => {
      const category = card.dataset.category;
      if (filter === 'all' || category === filter) visible++;
    });

    cards.forEach(card => {
      const category = card.dataset.category;
      const show = filter === 'all' || category === filter;

      if (show) {
        card.classList.remove('hidden');
        // Reflow antes de sacar card--out para que la transición de entrada se dispare
        void card.offsetWidth;
        card.classList.remove('card--out');
      } else if (!card.classList.contains('card--out')) {
        card.classList.add('card--out');
        setTimeout(() => {
          if (card.classList.contains('card--out')) card.classList.add('hidden');
        }, FILTER_TRANSITION_MS);
      }
    });

    // Actualizar la cuenta
    if (countEl) {
      const t = window.MM_I18N ? window.MM_I18N.t : (k => k);
      countEl.textContent = visible === 1 ? t('projects_count_singular') : t('projects_count_plural').replace('{n}', visible);
    }

    // Estado vacio
    if (emptyState) {
      emptyState.classList.toggle('visible', visible === 0);
    }

    // Sincronizar todos los controles de filtros
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.filter === filter);
    });
    sidebarFilter.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
  }

  // Reaplicar el filtro activo tras un re-render de cards (ej. al cambiar de idioma)
  window.mmReapplyFilter = () => applyFilter(currentFilter);

  // Tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      applyFilter(tab.dataset.filter);
    });
  });

  // Filtros Sidebar
  sidebarFilter.forEach(btn => {
    btn.addEventListener('click', () => {
      applyFilter(btn.dataset.filter);
    });
  });

  // Animaciones de scroleo
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Las pantallas del inicio no usan este observer: updateReveal() las muestra y las vuelve a
  // ocultar según el scroll, así su animación se repite cada vez que se vuelve a ellas.
  function observeAnimations() {
    document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
      if (el.closest('.home__hero, .home__panel, .home__featured')) return;
      observer.observe(el);
    });
  }

  // Animación de entrada de cada pantalla del inicio, cada vez que se la ve (bajando o subiendo).
  // Se mide con la posición de la sección en el flujo normal (sin el sticky del efecto de capas):
  // así una pantalla que quedó tapada por la siguiente cuenta como "fuera de vista" y, cuando se
  // la vuelve a descubrir al subir, la animación se repite.
  function updateReveal() {
    if (!homeActive()) return;
    const y = window.scrollY;
    const vh = window.innerHeight;
    [...homeEl.children].filter(el => el.matches('.home__hero, .home__panel, .home__featured')).forEach(sec => {
      const top = flowTopOf(sec);
      const h = sec.offsetHeight;
      const overlap = Math.min(y + vh, top + h) - Math.max(y, top);
      const need = Math.min(0.12 * vh, 0.5 * h);
      const on = sec.classList.contains('is-revealed');
      if (!on && overlap >= need) {
        sec.classList.add('is-revealed');
      } else if (on && overlap <= 2) {
        sec.classList.remove('is-revealed');
        sec.querySelectorAll('.fade-up.visible, .fade-in.visible').forEach(e => e.classList.remove('visible'));
      }
      if (sec.classList.contains('is-revealed')) {
        sec.querySelectorAll('.fade-up:not(.visible), .fade-in:not(.visible)').forEach(e => e.classList.add('visible'));
      }
    });
  }
  window.mmUpdateReveal = updateReveal;

  // Inicio
  document.addEventListener('DOMContentLoaded', () => {
    route();
    applyFilter('all');
    observeAnimations();
  });

  // Al cambiar de idioma, el título de la pestaña debe reflejar el nuevo idioma
  if (window.MM_I18N) {
    window.MM_I18N.onChange(() => updateTitle(window.location.hash.replace('#', '')));
  }

  // Re-observar elementos fade-up que aparecen al renderizar la página de detalle
  const bodyObserver = new MutationObserver(() => observeAnimations());
  bodyObserver.observe(document.body, { childList: true, subtree: true });


  // Scroll "por pantallas" en el inicio: apenas se scrollea un poco, la página va sola a la sección
  // siguiente (o a la anterior). Solo funciona cuando todas las pantallas entran en la ventana
  // (misma condición que el efecto de capas); en celulares y pantallas bajas el scroll es el normal.
  // El último destino es el final de la página, para poder ver el pie.
  function flowTopOf(el) {
    let y = homeEl.offsetTop;
    for (let s = el.previousElementSibling; s; s = s.previousElementSibling) y += s.offsetHeight;
    return y;
  }

  function snapPositions() {
    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    const tops = [...homeEl.children]
      .filter(el => el.matches('.home__hero, .home__panel, .home__featured'))
      .map(flowTopOf)
      .filter(y => y < maxY - 8);
    tops.push(maxY);
    return tops;
  }

  function snapActive() {
    return homeActive() && homeEl.classList.contains('home--stack') && !mobileMenu.classList.contains('open');
  }

  let snapLockUntil = 0;
  function goSnap(dir) {
    const pos = snapPositions();
    const y = window.scrollY;
    let i = 0;
    pos.forEach((p, idx) => { if (p <= y + 8) i = idx; });
    let target;
    if (dir > 0) target = pos[i + 1];
    else target = y > pos[i] + 8 ? pos[i] : pos[i - 1];
    if (target === undefined) return;
    snapLockUntil = performance.now() + 800;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }

  window.addEventListener('wheel', (e) => {
    if (!snapActive() || e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY) || Math.abs(e.deltaY) < 2) return;
    e.preventDefault();
    const now = performance.now();
    if (now < snapLockUntil) {
      // la inercia del trackpad sigue mandando eventos: se espera a que termine
      snapLockUntil = Math.max(snapLockUntil, now + 120);
      return;
    }
    goSnap(e.deltaY > 0 ? 1 : -1);
  }, { passive: false });

  window.addEventListener('keydown', (e) => {
    if (!snapActive() || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.target.closest && e.target.closest('input, textarea, select, [contenteditable]')) return;
    const dir = (e.key === 'ArrowDown' || e.key === 'PageDown') ? 1 : (e.key === 'ArrowUp' || e.key === 'PageUp') ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    if (performance.now() >= snapLockUntil) goSnap(dir);
  });

  // Entrada escalonada: dentro de cada pantalla del recorrido, los elementos aparecen uno tras otro
  document.querySelectorAll('.home__hero, .home__panel').forEach(section => {
    section.querySelectorAll('.fade-up').forEach((el, i) => {
      el.style.transitionDelay = (Math.min(i, 8) * 90) + 'ms';
    });
  });

  // Parallax suave: la foto del inicio y los fondos con proyectos se mueven más lento que el scroll.
  // Usa la propiedad independiente translate (no transform) para no pisar otros efectos.
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const parallaxItems = [
      ...document.querySelectorAll('.home__photo img'),
      ...document.querySelectorAll('.home__panel-bg img'),
    ].map(img => ({
      img,
      section: img.closest('.home__hero, .home__panel'),
      speed: img.closest('.home__photo') ? 0.05 : 0.08,
      scale: img.closest('.home__photo') ? 1.12 : 1.2,
    }));

    // Posición de la sección en el flujo normal de la página (ignora el sticky del efecto de capas)
    function flowTop(section) {
      let y = homeEl.offsetTop;
      for (let s = section.previousElementSibling; s; s = s.previousElementSibling) y += s.offsetHeight;
      return y;
    }

    let parallaxQueued = false;
    function updateParallax() {
      parallaxQueued = false;
      if (!homeActive()) return;
      parallaxItems.forEach(item => {
        const max = Math.max(0, item.img.offsetHeight * (item.scale - 1) / 2 - 2);
        const y = Math.max(-max, Math.min(max, (window.scrollY - flowTop(item.section)) * item.speed));
        item.img.style.translate = '0 ' + y.toFixed(1) + 'px';
      });
    }
    window.addEventListener('scroll', () => {
      if (!parallaxQueued) {
        parallaxQueued = true;
        requestAnimationFrame(updateParallax);
      }
    }, { passive: true });
    window.addEventListener('resize', debounce(updateParallax, 150));
  }


  // CV: ES / EN solo elige en qué idioma se baja; el botón "Descargar CV" es el que descarga.
  // Por defecto queda elegido el idioma de la página (y vuelve a él si se cambia el idioma del sitio).
  const cvCard = document.querySelector('.home__cv');
  function setCvLang(lang) {
    if (!cvCard) return;
    const main = cvCard.querySelector('.home__cv-main');
    main.setAttribute('href', lang === 'en' ? main.dataset.hrefEn : main.dataset.hrefEs);
    cvCard.querySelectorAll('[data-cv-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cvLang === lang)));
    const hint = cvCard.querySelector('.home__cv-hint');
    hint.dataset.i18n = 'cv_hint_' + lang;
    if (window.MM_I18N) hint.textContent = window.MM_I18N.t(hint.dataset.i18n);
  }
  if (cvCard) {
    cvCard.querySelectorAll('[data-cv-lang]').forEach(b => b.addEventListener('click', () => setCvLang(b.dataset.cvLang)));
    setCvLang(window.MM_I18N ? window.MM_I18N.getLang() : 'es');
    if (window.MM_I18N) window.MM_I18N.onChange(lang => setCvLang(lang));
  }

})();
