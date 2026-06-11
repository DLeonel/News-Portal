# ⚙️ Back-end

Esta pasta contém toda a lógica de servidor da aplicação, sendo responsável pelo processamento das requisições, comunicação com o banco de dados e gerenciamento dos conteúdos publicados.

## 📂 Estrutura Principal

### `server.js` ou `main.js`

Arquivo principal da aplicação.

Responsável por:

* Inicializar o servidor;
* Configurar middlewares;
* Registrar rotas;
* Controlar a comunicação entre Front-end e banco de dados.

### `/routes`

Contém as rotas da API.

Exemplos:

* Buscar artigos;
* Criar artigos;
* Atualizar artigos;
* Excluir artigos;
* Gerenciar autenticação.

### `/database`

Responsável pela conexão com o banco de dados MySQL.

Centraliza toda a configuração necessária para acesso às tabelas da aplicação.

### `/uploads`

Diretório destinado ao armazenamento de imagens enviadas pelos administradores para utilização nos artigos.

### `/node_modules`

Contém todas as dependências instaladas pelo projeto através do NPM.

Esta pasta é gerada automaticamente e não deve ser modificada manualmente.

## 📚 Bibliotecas Utilizadas

### Express.js

O Express é um framework para Node.js que simplifica a criação de servidores e APIs.

Responsabilidades:

* Criar o servidor HTTP;
* Gerenciar rotas;
* Processar requisições;
* Enviar respostas ao Front-end;
* Organizar a estrutura da aplicação.

### MySQL2

Biblioteca responsável pela comunicação entre o Node.js e o banco de dados MySQL.

Permite:

* Executar consultas SQL;
* Inserir registros;
* Atualizar informações;
* Remover dados;
* Buscar informações armazenadas.

### CORS

Cross-Origin Resource Sharing.

Responsável por permitir que o Front-end e o Back-end consigam comunicar-se mesmo quando executados em origens diferentes.

Exemplo:

* Front-end → localhost:5173
* Back-end → localhost:3000

Sem o CORS, o navegador bloquearia essas requisições por questões de segurança.

## 🗄️ Comunicação com o Banco de Dados

O servidor utiliza a biblioteca MySQL2 para estabelecer conexão com o banco de dados MySQL.

Fluxo básico:

1. O utilizador realiza uma ação no Front-end.
2. O JavaScript envia uma requisição para a API.
3. O Express recebe a requisição.
4. O servidor executa uma consulta SQL através do MySQL2.
5. O banco retorna os dados solicitados.
6. O servidor envia a resposta ao Front-end.
7. A interface é atualizada com os dados recebidos.

## 📰 Gerenciamento de Conteúdo

O Back-end é responsável por:

* Armazenar artigos;
* Atualizar conteúdos;
* Remover publicações;
* Gerenciar imagens;
* Controlar configurações administrativas;
* Fornecer dados para o Front-end.

## 🎯 Objetivo

A camada Back-end centraliza toda a lógica de negócio da aplicação, garantindo a comunicação segura entre a interface, os dados armazenados e as funcionalidades administrativas.
