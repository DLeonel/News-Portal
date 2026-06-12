// Animações da página de login: foco nos inputs e pequena animação do ícone
(function () {
    function pulseIcon(on) {
        const box = document.getElementById('auth-icon-box');
        if (!box) return;
        if (on) box.classList.add('scale-105', 'transition', 'duration-200');
        else box.classList.remove('scale-105');
    }

    document.addEventListener('DOMContentLoaded', () => {
        const email = document.getElementById('user-gmail');
        const pwd = document.getElementById('user-password');
        [email, pwd].forEach(el => {
            if (!el) return;
            el.addEventListener('focus', () => pulseIcon(true));
            el.addEventListener('blur', () => pulseIcon(false));
        });
    });
})();
