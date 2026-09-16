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
        var dots = document.querySelector('[data-testid="hero-dots"]');
        var heroEl = document.querySelector('[data-testid="hero-section"]');
        var words = [];
        var line = headline.querySelector('.h1-anim');

        if (line) {
            var htext = line.textContent.trim();
            line.textContent = '';
            htext.split(/\s+/).forEach(function (w, i, arr) {
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

        // Pin the hero for 30vh of scroll while the wipe completes, then release.
        function pinDistance() {
            return Math.round(window.innerHeight * 0.3);
        }
        var lastTrackH = null;
        function sizeTrack() {
            if (!heroEl) {
                return;
            }
            var h = window.innerWidth < 768 ? null : heroEl.offsetHeight + pinDistance();
            if (h === lastTrackH) {
                return;
            }
            lastTrackH = h;
            if (h === null) {
                track.style.height = '';
                track.style.marginBottom = '';
            } else {
                track.style.height = h + 'px';
                track.style.marginBottom = (-pinDistance()) + 'px';
            }
        }

        var ticking = false;
        function paint() {
            ticking = false;
            sizeTrack();
            if (window.innerWidth < 768) {
                if (dots) {
                    dots.style.opacity = '';
                }
                if (heroEl) {
                    heroEl.style.backgroundColor = '';
                    heroEl.style.removeProperty('--hero-blend-top');
                }
                words.forEach(function (el) { el.style.color = ''; });
                return;
            }
            var p = Math.min(Math.max(window.scrollY / Math.max(pinDistance(), 1), 0), 1);
            var dp = p * p * (3 - 2 * p);
            if (dots) {
                dots.style.opacity = dp;
            }
            if (heroEl) {
                var bg = 'rgb(' + lerp(239, 255, dp) + ',' +
                    lerp(239, 255, dp) + ',' +
                    lerp(241, 255, dp) + ')';
                heroEl.style.backgroundColor = bg;
                heroEl.style.setProperty('--hero-blend-top', bg);
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
    var fadeZone = document.querySelector('[data-testid="fade-zone"]');
    var whereEl = document.querySelector('[data-testid="section-where-to-buy"]');
    var quoteEl = document.querySelector('[data-testid="section-quote"]');

    if (fadeZone && whereEl && quoteEl && !reducedMotion) {
        var ZONE_GREY = [239, 239, 241];
        function lerp3(a, b, t) {
            return Math.round(a + (b - a) * t);
        }
        function smooth(x) {
            return x * x * (3 - 2 * x);
        }
        var fTicking = false;
        function paintZone() {
            fTicking = false;
            var vh = window.innerHeight;
            var rw = whereEl.getBoundingClientRect();
            var pIn = Math.min(Math.max((vh * 0.95 - rw.top) / (vh * 0.6), 0), 1);
            var rq = quoteEl.getBoundingClientRect();
            var pOut = Math.min(Math.max((vh - rq.top - rq.height * 0.5) / (rq.height * 0.45), 0), 1);
            var w = smooth(pIn) * (1 - smooth(pOut));
            fadeZone.style.backgroundColor =
                'rgb(' + lerp3(ZONE_GREY[0], 255, w) + ',' +
                lerp3(ZONE_GREY[1], 255, w) + ',' +
                lerp3(ZONE_GREY[2], 255, w) + ')';
        }
        function onZoneScroll() {
            if (!fTicking) {
                fTicking = true;
                requestAnimationFrame(paintZone);
            }
        }
        window.addEventListener('scroll', onZoneScroll, { passive: true });
        window.addEventListener('resize', paintZone);
        window.addEventListener('load', paintZone);
        paintZone();
    }

    var customCard = document.querySelector('[data-testid="product-custom"]');
    var customZone = document.querySelector('[data-testid="custom-card-wrap"]');

    if (customCard && customZone && !reducedMotion) {
        var plusMarks = customCard.querySelectorAll('.plus');
        function paintCustom() {
            xTicking = false;
            if (window.innerWidth <= 860) {
                customCard.style.width = '';
                customCard.style.marginLeft = '';
                customCard.style.borderColor = '';
                customCard.style.boxShadow = '';
                plusMarks.forEach(function (m) { m.style.opacity = ''; });
                return;
            }
            var vh = window.innerHeight;
            var r = customZone.getBoundingClientRect();
            var p = Math.min(Math.max((170 - r.top) / (vh * 0.6), 0), 1);
            var e = p * p * (3 - 2 * p);
            var contW = customZone.clientWidth;
            var vw = window.innerWidth;
            customCard.style.width = Math.round(contW + (vw - contW) * e) + 'px';
            customCard.style.marginLeft = Math.round(-(vw - contW) / 2 * e) + 'px';
            customCard.style.borderColor = 'rgba(226,227,232,' + (1 - e) + ')';
            customCard.style.boxShadow = '0 -18px 40px rgba(0,0,0,' + (0.12 * (1 - e)) + ')';
            plusMarks.forEach(function (m) { m.style.opacity = 1 - e; });
        }
        var xTicking = false;
        function onCustomScroll() {
            if (!xTicking) {
                xTicking = true;
                requestAnimationFrame(paintCustom);
            }
        }
        window.addEventListener('scroll', onCustomScroll, { passive: true });
        window.addEventListener('resize', onCustomScroll);
        window.addEventListener('load', paintCustom);
        paintCustom();
    }
})();
