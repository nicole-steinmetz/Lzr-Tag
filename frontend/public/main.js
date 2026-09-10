(function () {
    var toggle = document.querySelector('[data-testid="nav-toggle"]');
    var menu = document.querySelector('[data-testid="mobile-menu"]');

    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            var open = menu.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menu.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    var year = document.getElementById('footer-year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    var headline = document.querySelector('[data-testid="hero-tagline"]');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (headline && !reducedMotion) {
        var GREY = [217, 217, 217];
        var words = [];

        headline.querySelectorAll('.line').forEach(function (line) {
            var target = line.classList.contains('tagline-red') ? [224, 10, 2] : [23, 24, 28];
            var text = line.textContent.trim();
            line.textContent = '';
            text.split(/\s+/).forEach(function (w, i, arr) {
                var span = document.createElement('span');
                span.className = 'word';
                span.textContent = w;
                words.push({ el: span, target: target });
                line.appendChild(span);
                if (i < arr.length - 1) {
                    line.appendChild(document.createTextNode(' '));
                }
            });
        });

        var hero = document.querySelector('[data-testid="hero-section"]');
        var limit = 1;
        function measure() {
            limit = Math.max(hero.offsetHeight - 120, 1);
        }
        measure();
        window.addEventListener('resize', measure);

        function lerp(a, b, t) {
            return Math.round(a + (b - a) * t);
        }

        var ticking = false;
        function paint() {
            ticking = false;
            var p = 1 - Math.min(Math.max(window.scrollY / limit, 0), 1);
            words.forEach(function (w, i) {
                var t = Math.min(Math.max(p * 1.4 - i * 0.1, 0), 1);
                var e = t * t * (3 - 2 * t);
                w.el.style.color =
                    'rgb(' + lerp(GREY[0], w.target[0], e) + ',' +
                    lerp(GREY[1], w.target[1], e) + ',' +
                    lerp(GREY[2], w.target[2], e) + ')';
            });
        }
        function onScroll() {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(paint);
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        paint();
    }
})();
