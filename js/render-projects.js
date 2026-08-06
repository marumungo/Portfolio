// Renderiza cards + página de detalle + lightbox a partir de js/projects-data.js

(function () {
  'use strict';

  function lang() { return window.MM_I18N ? window.MM_I18N.getLang() : 'es'; }
  function t(key) { return window.MM_I18N ? window.MM_I18N.t(key) : key; }

  // Campo de un proyecto según el idioma activo: usa project.en[key] si existe y estamos en inglés.
  function pf(project, key) {
    if (lang() === 'en' && project.en && project.en[key] !== undefined) return project.en[key];
    return project[key];
  }

  function categoryLabel(category) {
    return t(category === 'urbano' ? 'filter_urbano' : category === 'residencial' ? 'filter_residencial' : 'filter_institucional');
  }

  const CATEGORY_ICON = {
    urbano: '<rect x="2" y="10" width="6" height="12"/><rect x="9" y="6" width="6" height="16"/><rect x="16" y="3" width="6" height="19"/><line x1="2" y1="22" x2="22" y2="22"/>',
    institucional: '<rect x="3" y="10" width="18" height="12"/><path d="M3 10L12 3l9 7"/><line x1="8" y1="22" x2="8" y2="15"/><line x1="16" y1="22" x2="16" y2="15"/><rect x="10" y="15" width="4" height="7"/>',
    residencial: '<path d="M3 12L12 4l9 8"/><path d="M5 10v10h4v-6h6v6h4V10"/>',
  };

  const META_ICON = {
    location: '<path d="M12 21s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    year: '<rect x="3" y="5" width="18" height="16" rx="1"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    surface: '<path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5"/>',
    role: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M13 3.5V9h5.5M8 13h8M8 17h5"/>',
  };

  function galleryPaths(project) {
    const paths = [];
    for (let i = 1; i <= project.galleryCount; i++) {
      const num = String(i).padStart(2, '0');
      paths.push({
        display: `images/projects/${project.slug}/gallery/${num}.webp`,
        xl: `images/projects/${project.slug}/gallery/${num}_xl.webp`,
      });
    }
    return paths;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
  }

  // ---------- CARDS ----------

  function renderCards() {
    const grid = document.querySelector('.projects__grid');
    if (!grid || typeof projects === 'undefined') return;

    grid.innerHTML = projects.map((p, i) => `
      <article class="card card--${p.category} fade-up" data-category="${p.category}" data-slug="${p.slug}" role="listitem" style="transition-delay:${(i % 6) * 70}ms">
        <div class="card__image-wrap">
          <img class="card__image" src="${p.image}" alt="${escapeHtml(pf(p, 'imageAlt'))}" loading="lazy">
          <div class="card__overlay">
            <span class="overlay-btn">${t('overlay_view_project')}</span>
          </div>
        </div>
        <div class="card__body">
          <p class="card__number">${String(p.id).padStart(2, '0')}</p>
          <h3 class="card__title"><span class="card__title-accent">${escapeHtml(pf(p, 'titleAccent'))}</span> -<br>${escapeHtml(pf(p, 'titleRest'))}</h3>
          <div class="card__tags"><span class="card__tag">${escapeHtml(pf(p, 'role'))}</span></div>
          <p class="card__desc">${escapeHtml(pf(p, 'description_short'))}</p>
        </div>
      </article>
    `).join('');

    grid.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        location.hash = `#proyecto/${card.dataset.slug}`;
      });
    });
  }

  // ---------- HOME: PROYECTOS DESTACADOS (cinta infinita con flechas) ----------

  let featuredScroller = null; // { raf, paused, oneSetWidth }

  function renderFeatured() {
    const track = document.querySelector('.home__featured-track');
    if (!track || typeof projects === 'undefined') return;

    // Se listan todos los proyectos, duplicados para el loop infinito
    const list = projects.concat(projects);

    track.innerHTML = list.map((p, i) => `
      <article class="featured-card fade-up" data-slug="${p.slug}" style="transition-delay:${(i % projects.length) * 40}ms">
        <div class="featured-card__image-wrap">
          <img class="featured-card__image" src="${p.image}" alt="${escapeHtml(pf(p, 'imageAlt'))}" loading="lazy">
          <span class="featured-card__category">${categoryLabel(p.category)}</span>
        </div>
        <p class="featured-card__title">${escapeHtml(pf(p, 'titleAccent'))}</p>
        <p class="featured-card__place">${escapeHtml(pf(p, 'titleRest'))}</p>
      </article>
    `).join('');

    track.querySelectorAll('.featured-card').forEach(card => {
      card.addEventListener('click', () => {
        location.hash = `#proyecto/${card.dataset.slug}`;
      });
    });

    setupFeaturedScroller(track);
  }

  function setupFeaturedScroller(track) {
    if (featuredScroller) cancelAnimationFrame(featuredScroller.raf);

    const viewport = document.querySelector('.home__featured-viewport');
    const prevBtn = document.querySelector('.home__featured-arrow--prev');
    const nextBtn = document.querySelector('.home__featured-arrow--next');
    if (!viewport) return;

    // Ancho de un set completo (la mitad, ya que la lista está duplicada)
    const oneSetWidth = track.scrollWidth / 2;
    track.scrollLeft = 1; // arranca ya "en movimiento" para evitar el borde inicial

    const state = { paused: false, resumeTimeout: null, boost: 0 };
    featuredScroller = state;

    const SPEED = 0.5; // px por frame en modo automático (~30px/s a 60fps)

    // Un único loop controla tanto el auto-scroll como el desplazamiento manual
    // de las flechas, para que nunca compitan por escribir scrollLeft a la vez.
    function tick() {
      if (state.boost !== 0) {
        const step = state.boost * 0.18; // easing: se acerca al objetivo cada frame
        track.scrollLeft += step;
        state.boost -= step;
        if (Math.abs(state.boost) < 0.5) state.boost = 0;
      } else if (!state.paused) {
        track.scrollLeft += SPEED;
      }
      if (track.scrollLeft >= oneSetWidth) track.scrollLeft -= oneSetWidth;
      if (track.scrollLeft < 0) track.scrollLeft += oneSetWidth;
      state.raf = requestAnimationFrame(tick);
    }
    state.raf = requestAnimationFrame(tick);

    viewport.addEventListener('mouseenter', () => { state.paused = true; });
    viewport.addEventListener('mouseleave', () => { state.paused = false; });

    function manualScroll(dir) {
      const cardStep = 220 + 24; // ancho de card + gap
      state.boost += dir * cardStep * 2;
      clearTimeout(state.resumeTimeout);
      state.paused = true;
      state.resumeTimeout = setTimeout(() => { state.paused = false; }, 2500);
    }

    if (prevBtn) prevBtn.onclick = () => manualScroll(-1);
    if (nextBtn) nextBtn.onclick = () => manualScroll(1);
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-nav="proyectos"]');
    if (btn) location.hash = '#proyectos';
  });

  // ---------- DETALLE DE PROYECTO ----------

  function metaItem(key, label, value) {
    if (!value) return '';
    return `
      <div class="meta-item">
        <span class="meta-item__icon"><svg viewBox="0 0 24 24">${META_ICON[key]}</svg></span>
        <span class="meta-item__text">
          <span class="meta-item__label">${label}</span>
          <span class="meta-item__value">${escapeHtml(value)}</span>
        </span>
      </div>`;
  }

  function renderProjectDetail(slug) {
    const body = document.getElementById('proyectoDetalleBody');
    if (!body || typeof projects === 'undefined') return false;

    const index = projects.findIndex(p => p.slug === slug);
    if (index === -1) return false;

    const project = projects[index];
    const prev = projects[(index - 1 + projects.length) % projects.length];
    const next = projects[(index + 1) % projects.length];
    const gallery = galleryPaths(project);
    const heroIdx = Math.max(0, (project.heroIndex || 1) - 1);
    // heroImage: foto exclusiva para el hero que no forma parte de la galería numerada de abajo.
    const cover = project.heroImage || (gallery.length ? (gallery[heroIdx] || gallery[0]).display : project.image);

    const descriptionHtml = project.descriptionPending
      ? `<p class="proyecto-detalle__pending">${t('description_pending')}</p>`
      : pf(project, 'description').map(p => `<p>${escapeHtml(p)}</p>`).join('');

    body.innerHTML = `
      <button class="proyecto-detalle__back" type="button" data-nav-home="proyectos">${t('detail_back')}</button>

      <div class="proyecto-detalle__hero fade-in">
        <img src="${cover}" alt="${escapeHtml(pf(project, 'imageAlt'))}">
      </div>

      <div class="proyecto-detalle__content fade-up">
        <p class="proyecto-detalle__eyebrow">
          <span class="filter-icon"><svg viewBox="0 0 24 24">${CATEGORY_ICON[project.category]}</svg></span>
          ${categoryLabel(project.category)} &nbsp;|&nbsp; ${escapeHtml(project.year)}
        </p>
        <h1 class="proyecto-detalle__title">${escapeHtml(pf(project, 'titleAccent'))}<br><span>${escapeHtml(pf(project, 'titleRest'))}</span></h1>

        <blockquote class="proyecto-detalle__quote"><p>&ldquo;${escapeHtml(pf(project, 'quote'))}&rdquo;</p></blockquote>

        <div class="proyecto-detalle__meta">
          ${metaItem('location', t('meta_location'), pf(project, 'location'))}
          ${metaItem('year', t('meta_year'), project.year)}
          ${metaItem('surface', t('meta_surface'), project.surface)}
          ${metaItem('role', project.academic ? t('meta_type') : t('meta_role'), pf(project, 'role'))}
        </div>

        <div class="proyecto-detalle__description">
          ${descriptionHtml}
        </div>

        <a class="proyecto-detalle__behance" href="${project.behanceUrl}" target="_blank" rel="noopener">${t('detail_behance')}</a>
      </div>

      ${gallery.length ? `
      <div class="proyecto-detalle__gallery">
        ${gallery.map((g, i) => `
          <button class="gallery-item fade-up" type="button" data-index="${i}" style="transition-delay:${(i % 6) * 60}ms" aria-label="Ampliar imagen ${i + 1} de ${gallery.length}">
            <img src="${g.display}" alt="${escapeHtml(pf(project, 'title'))} - imagen ${i + 1}" loading="lazy">
          </button>
        `).join('')}
      </div>` : ''}

      <div class="proyecto-detalle__pager">
        <button class="pager-btn pager-btn--prev" type="button" data-nav-project="${prev.slug}">
          <span class="pager-btn__label">${t('pager_prev_label')}</span>
          <span class="pager-btn__title">${escapeHtml(pf(prev, 'title'))}</span>
        </button>
        <button class="pager-btn pager-btn--next" type="button" data-nav-project="${next.slug}">
          <span class="pager-btn__label">${t('pager_next_label')}</span>
          <span class="pager-btn__title">${escapeHtml(pf(next, 'title'))}</span>
        </button>
      </div>
    `;

    body.querySelector('[data-nav-home]').addEventListener('click', () => { location.hash = '#proyectos'; });
    body.querySelectorAll('[data-nav-project]').forEach(btn => {
      btn.addEventListener('click', () => { location.hash = `#proyecto/${btn.dataset.navProject}`; });
    });
    body.querySelectorAll('.gallery-item').forEach(btn => {
      btn.addEventListener('click', () => openLightbox(project, gallery, Number(btn.dataset.index)));
    });

    return true;
  }

  // ---------- LIGHTBOX ----------

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCount = document.getElementById('lightboxCount');
  let lbState = null; // { gallery, index, projectTitle }

  function showLightboxImage() {
    if (!lbState) return;
    const { gallery, index, projectTitle } = lbState;
    lightboxImage.src = gallery[index].xl;
    lightboxImage.alt = `${projectTitle} - imagen ${index + 1}`;
    lightboxCount.textContent = `${index + 1} / ${gallery.length}`;
  }

  function openLightbox(project, gallery, index) {
    lbState = { gallery, index, projectTitle: pf(project, 'title') };
    showLightboxImage();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.documentElement.classList.add('lightbox-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.documentElement.classList.remove('lightbox-open');
    lbState = null;
  }

  function navLightbox(delta) {
    if (!lbState) return;
    const len = lbState.gallery.length;
    lbState.index = (lbState.index + delta + len) % len;
    showLightboxImage();
  }

  if (lightbox) {
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', () => navLightbox(-1));
    document.getElementById('lightboxNext').addEventListener('click', () => navLightbox(1));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => {
      if (!lbState) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navLightbox(-1);
      if (e.key === 'ArrowRight') navLightbox(1);
    });
  }

  // Render inicial de cards (el DOM ya existe: los scripts están al final del body)
  renderCards();
  renderFeatured();

  // Exponer lo necesario para main.js (router)
  window.renderProjectDetail = renderProjectDetail;
  window.renderCards = renderCards;

  // Al cambiar de idioma: re-renderizar cards y, si está abierta, la página de detalle activa
  if (window.MM_I18N) {
    window.MM_I18N.onChange(() => {
      renderCards();
      renderFeatured();
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('proyecto/')) {
        renderProjectDetail(hash.slice('proyecto/'.length));
      }
      if (typeof window.mmReapplyFilter === 'function') window.mmReapplyFilter();
    });
  }
})();
