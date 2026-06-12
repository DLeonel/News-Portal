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

// Carrega o artigo com base no query param ?id=
async function loadArticleFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) return;

    try {
        const res = await fetch(`http://localhost:3000/postsRead/${id}`);
        if (!res.ok) throw new Error('Post não encontrado');
        const post = await res.json();

        // Preenche título
        const titleEl = document.getElementById('articleTitle');
        if (titleEl) titleEl.textContent = post.title || '';

        // Preenche metadados (data e categoria)
        const metaContainer = document.querySelector('article .flex.items-center.gap-4.text-xs.text-gray-500.mb-4');
        if (metaContainer) {
            const dateStr = post.createdAt ? new Date(post.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) : '';
            metaContainer.innerHTML = `<span><i class="bi bi-calendar3"></i> ${dateStr}</span><span class="bg-gray-800 text-[#00f2fe] px-2 py-0.5 rounded">${post.category || 'Geral'}</span>`;
        }

        // Preenche conteúdo
        const contentContainer = document.querySelector('article .space-y-6');
        if (contentContainer) {
            // Inserir conteúdo do post como HTML seguro (assume que o conteúdo está limpo)
            contentContainer.innerHTML = post.content || '';
            // Carregar sugestões relacionadas (2 artigos) após inserir o conteúdo
            populateRelatedSection(post.id);
        }

    } catch (err) {
        console.error('Erro ao carregar artigo:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadArticleFromQuery();
});

function updateAuthUI() {
    const nav = document.querySelector('header nav');
    if (!nav) return;
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const container = document.createElement('div');
    container.className = 'flex items-center gap-3';

    if (currentUser) {
        if (currentUser.role === 'admin') {
            const aAdmin = document.createElement('a');
            aAdmin.href = 'adminPainnel.html';
            aAdmin.className = 'text-gray-400 hover:text-[#00f2fe] transition px-3 py-2 text-sm font-medium';
            aAdmin.innerText = 'Admin';
            container.appendChild(aAdmin);
        }
        const spanUser = document.createElement('span');
        spanUser.className = 'text-gray-300 text-sm';
        spanUser.innerText = currentUser.username || currentUser.email;
        container.appendChild(spanUser);

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

    const existing = document.getElementById('auth-links-area');
    if (existing) existing.remove();
    container.id = 'auth-links-area';
    nav.appendChild(container);
}

document.addEventListener('DOMContentLoaded', () => updateAuthUI());

async function fetchBlogInfo() {
    try {
        const res = await fetch('http://localhost:3000/blogInfo');
        if (!res.ok) return;
        const cfg = await res.json();
        document.querySelectorAll('#nameOfSite').forEach(el => el.textContent = cfg.nameOfSite || 'Technology');
        const ft = document.getElementById('footerText');
        if (ft) ft.textContent = cfg.footerText || ft.textContent;
    } catch (err) {
        console.error('Erro ao buscar blogInfo:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => fetchBlogInfo());

// Preenche a seção "Outros Artigos Relacionados" com artigos do banco
async function populateRelatedSection(currentId) {
    try {
        const res = await fetch('http://localhost:3000/postsList');
        if (!res.ok) return;
        const posts = await res.json();
        if (!Array.isArray(posts) || posts.length === 0) return;

        const candidates = posts.filter(p => String(p.id) !== String(currentId)).slice(0, 2);
        if (candidates.length === 0) return;

        const relatedGrid = document.querySelector('main section .grid');
        if (!relatedGrid) return; // se não achar, não faz nada

        // Limpa os cards estáticos
        relatedGrid.innerHTML = '';

        candidates.forEach(p => {
            const card = document.createElement('div');
            card.className = 'bg-[#151b2c] border border-gray-800 p-5 rounded-lg hover:border-[#00f2fe] transition cursor-pointer group';
            card.dataset.id = p.id;

            const category = document.createElement('span');
            category.className = 'text-xs text-gray-500 block mb-1';
            category.textContent = p.category || 'Geral';

            const h5 = document.createElement('h5');
            h5.className = 'text-white font-medium group-hover:text-[#00f2fe] transition line-clamp-2';
            h5.textContent = p.title || '';

            const readNow = document.createElement('span');
            readNow.className = 'text-[#00f2fe] text-xs inline-flex items-center gap-1 mt-3';
            readNow.innerHTML = 'Ler agora <i class="bi bi-chevron-right text-[10px]"></i>';

            card.appendChild(category);
            card.appendChild(h5);
            card.appendChild(readNow);

            card.addEventListener('click', () => { window.location.href = `read.html?id=${p.id}`; });

            relatedGrid.appendChild(card);
        });

    } catch (err) {
        console.error('Erro ao carregar artigos relacionados:', err);
    }
}