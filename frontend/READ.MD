# 🎨 Front-end

Esta pasta contém toda a interface visual da aplicação, sendo responsável pela experiência do utilizador, apresentação dos conteúdos e comunicação com o servidor.

## 📂 Estrutura de Pastas

### `/pages`

Contém todas as páginas da aplicação.

Exemplos:

* **Home** → Página principal responsável por exibir a lista de artigos publicados.
* **Article** → Página responsável pela leitura completa de um artigo.
* **Admin Panel** → Painel administrativo utilizado para criar, editar e remover artigos, além de gerenciar configurações da plataforma.

### `/assets`

Armazena recursos estáticos utilizados pela aplicação.

Exemplos:

* Imagens;
* Ícones;
* Logotipos;
* Favicons;
* Recursos gráficos diversos.

### `/css` ou `/styles`

Contém os arquivos responsáveis pela estilização da aplicação.

Nesta pasta encontram-se:

* Estilos globais;
* Componentes visuais;
* Layouts;
* Responsividade;
* Personalizações do Tailwind CSS.

### `/js`

Contém toda a lógica de funcionamento do Front-end.

Responsabilidades:

* Manipulação do DOM;
* Validação de formulários;
* Comunicação com o Back-end;
* Atualização dinâmica da interface;
* Organização dos módulos JavaScript.

## 📦 Organização em Módulos

O JavaScript da aplicação foi dividido em módulos para facilitar a manutenção, reutilização e escalabilidade do código.

### O que é um módulo?

Um módulo é um arquivo JavaScript independente que possui uma responsabilidade específica dentro da aplicação.

Exemplos:

* Módulo de autenticação;
* Módulo de artigos;
* Módulo de administração;
* Módulo de comunicação com a API.

### Vantagens dos módulos

* Melhor organização do projeto;
* Reutilização de código;
* Facilidade de manutenção;
* Redução de duplicação;
* Maior escalabilidade.

## 📡 Arquivo Principal

### `main.js`

O arquivo `main.js` atua como ponto central da aplicação Front-end.

Suas responsabilidades incluem:

* Inicializar os módulos da aplicação;
* Enviar requisições para o servidor;
* Receber respostas da API;
* Coordenar a comunicação entre interface e Back-end;
* Gerenciar o fluxo principal da aplicação.

## 🎨 Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (ES Modules)
* Tailwind CSS
* Bootstrap Icons

## 🎯 Objetivo

A camada Front-end é responsável por fornecer uma interface simples, organizada e intuitiva para leitura de artigos e gerenciamento administrativo da plataforma.
