// Cursor personalizado (desktop / puntero fino únicamente)

(function () {
  'use strict';

  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.getElementById('cursorDot');
  if (!dot) return;

  document.documentElement.classList.add('has-custom-cursor');

  let mouseX = -100, mouseY = -100;
  let started = false;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    if (!started) {
      started = true;
      document.documentElement.classList.add('cursor-active');
    }
  });

  document.addEventListener('mouseleave', () => {
    document.documentElement.classList.remove('cursor-active');
  });
  document.addEventListener('mouseenter', () => {
    if (started) document.documentElement.classList.add('cursor-active');
  });

  // Evita el "fantasma" de arrastre nativo del navegador al re-arrastrar un texto
  // ya seleccionado, que aparece pegado al cursor y tapa al cursor personalizado.
  document.addEventListener('dragstart', e => e.preventDefault());

  const HOVER_SELECTOR = 'a, button, .card, input, textarea, select, [role="button"]';
  const LIGHT_SELECTOR = '.site-footer, .card, .featured-card';

  document.addEventListener('mouseover', e => {
    if (e.target.closest && e.target.closest(HOVER_SELECTOR)) {
      document.documentElement.classList.add('cursor-hover');
    }
    if (e.target.closest && e.target.closest(LIGHT_SELECTOR)) {
      document.documentElement.classList.add('cursor-light');
    }
  });
  document.addEventListener('mouseout', e => {
    const toEl = e.relatedTarget;
    const stillHovering = toEl && toEl.closest && toEl.closest(HOVER_SELECTOR);
    if (!stillHovering) {
      document.documentElement.classList.remove('cursor-hover');
    }
    const stillLight = toEl && toEl.closest && toEl.closest(LIGHT_SELECTOR);
    if (!stillLight) {
      document.documentElement.classList.remove('cursor-light');
    }
  });
})();
