// Animações da página de leitura: fade do conteúdo e cards relacionados
(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const content = document.querySelector('article .space-y-6');
        if (content) {
            content.classList.add('opacity-0', 'translate-y-3');
            setTimeout(() => {
                content.classList.remove('opacity-0', 'translate-y-3');
                content.classList.add('opacity-100', 'transition', 'duration-600', 'ease-out');
            }, 120);
        }

        document.querySelectorAll('.grid .group').forEach((card, i) => {
            card.classList.add('opacity-0', 'translate-y-4');
            setTimeout(() => {
                card.classList.remove('opacity-0', 'translate-y-4');
                card.classList.add('opacity-100', 'transition', 'duration-500');
            }, 180 + i * 80);
        });
    });
})();
