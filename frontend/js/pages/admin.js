
// EDIT / DELETE / CREATE reais para o painel
async function loadAdminArticles() {
    const tbody = document.getElementById('admin-articles-table-body');
    try {
        const res = await fetch('http://localhost:3000/postsList');
        const posts = await res.json();
        tbody.innerHTML = '';
        posts.forEach(post => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-900/50 transition';
            tr.dataset.id = post.id;

            tr.innerHTML = `
                <td class="py-3 px-4 font-mono text-xs text-[#00f2fe]">#${String(post.id).padStart(4, '0')}</td>
                <td class="py-3 px-4 text-white font-medium truncate max-w-[200px]">${post.title}</td>
                <td class="py-3 px-4 text-end space-x-1 whitespace-nowrap">
                    <button data-id="${post.id}" class="text-amber-400 hover:text-amber-300 p-1.5 transition text-md btn-edit" title="Editar"><i class="bi bi-pencil-square"></i></button>
                    <button data-id="${post.id}" class="text-red-500 hover:text-red-400 p-1.5 transition text-md btn-delete" title="Eliminar"><i class="bi bi-trash3"></i></button>
                </td>
            `;

            tbody.appendChild(tr);
        });

        // Attach listeners
        document.querySelectorAll('.btn-edit').forEach(btn => btn.addEventListener('click', (e) => editArticle(e.target.closest('[data-id]')?.dataset.id || btn.dataset.id)));
        document.querySelectorAll('.btn-delete').forEach(btn => btn.addEventListener('click', (e) => deleteArticle(btn.dataset.id)));

    } catch (err) {
        console.error('Erro ao carregar artigos admin:', err);
    }
}

async function editArticle(id) {
    try {
        const res = await fetch(`http://localhost:3000/postsRead/${id}`);
        const post = await res.json();
        document.getElementById('article-id-input').value = post.id;
        document.getElementById('article-category-input').value = post.category || '';
        document.getElementById('article-title-input').value = post.title || '';
        document.getElementById('article-content-input').value = post.content || '';

        document.getElementById('article-form-title').innerText = `Editar Artigo #${post.id}`;
        const saveBtn = document.getElementById('btn-save-article');
        saveBtn.innerText = 'Atualizar Dados';
        saveBtn.classList.replace('bg-[#9b51e0]', 'bg-amber-500');
        document.getElementById('btn-cancel-edit').classList.remove('hidden');
    } catch (err) {
        console.error('Erro ao buscar artigo:', err);
    }
}

async function deleteArticle(id) {
    if (!confirm(`Deseja realmente eliminar o artigo com ID #${id}?`)) return;
    try {
        const res = await fetch(`http://localhost:3000/postsDelete/${id}`, { method: 'DELETE' });
        if (res.ok) {
            document.querySelector(`tr[data-id="${id}"]`)?.remove();
            resetArticleForm();
        } else console.error('Erro ao deletar');
    } catch (err) {
        console.error('Erro ao deletar artigo:', err);
    }
}

function resetArticleForm() {
    document.getElementById('form-article-crud').reset();
    document.getElementById('article-id-input').value = '';
    document.getElementById('article-form-title').innerText = 'Publicar Novo Artigo';
    const saveBtn = document.getElementById('btn-save-article');
    saveBtn.innerText = 'Publicar Artigo';
    saveBtn.className = saveBtn.className.replace('bg-amber-500', 'bg-[#9b51e0]');
    document.getElementById('btn-cancel-edit').classList.add('hidden');
}

// Form submit (create or update)
document.getElementById('form-article-crud').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('article-id-input').value.trim();
    const category = document.getElementById('article-category-input').value.trim();
    const title = document.getElementById('article-title-input').value.trim();
    const content = document.getElementById('article-content-input').value.trim();

    const payload = { title, category, content };
    try {
        if (id) {
            const res = await fetch(`http://localhost:3000/postsUpdate/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (res.ok) {
                await loadAdminArticles();
                resetArticleForm();
            }
        } else {
            const res = await fetch('http://localhost:3000/postsCreate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (res.ok) {
                await loadAdminArticles();
                resetArticleForm();
            }
        }
    } catch (err) {
        console.error('Erro ao salvar artigo:', err);
    }
});

document.getElementById('btn-cancel-edit').addEventListener('click', resetArticleForm);

// Carregar lista e configurações iniciais
document.addEventListener('DOMContentLoaded', async () => {
    await loadAdminArticles();
});

document.querySelector("#btn-post-site-settings").addEventListener('click', async (e) => {
    e.preventDefault();
    fetchBlogInfo();
});

async function fetchBlogInfo(POST = true) {
    try {
        if (POST) {
            const nameOfSite = document.getElementById('site-name-input').value.trim();
            const siteLogo = document.getElementById('site-logo-input').value.trim();
            const res = await fetch('http://localhost:3000/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nameOfSite, siteLogo })
            });
            return alert(res.ok ? 'Configurações atualizadas com sucesso!' : 'Erro ao atualizar configurações');
        }
        const res = await fetch('http://localhost:3000/blogInfo');
        if (!res.ok) return console.log('Erro ao atualizar configurações', res.status);
        const cfg = await res.json();
        document.querySelectorAll('.nameOfSite').forEach((el) => { el.textContent = cfg.nameOfSite });
        document.querySelectorAll('#siteLogo').forEach((el) => { el.textContent = cfg.siteLogo });

        // Também preenche input do painel se existir
        document.getElementById('site-name-input').value = cfg.nameOfSite;
        document.getElementById('site-logo-input').value = cfg.siteLogo;

    } catch (err) {
        console.error('Erro ao buscar blogInfo:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => { fetchBlogInfo(false); fetchBlogInfoFooter(false) });

document.querySelector("#btn-footer-settings").addEventListener('click', async (e) => {
    e.preventDefault();
    await fetchBlogInfoFooter();
});
async function fetchBlogInfoFooter(POST = true) {
    try {
        if (POST) {
            const footerText = document.getElementById('footer-text-input').value.trim();
            await fetch('http://localhost:3000/api/configFooter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ footerText })
            });

            const res = await fetch('http://localhost:3000/blogInfoFooter');
            if (!res.ok) return;
            const cfg = await res.json();
            document.getElementById('footer-text-input').value = cfg.footerText;
        }
    } catch (err) {
        console.error('Erro ao buscar blogInfo:', err);
    }
}

// Mostrar login/sair no header do painel também
function updateAuthUI() {
    const nav = document.querySelector('header div');
    // painel tem layout diferente; ao menos mostra botão sair se autentificado
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const container = document.createElement('div');
    container.className = 'flex items-center gap-3';
    if (currentUser) {
        const spanUser = document.createElement('span');
        spanUser.className = 'text-gray-300 text-sm mr-2';
        spanUser.innerText = currentUser.username || currentUser.email;
        container.appendChild(spanUser);
        const btnLogout = document.createElement('button');
        btnLogout.className = 'bg-gray-800 hover:bg-red-600 text-white text-xs px-3 py-2 rounded transition font-medium';
        btnLogout.innerText = 'Sair';
        btnLogout.addEventListener('click', () => { localStorage.removeItem('currentUser'); window.location.href = 'home.html'; });
        container.appendChild(btnLogout);
    }
    const headerRight = document.querySelector('header div div');
    if (headerRight) headerRight.appendChild(container);
}

document.addEventListener('DOMContentLoaded', () => updateAuthUI());