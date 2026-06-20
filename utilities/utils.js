/* Utilidades globales compartidas entre módulos.

/**
 * Debounce: limita la frecuencia de ejecución de una función.
 * Útil para eventos como resize o input.
 *
 * @param {Function} fn    - Función a ejecutar
 * @param {number}   delay - Tiempo de espera en milisegundos
 * @returns {Function}
 */
function debounce(fn, delay = 200) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Throttle: ejecuta una función como máximo una vez cada N ms.
 * Útil para eventos continuos como scroll.
 *
 * @param {Function} fn    - Función a ejecutar
 * @param {number}   limit - Intervalo mínimo en milisegundos
 * @returns {Function}
 */
function throttle(fn, limit = 100) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}

/**
 * Detecta si el dispositivo es táctil (sin hover nativo).
 *
 * @returns {boolean}
 */
function isTouchDevice() {
  return window.matchMedia('(hover: none)').matches;
}

/**
 * Formatea la cantidad de proyectos con texto en español.
 *
 * @param {number} n - Cantidad de proyectos
 * @returns {string}
 */
function formatCount(n) {
  if (n === 0) return 'Sin proyectos';
  if (n === 1) return '1 proyecto';
  return `${n} proyectos`;
}

/**
 * Retorna el año actual para usar en el footer u otros textos.
 *
 * @returns {number}
 */
function currentYear() {
  return new Date().getFullYear();
}
