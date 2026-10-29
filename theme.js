/*
 * Shared light/dark theme for every page.
 *
 * - Include it in <head> (no async/defer) so the theme is set before first paint.
 * - It always sets data-theme="light" or "dark" on <html>: the saved choice
 *   (localStorage key "theme"), or else the system preference.
 * - Any element with the attribute data-theme-switch is filled with the
 *   sun/moon switch (styles live in theme.css).
 * - Pages react to changes through the "themechange" event on window.
 */
(function () {
  var KEY = 'theme';
  var root = document.documentElement;
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function saved() {
    try {
      var t = localStorage.getItem(KEY);
      return t === 'light' || t === 'dark' ? t : null;
    } catch (e) { return null; }
  }
  function effective() { return saved() || (mq && mq.matches ? 'dark' : 'light'); }
  function isDark() { return root.getAttribute('data-theme') === 'dark'; }

  function sync() {
    var switches = document.querySelectorAll('.switch');
    for (var i = 0; i < switches.length; i++) switches[i].setAttribute('aria-checked', String(isDark()));
  }
  function apply() {
    var next = effective();
    if (root.getAttribute('data-theme') !== next) {
      root.setAttribute('data-theme', next);
      window.dispatchEvent(new Event('themechange'));
    }
    sync();
  }

  apply();  // runs while <head> is parsed, before first paint

  // Follow the system until the visitor picks a theme.
  if (mq) {
    var onSystem = function () { if (!saved()) apply(); };
    if (mq.addEventListener) mq.addEventListener('change', onSystem); else if (mq.addListener) mq.addListener(onSystem);
  }
  // Keep other open tabs and pages in step.
  window.addEventListener('storage', function (e) { if (e.key === KEY) apply(); });

  var SVG_SUN = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  var SVG_MOON = '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';
  function icon(cls, w, body) {
    return '<svg class="' + cls + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + w +
      '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
  }
  var MARKUP =
    '<button type="button" class="switch" role="switch" aria-checked="false" aria-label="Dark mode">' +
      icon('bg-icon bg-sun', 2, SVG_SUN) + icon('bg-icon bg-moon', 2, SVG_MOON) +
      '<span class="knob" aria-hidden="true">' + icon('sun', 2.4, SVG_SUN) + icon('moon', 2.4, SVG_MOON) + '</span>' +
    '</button>';

  function mount() {
    var slots = document.querySelectorAll('[data-theme-switch]');
    for (var i = 0; i < slots.length; i++) {
      slots[i].innerHTML = MARKUP;
      slots[i].firstChild.addEventListener('click', function () {
        var next = isDark() ? 'light' : 'dark';
        try { localStorage.setItem(KEY, next); } catch (e) {}
        apply();
      });
    }
    sync();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
