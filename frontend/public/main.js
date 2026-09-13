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

    document.querySelectorAll('.product-card').forEach(function (card) {
        if (card.dataset.testid && !card.id) {
            card.id = card.dataset.testid;
        }
    });

    var year = document.getElementById('footer-year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    var headline = document.querySelector('[data-testid="hero-tagline"]');
    var track = document.querySelector('[data-testid="hero-track"]');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (headline && track && !reducedMotion) {
        var GREY = [217, 217, 217];
        var RED = [224, 8, 3];
        var line = headline.querySelector('.tagline-red');
        var dots = document.querySelector('[data-testid="hero-dots"]');
        var heroEl = document.querySelector('[data-testid="hero-section"]');
        if (dots) {
            dots.style.opacity = '0';
        }
        if (heroEl) {
            heroEl.style.backgroundColor = 'rgb(239,239,241)';
        }
        var words = [];

        if (line) {
            var text = line.textContent.trim();
            line.textContent = '';
            text.split(/\s+/).forEach(function (w, i, arr) {
                var span = document.createElement('span');
                span.className = 'word';
                span.textContent = w;
                words.push(span);
                line.appendChild(span);
                if (i < arr.length - 1) {
                    line.appendChild(document.createTextNode(' '));
                }
            });
        }

        function lerp(a, b, t) {
            return Math.round(a + (b - a) * t);
        }

        var ticking = false;
        function paint() {
            ticking = false;
            var scrollable = Math.max(track.offsetHeight - window.innerHeight, 1);
            var p = Math.min(Math.max(window.scrollY / (scrollable * 0.5), 0), 1);
            var dp = p * p * (3 - 2 * p);
            if (dots) {
                dots.style.opacity = dp;
            }
            if (heroEl) {
                heroEl.style.backgroundColor =
                    'rgb(' + lerp(239, 255, dp) + ',' +
                    lerp(239, 255, dp) + ',' +
                    lerp(241, 255, dp) + ')';
            }
            words.forEach(function (el, i) {
                var t = Math.min(Math.max(p * words.length - i, 0), 1);
                var e = t * t * (3 - 2 * t);
                el.style.color =
                    'rgb(' + lerp(GREY[0], RED[0], e) + ',' +
                    lerp(GREY[1], RED[1], e) + ',' +
                    lerp(GREY[2], RED[2], e) + ')';
            });
        }
        function onScroll() {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(paint);
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', paint);
        window.addEventListener('load', paint);
        paint();
    }
    var productsIntro = document.querySelector('[data-testid="products-intro"]');

    if (productsIntro && !reducedMotion) {
        var INTRO_GREY = [217, 217, 217];
        var INK = [23, 24, 28];
        var introWords = [];
        var itext = productsIntro.textContent.trim();
        productsIntro.textContent = '';
        itext.split(/\s+/).forEach(function (w, i, arr) {
            var span = document.createElement('span');
            span.className = 'word';
            span.textContent = w;
            introWords.push(span);
            productsIntro.appendChild(span);
            if (i < arr.length - 1) {
                productsIntro.appendChild(document.createTextNode(' '));
            }
        });

        function lerp2(a, b, t) {
            return Math.round(a + (b - a) * t);
        }

        var iTicking = false;
        function paintIntro() {
            iTicking = false;
            var r = productsIntro.getBoundingClientRect();
            var vh = window.innerHeight;
            var p = Math.min(Math.max((vh * 0.85 - r.top) / (vh * 0.35), 0), 1);
            introWords.forEach(function (el, i) {
                var t = Math.min(Math.max(p * introWords.length - i, 0), 1);
                var e = t * t * (3 - 2 * t);
                el.style.color =
                    'rgb(' + lerp2(INTRO_GREY[0], INK[0], e) + ',' +
                    lerp2(INTRO_GREY[1], INK[1], e) + ',' +
                    lerp2(INTRO_GREY[2], INK[2], e) + ')';
            });
        }
        function onIntroScroll() {
            if (!iTicking) {
                iTicking = true;
                requestAnimationFrame(paintIntro);
            }
        }
        window.addEventListener('scroll', onIntroScroll, { passive: true });
        window.addEventListener('resize', paintIntro);
        window.addEventListener('load', paintIntro);
        paintIntro();
    }
    var customCard = document.querySelector('[data-testid="product-custom"]');

    if (customCard && !reducedMotion) {
        var xTicking = false;
        function paintCustom() {
            xTicking = false;
            var r = customCard.getBoundingClientRect();
            var vh = window.innerHeight;
            var p = Math.min(Math.max((vh * 0.9 - r.top) / (vh * 0.45), 0), 1);
            var e = p * p * (3 - 2 * p);
            customCard.style.transform = 'translateX(' + ((1 - e) * 35) + '%)';
        }
        function onCustomScroll() {
            if (!xTicking) {
                xTicking = true;
                requestAnimationFrame(paintCustom);
            }
        }
        window.addEventListener('scroll', onCustomScroll, { passive: true });
        window.addEventListener('resize', paintCustom);
        window.addEventListener('load', paintCustom);
        paintCustom();
    }
})();
