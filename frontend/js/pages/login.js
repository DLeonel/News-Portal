// Alterna dinamicamente as classes e textos entre LOGIN e REGISTRO
let isRegisterMode = false;

function toggleAuthMode() {
    isRegisterMode = !isRegisterMode;

    const title = document.getElementById('auth-title');
    const subtitle = document.getElementById('auth-subtitle');
    const submitBtn = document.getElementById('auth-submit-btn');
    const toggleLink = document.getElementById('auth-toggle-link');
    const iconBox = document.getElementById('auth-icon-box');
    const icon = document.getElementById('auth-icon');

    if (isRegisterMode) {
        title.innerText = "Criar Nova Conta";
        subtitle.innerText = "Registe o seu Gmail para começar a ler";
        submitBtn.innerHTML = '<span>Concluir Registro</span> <i class="bi bi-person-plus"></i>';
        toggleLink.innerText = "Já possui cadastro? Fazer Login";
        iconBox.classList.replace('text-[#00f2fe]', 'text-[#9b51e0]');
        icon.classList.replace('bi-shield-lock', 'bi-person-badge');
    } else {
        title.innerText = "Acesso à Conta";
        subtitle.innerText = "Introduza o seu Gmail para entrar no blog";
        submitBtn.innerHTML = '<span>Entrar no Sistema</span> <i class="bi bi-box-arrow-in-right"></i>';
        toggleLink.innerText = "Não tem uma conta? Registar-se aqui";
        iconBox.classList.replace('text-[#9b51e0]', 'text-[#00f2fe]');
        icon.classList.replace('bi-person-badge', 'bi-shield-lock');
    }

}

// Lógica de submissão que chama o backend e guarda usuário em localStorage
async function processAuth(event) {
    event.preventDefault();
    let gmailValue = document.getElementById('user-gmail').value.trim().toLowerCase();
    let passwordValue = document.getElementById('user-password').value.trim();

    // Validação local rápida para evitar mensagens indesejadas do backend
    if (!gmailValue) {
        alert('Por favor, informe seu Gmail.');
        return;
    }

    try {
        if (isRegisterMode) {
            let payload = { gmail: gmailValue, password: passwordValue, username: gmailValue.split('@')[0] };

            const res = await fetch('http://localhost:3000/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });

            if (!res.ok) {
                const errBody = await res.json().catch(() => ({}));
                alert(errBody.error || `Erro no registro (status ${res.status})`);
                return;
            }
            const data = await res.json();
            const current = { ...data.user, role: data.role };
            localStorage.setItem('currentUser', JSON.stringify(current));
            window.location.href = 'home.html';
        } else {
            const payload = { gmail: gmailValue, password: passwordValue };
            const res = await fetch('http://localhost:3000/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                alert(err.error || `Falha no login (status ${res.status})`);
                return;
            }
            const data = await res.json();
            const current = { ...data.user, role: data.role };
            localStorage.setItem('currentUser', JSON.stringify(current));
            // Se admin redireciona para painel
            if (data.role === 'admin') window.location.href = 'adminPainnel.html';
            else window.location.href = 'home.html';
        }
    } catch (err) {
        console.error('Erro auth:', err);
        alert('Erro na operação de autenticação');
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('http://localhost:3000/blogInfo');

        if (!res.ok) return console.log('Erro ao carregar configurações do blog', res.status);
        const cfg = await res.json();

        // `cfg` vem como objeto { nameOfSite, siteLogo }
        // Atualiza todos os elementos que usam id nameOfSite (mesmo que id deva ser único)
        const siteName = cfg.nameOfSite || 'Technology';
        document.querySelectorAll('#nameOfSite').forEach((el) => { el.textContent = siteName; });
    } catch (err) {
        console.debug('Erro ao buscar blogInfo:', err);
    }})