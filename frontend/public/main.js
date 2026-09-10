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
})();
