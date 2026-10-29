  // Fade sections in as they scroll into view.
  (function () {
    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    items.forEach(function (el) { io.observe(el); });

    // Highlight the current section in the top bar.
    var links = {};
    document.querySelectorAll('.topbar nav a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && links[e.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove('active'); links[k].removeAttribute('aria-current'); });
          links[e.target.id].classList.add('active');
          links[e.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { spy.observe(s); });
  })();

  // Grid mesh whose nodes oscillate like a few standing-wave modes of a membrane.
  (function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var COLS = 44, ROWS = 26;

    function height(a, z, t) {
      return 0.60 * Math.sin(Math.PI * a) * Math.sin(Math.PI * z) * Math.cos(0.9 * t)
           + 0.35 * Math.sin(3 * Math.PI * a) * Math.sin(2 * Math.PI * z) * Math.cos(1.7 * t + 1)
           + 0.20 * Math.sin(5 * Math.PI * a) * Math.sin(3 * Math.PI * z) * Math.cos(2.6 * t);
    }

    function Mesh(canvas) {
      this.c = canvas;
      this.ctx = canvas.getContext('2d');
      this.hue = +canvas.getAttribute('data-hue') || 215;
      this.visible = false;
      this.pts = [];
      this.resize();
    }
    Mesh.prototype.resize = function () {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = this.c.clientWidth; this.h = this.c.clientHeight;
      this.c.width = Math.round(this.w * dpr); this.c.height = Math.round(this.h * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (var j = 0; j <= ROWS; j++) this.pts[j] = this.pts[j] || [];
    };
    Mesh.prototype.draw = function (t) {
      var ctx = this.ctx, w = this.w, h = this.h, hue = this.hue;
      var horizon = h * 0.22, bottom = h * 0.98, pts = this.pts, i, j;
      ctx.clearRect(0, 0, w, h);
      for (j = 0; j <= ROWS; j++) {
        var z = j / ROWS, s = 1 / (1 + 1.6 * z);            // simple perspective: far rows shrink
        var gy = horizon + (bottom - horizon) * (s - 0.38) / 0.62;
        for (i = 0; i <= COLS; i++) {
          var a = i / COLS, hv = height(a, z, t);
          var p = pts[j][i] || (pts[j][i] = {});
          p.x = w / 2 + (a - 0.5) * w * 1.25 * s;
          p.y = gy - hv * h * 0.16 * s;
          p.s = s; p.hv = hv;
        }
      }
      ctx.lineWidth = 1;
      // Bright lines on the dark theme, deeper ones on the light theme.
      var light = document.documentElement.getAttribute('data-theme') === 'light';
      function seg(p, q, self) {
        var m = (p.hv + q.hv) / 2, k = Math.min(1, Math.abs(m));
        var lum = light ? 42 - k * 14 : 52 + k * 28;
        var alpha = light ? 0.14 + 0.5 * p.s * (0.45 + k) : 0.10 + 0.55 * p.s * (0.45 + k);
        ctx.strokeStyle = 'hsla(' + (hue + m * 35) + ',85%,' + lum + '%,' + alpha + ')';
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      }
      for (j = 0; j <= ROWS; j++) for (i = 0; i < COLS; i++) seg(pts[j][i], pts[j][i + 1]);       // rows
      for (i = 0; i <= COLS; i++) for (j = 0; j < ROWS; j++) seg(pts[j][i], pts[j + 1][i]);       // columns
    };

    var meshes = [];
    document.querySelectorAll('canvas.mesh').forEach(function (c) { meshes.push(new Mesh(c)); });

    if (reduce || !('IntersectionObserver' in window)) {
      meshes.forEach(function (m) { m.draw(0.6); });
      var redraw = function () { meshes.forEach(function (m) { m.resize(); m.draw(0.6); }); };
      window.addEventListener('resize', redraw);
      window.addEventListener('themechange', redraw);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        meshes.forEach(function (m) { if (m.c === e.target) m.visible = e.isIntersecting; });
      });
    });
    meshes.forEach(function (m) { io.observe(m.c); });
    window.addEventListener('resize', function () { meshes.forEach(function (m) { m.resize(); }); });

    var t0 = performance.now();
    (function frame(now) {
      var t = (now - t0) / 1000 * 0.8;
      meshes.forEach(function (m) { if (m.visible) m.draw(t); });
      requestAnimationFrame(frame);
    })(t0);
  })();
