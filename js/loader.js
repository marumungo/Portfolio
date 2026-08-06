// Pantalla de carga inicial con el logo

(function () {
  'use strict';

  const loader = document.getElementById('loader');
  const fill = document.getElementById('loaderFill');
  if (!loader) return;

  // Ya se mostró una vez en esta pestaña/sesión: no repetir la animación completa
  if (sessionStorage.getItem('mm-loaded')) {
    loader.remove();
    return;
  }

  document.documentElement.classList.add('is-loading');

  let progress = 0;
  const tick = setInterval(() => {
    progress = Math.min(progress + Math.random() * 18, 90);
    if (fill) fill.style.width = progress + '%';
  }, 120);

  let done = false;
  function finish() {
    if (done) return;
    done = true;
    clearInterval(tick);
    if (fill) fill.style.width = '100%';
    sessionStorage.setItem('mm-loaded', '1');
    setTimeout(() => {
      loader.classList.add('loader--done');
      document.documentElement.classList.remove('is-loading');
      setTimeout(() => loader.remove(), 700);
    }, 250);
  }

  // Se sostiene un par de segundos para que el logo se alcance a ver bien
  const MIN_DISPLAY_MS = 2000;
  if (document.readyState === 'complete') {
    setTimeout(finish, MIN_DISPLAY_MS);
  } else {
    window.addEventListener('load', () => setTimeout(finish, MIN_DISPLAY_MS));
  }
  // Fallback: nunca dejar al usuario esperando de más
  setTimeout(finish, MIN_DISPLAY_MS + 1200);
})();
