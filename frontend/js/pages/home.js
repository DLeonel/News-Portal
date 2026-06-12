
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        icon.classList.replace('bi-list', 'bi-x-lg');
    } else {
        menu.classList.add('hidden');
        icon.classList.replace('bi-x-lg', 'bi-list');
    }
}

// Cria os cards dos artigos mantendo toda a estrutura e classes existentes
function createArticleCard(post) {
    const article = document.createElement('article');
    article.className = 'bg-[#151b2c] border border-gray-800 rounded-lg overflow-hidden shadow-lg hover:border-[#00f2fe] transition duration-300 flex flex-col justify-between group';

    const dateStr = post.createdAt ? new Date(post.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
    const excerpt = post.content ? post.content.substring(0, 180) : '';

    article.innerHTML = `
        <div class="p-6">
            <div class="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span><i class="bi bi-calendar3"></i> ${dateStr}</span>
                <span class="bg-gray-800 text-[#00f2fe] px-2 py-0.5 rounded">${post.category || 'Geral'}</span>
            </div>
            <h2 class="text-xl font-semibold text-white group-hover:text-[#00f2fe] transition mb-3 line-clamp-2">
                ${post.title}
            </h2>
            <p class="text-gray-400 text-sm line-clamp-3 mb-4">
                ${excerpt}
            </p>
        </div>
        <div class="px-6 pb-6 pt-0">
            <button class="w-full bg-gray-800 hover:bg-[#00f2fe] text-white hover:text-black font-medium py-2 px-4 rounded transition flex items-center justify-center gap-2" data-id="${post.id}">
                Ler Artigo <i class="bi bi-arrow-right"></i>
            </button>
        </div>
    `;

    // Ao clicar abre a página read.html com query param id
    article.querySelector('button').addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        window.location.href = `read.html?id=${id}`;
    });

    return article;
}

async function loadArticles() {
    const grid = document.getElementById('home-articles-grid');
    try {
        const res = await fetch('http://localhost:3000/postsList');
        if (!res.ok) throw new Error('Erro ao buscar artigos');
        const posts = await res.json();
        grid.innerHTML = '';
        if (Array.isArray(posts) && posts.length) {
            posts.forEach(post => grid.appendChild(createArticleCard(post)));
        } else {
            grid.innerHTML = '<p class="text-gray-400">Nenhum artigo encontrado.</p>';
        }
    } catch (err) {
        console.error(err);
        grid.innerHTML = '<p class="text-red-400">Erro ao carregar artigos.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadArticles();
});

// Atualiza os links de autenticação no header: Login / Sair / Admin
function updateAuthUI() {
    const nav = document.querySelector('header nav');
    if (!nav) return;
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const container = document.createElement('div');
    container.className = 'flex items-center gap-3';

    if (currentUser) {
        // Mostrar admin se for admin
        if (currentUser.role === 'admin') {
            const aAdmin = document.createElement('a');
            aAdmin.href = 'adminPainnel.html';
            aAdmin.className = 'text-gray-400 hover:text-[#00f2fe] transition px-3 py-2 text-sm font-medium';
            aAdmin.innerText = 'Admin';
            container.appendChild(aAdmin);
        }

        const aProfile = document.createElement('span');
        aProfile.className = 'text-gray-300 text-sm';
        aProfile.innerText = currentUser.username || currentUser.email;
        container.appendChild(aProfile);

        const btnLogout = document.createElement('button');
        btnLogout.className = 'bg-gray-800 hover:bg-[#00f2fe] text-white px-3 py-2 rounded text-sm';
        btnLogout.innerText = 'Sair';
        btnLogout.addEventListener('click', () => { localStorage.removeItem('currentUser'); location.reload(); });
        container.appendChild(btnLogout);
    } else {
        const aLogin = document.createElement('a');
        aLogin.href = 'login.html';
        aLogin.className = 'text-gray-400 hover:text-[#00f2fe] transition px-3 py-2 text-sm font-medium';
        aLogin.innerText = 'Entrar';
        container.appendChild(aLogin);
    }

    // Remove auth area anterior se existir e adiciona a nova
    const existing = document.getElementById('auth-links-area');
    if (existing) existing.remove();
    container.id = 'auth-links-area';
    nav.appendChild(container);
}

document.addEventListener('DOMContentLoaded', () => updateAuthUI());

// Busca configurações do blog e aplica nome e footer
async function fetchBlogInfo() {
    try {
        const res = await fetch('http://localhost:3000/blogInfo');

        if (!res.ok) return console.log('Erro ao carregar configurações do blog', res.status);
        const cfg = await res.json();

        // `cfg` vem como objeto { nameOfSite, siteLogo }
        // Atualiza todos os elementos que usam id nameOfSite (mesmo que id deva ser único)
        const siteName = cfg.nameOfSite || 'Technology';
        document.querySelectorAll('#nameOfSite').forEach((el) => { el.textContent = siteName; });

        // Atualiza elementos que exibem o logo/texto do site
        if (cfg.siteLogo) document.querySelectorAll('#siteLogo').forEach((el) => { el.textContent = cfg.siteLogo; });
    } catch (err) {
        console.debug('Erro ao buscar blogInfo:', err);
    }
}
// Busca configurações do blog e aplica nome e footer
async function fetchBlogInfoFooter() {
    try {
        const res = await fetch('http://localhost:3000/blogInfoFooter');
        if (!res.ok) return console.info('Erro ao carregar configurações do blog footer', res.status);
        const cfg = await res.json();
        const ft = document.getElementById('footerText');
        ft.textContent = (cfg.footerText || "Technnology © 2026. Todos os direitos reservados.");
    } catch (err) {
        console.debug('Erro ao buscar blogInfoFooter:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => fetchBlogInfo());