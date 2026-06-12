// Animações da Home: reveal de cards com IntersectionObserver e mutation observer para itens dinâmicos
(function () {
    function reveal(el) {
        el.classList.remove('opacity-0', 'translate-y-6');
        el.classList.add('opacity-100', 'translate-y-0', 'transition', 'duration-700', 'ease-out');
    }

    function hide(el) {
        el.classList.add('opacity-0', 'translate-y-6');
        el.classList.remove('opacity-100', 'translate-y-0');
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) reveal(e.target);
        });
    }, { threshold: 0.12 });

    function observeNode(n) {
        if (!n) return;
        // aplicar estado inicial
        hide(n);
        io.observe(n);
    }

    // observar elementos inseridos dinamicamente na grade
    const grid = document.getElementById('home-articles-grid');
    if (grid) {
        // observe existing children when they arrive
        const startObserve = () => {
            grid.querySelectorAll('article').forEach((a, i) => {
                // stagger slightly
                setTimeout(() => observeNode(a), i * 80);
            });
        };

        // observe mutations to catch dynamically created cards
        const mo = new MutationObserver(() => startObserve());
        mo.observe(grid, { childList: true });

        // try initial run in case cards already present
        startObserve();
    }

})();
