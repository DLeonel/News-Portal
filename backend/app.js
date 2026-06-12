const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./main');

const server = express();
server.use(cors());
server.use(express.json());

// Servir frontend estático (para desenvolvimento local)
server.use(express.static(path.join(__dirname, '../frontend')));

// Listar todos os posts
server.get('/postsList', async (req, res) => {
    try {
        const [rows] = await pool.promise().query('SELECT id, title, category, content, createdAt FROM artigos ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao listar posts:', error);
        res.status(500).json({ error: 'Erro ao listar posts' });
    }
});

// Ler um post específico
server.get('/postsRead/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.promise().query('SELECT id, title, category, content, createdAt FROM artigos WHERE id = ?', [id]);
        if (rows.length > 0) res.json(rows[0]);
        else res.status(404).json({ error: 'Post não encontrado' });
    } catch (error) {
        console.error('Erro ao ler post:', error);
        res.status(500).json({ error: 'Erro ao ler post' });
    }
});

// Criar post
server.post('/postsCreate', async (req, res) => {
    const { title, category, content } = req.body;
    try {
        const [result] = await pool.promise().query('INSERT INTO artigos (title, category, content) VALUES (?, ?, ?)', [title, category, content]);
        res.json({ insertId: result.insertId });
    } catch (error) {
        console.error('Erro ao criar post:', error);
        res.status(500).json({ error: 'Erro ao criar post' });
    }
});

// Atualizar post
server.put('/postsUpdate/:id', async (req, res) => {
    const { id } = req.params;
    const { title, category, content } = req.body;
    try {
        const [result] = await pool.promise().query('UPDATE artigos SET title = ?, category = ?, content = ? WHERE id = ?', [title, category, content, id]);
        if (result.affectedRows > 0) res.json({ message: 'Post atualizado' });
        else res.status(404).json({ error: 'Post não encontrado' });
    } catch (error) {
        console.error('Erro ao atualizar post:', error);
        res.status(500).json({ error: 'Erro ao atualizar post' });
    }
});

// Deletar post
server.delete('/postsDelete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.promise().query('DELETE FROM artigos WHERE id = ?', [id]);
        if (result.affectedRows > 0) res.json({ message: 'Post deletado' });
        else res.status(404).json({ error: 'Post não encontrado' });
    } catch (error) {
        console.error('Erro ao deletar post:', error);
        res.status(500).json({ error: 'Erro ao deletar post' });
    }
});

// Informações básicas do blog (GET/PUT) - placeholders simples
// Retorna configurações do site (busca id=1 em configuracoes)
server.get('/blogInfo', async (req, res) => {
    try {
        const [rows] = await pool.promise().query('SELECT site_name, site_logo FROM configuracoes WHERE id = 1');
        if (rows.length > 0) return res.json({ nameOfSite: rows[0].site_name, siteLogo: rows[0].site_logo });
        // defaults
        else return res.json({ nameOfSite: 'Technology', siteLogo: 'bi-cpu' });
    } catch (err) {
        console.error('Erro ao buscar configuracoes:', err);
        res.status(500).json({ error: 'Erro ao buscar configuracoes' });
    }
});

server.get('/blogInfoFooter', async (req, res) => {
    try {
        const [rows] = await pool.promise().query('SELECT footer_text FROM configuracoes WHERE id = 1;');
        if (rows.length > 0) return res.json({ footerText: rows[0].footer_text });
        // defaults
        else return res.json({ footerText: '© 2026 Technology. Todos os direitos reservados.' });
    } catch (err) {
        console.error('Erro ao buscar configuracoes:', err);
        res.status(500).json({ error: 'Erro ao buscar configuracoes' });
    }
});

server.put('/blogInfo', async (req, res) => {
    const { nameOfSite, siteLogo, footerText } = req.body;
    try {
        const [rows] = await pool.promise().query('SELECT id FROM configuracoes WHERE id = 1');
        if (rows.length > 0) {
            await pool.promise().query('UPDATE configuracoes SET site_name = ?, site_logo = ?, footer_text = ? WHERE id = 1', [nameOfSite, siteLogo, footerText]);
        } else {
            await pool.promise().query('INSERT INTO configuracoes (id, site_name, site_logo, footer_text) VALUES (1, ?, ?, ?)', [nameOfSite, siteLogo, footerText]);
        }
        res.json({ message: 'Configurações atualizadas' });
    } catch (err) {
        console.error('Erro ao atualizar configuracoes:', err);
        res.status(500).json({ error: 'Erro ao atualizar configuracoes' });
    }
});

server.put('/blogInfoFooter', async (req, res) => {
    const { footerText } = req.body;
    try {
        const [rows] = await pool.promise().query('SELECT id FROM configuracoes WHERE id = 1');
        if (rows.length > 0) {
            await pool.promise().query('UPDATE configuracoes SET footer_text = ? WHERE id = 1', [footerText]);
        } else {
            await pool.promise().query('INSERT INTO configuracoes (id, footer_text) VALUES (1, ?)', [footerText]);
        }
        res.json({ message: 'Configurações atualizadas' });
    } catch (err) {
        console.error('Erro ao atualizar configuracoes:', err);
        res.status(500).json({ error: 'Erro ao atualizar configuracoes' });
    }
});

// API compatível com frontend/admin route.js que usa /api/config
server.post('/api/config', async (req, res) => {
    const { nameOfSite, siteLogo } = req.body;

    try {
        //const footerText = footerText || '';
        const [rows] = await pool.promise().query('SELECT id FROM configuracoes WHERE id = 1');
        if (rows.length > 0) {
            await pool.promise().query('UPDATE configuracoes SET site_name = ?, site_logo = ? WHERE id = 1', [nameOfSite, siteLogo]);
        } else {
            await pool.promise().query('INSERT INTO configuracoes (id, site_name, site_logo) VALUES (1, ?, ?)', [nameOfSite, siteLogo]);
        }
        res.json({ message: 'Config salva' });
    } catch (err) {
        console.error('Erro /api/config:', err);
        res.status(500).json({ error: 'Erro ao salvar config' });
    }
});

// API compatível com frontend/admin route.js que usa /api/config
server.post('/api/configFooter', async (req, res) => {
    const { footerText } = req.body;
    // Armazenamos apenas nameOfSite e footerText aqui (os outros campos podem ser ignorados ou estendidos)
    try {
        const [rows] = await pool.promise().query('SELECT id FROM configuracoes WHERE id = 1');
        if (rows.length > 0) {
            await pool.promise().query('UPDATE configuracoes SET footer_text = ? WHERE id = 1', [footerText]);
        } else {
            await pool.promise().query('INSERT INTO configuracoes (id, footer_text) VALUES (1, ?)', [footerText]);
        }
        res.json({ message: 'Config salva' });
    } catch (err) {
        console.error('Erro /api/config:', err);
        res.status(500).json({ error: 'Erro ao salvar config' });
    }
});

// --- Autenticação simples ---
// Registrar usuário (cria registro em `usuarios`). Aceita opcionalmente `password`.
server.post('/auth/register', async (req, res) => {
    const email = req.body.gmail || req.body.email;
    const username = req.body.username || (email ? email.split('@')[0] : '');
    const password = req.body.password || '';
    //if (!email) return res.status(400).json({ error: 'email é obrigatório' });
    try {
        const [exists] = await pool.promise().query('SELECT id FROM usuarios WHERE email = ?', [email]);
        if (exists.length > 0) return res.status(409).json({ error: 'Usuário já existe' });

        const [result] = await pool.promise().query('INSERT INTO usuarios (email, username, password) VALUES (?, ?, ?)', [email, username, password]);
        const [rows] = await pool.promise().query('SELECT id, email, username FROM usuarios WHERE id = ?', [result.insertId]);
        res.json({ user: rows[0], role: 'user' });
    } catch (err) {
        console.error('Erro ao registrar usuário:', err);
        res.status(500).json({ error: err.message || 'Erro ao registrar usuário' });
    }
});

// Login: permite autenticar admin (tabela administradores) ou usuarios (tabela usuarios)
server.post('/auth/login', async (req, res) => {
    const email = req.body.gmail || req.body.email;
    const password = req.body.password;
    if (!email) return res.status(400).json({ error: 'email é obrigatório' });
    try {
        if (password) {
            // tenta admin (administradores usa coluna email)
            const [admins] = await pool.promise().query('SELECT email, password FROM administradores WHERE email = ? AND password = ?', [email, password]);
            if (admins.length > 0) return res.json({ user: { email: admins[0].email }, role: 'admin' });

            // tenta usuário com senha (usuarios usa coluna gmail)
            try {
                const [usersWithPass] = await pool.promise().query('SELECT id, email, username FROM usuarios WHERE email = ? AND password = ?', [email, password]);
                if (usersWithPass.length > 0) return res.json({ user: usersWithPass[0], role: 'user' });
            } catch (uErr) {
                console.error('Erro ao verificar senha em usuarios:', uErr);
            }
        }

        // busca por email apenas (sem senha)
        const [users] = await pool.promise().query('SELECT id, email, username FROM usuarios WHERE email = ?', [email]);
        if (users.length > 0) return res.json({ user: users[0], role: 'user' });

        // Se não existir usuário, criar automaticamente (login via email cria conta sem senha)
        try {
            const usernameFromEmail = email && email.includes('@') ? email.split('@')[0] : email;
            const [ins] = await pool.promise().query('INSERT INTO usuarios (email, username, password) VALUES (?, ?, ?)', [email, usernameFromEmail, '']);
            const [newRows] = await pool.promise().query('SELECT id, email, username FROM usuarios WHERE id = ?', [ins.insertId]);
            if (newRows.length > 0) return res.json({ user: newRows[0], role: 'user', created: true });
        } catch (createErr) {
            console.error('Erro ao criar usuário automaticamente:', createErr);
        }

        res.status(404).json({ error: 'Usuário não encontrado' });
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ error: err.message || 'Erro no login' });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} - http://localhost:${PORT}`);
});