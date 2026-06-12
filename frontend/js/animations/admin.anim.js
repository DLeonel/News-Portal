// Animações do Painel Admin: linhas da tabela com fade-in e highlight ao passar o mouse
(function () {
    function fadeInRows() {
        document.querySelectorAll('#admin-articles-table-body tr').forEach((tr, i) => {
            tr.classList.add('opacity-0', 'translate-y-2');
            setTimeout(() => {
                tr.classList.remove('opacity-0', 'translate-y-2');
                tr.classList.add('opacity-100', 'transition', 'duration-400', 'ease-out');
            }, i * 80);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        fadeInRows();
        // re-fade quando tabela é atualizada (observa mudanças)
        const tbody = document.getElementById('admin-articles-table-body');
        if (tbody) {
            new MutationObserver(() => fadeInRows()).observe(tbody, { childList: true });
        }
    });
})();
