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

  // Navegacion

  function updateNavState(activeNavId) {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.page === activeNavId);
    });
    mobileLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.page === activeNavId);
    });
  }

  function switchPage(targetId, activeNavId) {
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
      window.scrollTo({ top: 0, behavior: 'instant' });
      closeMobileMenu();
    };

    if (current && current !== target) {
      current.classList.add('page-leave');
      setTimeout(finishSwitch, PAGE_TRANSITION_MS);
    } else {
      finishSwitch();
    }

    history.replaceState(null, null, '#' + (targetId === 'proyecto-detalle' ? location.hash.replace('#', '') : targetId));
  }

  // Router: home, proyectos, o proyecto/{slug}
  function route() {
    const hash = window.location.hash.replace('#', '');

    if (hash.startsWith('proyecto/')) {
      const slug = decodeURIComponent(hash.slice('proyecto/'.length));
      const ok = typeof window.renderProjectDetail === 'function' && window.renderProjectDetail(slug);
      if (ok) {
        switchPage('proyecto-detalle', 'proyectos');
        return;
      }
      location.hash = '#proyectos';
      return;
    }

    if (hash && document.getElementById(hash)) {
      switchPage(hash);
    } else {
      switchPage('home');
    }
  }

  window.addEventListener('hashchange', route);

  // Click en el logo/marca: siempre vuelve al inicio
  if (navBrand) {
    navBrand.addEventListener('click', (e) => {
      e.preventDefault();
      location.hash = '#home';
    });
  }

  // Clicks de navlinks
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      location.hash = '#' + link.dataset.page;
    });
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      location.hash = '#' + link.dataset.page;
    });
  });

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

  function observeAnimations() {
    document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
      observer.observe(el);
    });
  }

  // Inicio
  document.addEventListener('DOMContentLoaded', () => {
    route();
    applyFilter('all');
    observeAnimations();
  });

  // Re-observar elementos fade-up que aparecen al renderizar la página de detalle
  const bodyObserver = new MutationObserver(() => observeAnimations());
  bodyObserver.observe(document.body, { childList: true, subtree: true });

})();
