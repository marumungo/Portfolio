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
  const cards         = document.querySelectorAll('.card');
  const countEl       = document.querySelector('.projects__count');
  const emptyState    = document.querySelector('.projects__empty');

  // Navegacion

  function switchPage(targetId) {
    sections.forEach(s => {
      s.classList.remove('active', 'page-enter');
    });

    const target = document.getElementById(targetId);
    if (target) {
      target.classList.add('active');
      // Trigger reflow para animacion
      void target.offsetWidth;
      target.classList.add('page-enter');
    }

    // Estado active page
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.page === targetId);
    });
    mobileLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.page === targetId);
    });

    // Escrolear hasta arriba
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Cerrar menu movil
    closeMobileMenu();

    // Actualizar URL hash sin escrolear
    history.replaceState(null, null, '#' + targetId);
  }

  // Click en el logo/marca: siempre vuelve al inicio
  if (navBrand) {
    navBrand.addEventListener('click', (e) => {
      e.preventDefault();
      switchPage('home');
    });
  }

  // Clicks de navlinks
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      switchPage(link.dataset.page);
    });
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      switchPage(link.dataset.page);
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

  // URL hash durante carga
  function handleInitialHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
      switchPage(hash);
    } else {
      switchPage('home');
    }
  }

  // Filtros de proyectos
  let currentFilter = 'all';

  function applyFilter(filter) {
    currentFilter = filter;
    let visible = 0;

    cards.forEach(card => {
      const category = card.dataset.category;
      const show = filter === 'all' || category === filter;
      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });

    // Actualizar la cuenta
    if (countEl) {
      countEl.textContent = visible === 1
        ? '1 proyecto'
        : `${visible} proyectos`;
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
    handleInitialHash();
    applyFilter('all');
    observeAnimations();

    // Animacion loading bar
    const bar = document.querySelector('.loading-bar');
    if (bar) {
      bar.style.width = '60%';
      setTimeout(() => {
        bar.style.width = '100%';
        setTimeout(() => bar.classList.add('done'), 300);
      }, 200);
    }
  });

})();
