# Hikkizas - E-commerce System

Hikkizas é um sistema de e-commerce desenvolvido utilizando React e Vite para o frontend e Node.js com Express para o backend. Este projeto permite que os usuários naveguem, comprem produtos e gerenciem suas contas.

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Tecnologias Utilizadas

### Frontend
- **React**
- **Vite**
- **Bootstrap**
- **Axios**
- **React Router Dom**
- **FontAwesome**

### Backend
- **Node.js**
- **Express**
- **Sequelize (ORM)**
- **SQLite**
- **JWT (JSON Web Tokens)**
- **Bcrypt (para hash de senhas)**

## Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente já vem com o Node.js)
- [SQLite](https://www.sqlite.org/index.html) (para o banco de dados)

## Instalação

### 1. Clone o repositório

Clone o repositório do projeto para sua máquina local.

### 2. Instale as dependências do frontend

Navegue até o diretório do cliente e instale as dependências necessárias.

### 3. Instale as dependências do backend

Navegue até o diretório do servidor e instale as dependências necessárias.

## Configuração

### 1. Configuração do Banco de Dados

O projeto utiliza SQLite. Você pode configurar o banco de dados editando o arquivo `config.json` na pasta `server/config`.

### 2. Variáveis de Ambiente

Crie um arquivo `.env` na pasta `server` e adicione as seguintes variáveis:
  PORT=5000
  DB_DIALECT=sqlite
  DB_STORAGE=db/db.sqlite
  
  JWT_SECRET=sua_chave_secreta
  
  NODE_ENV=development
  TOKEN_EXPIRATION=1h 

### 3. Inicialização do Banco de Dados

Para criar as tabelas e os dados iniciais (usuários e categorias), execute os seguintes comandos:

- Navegue até o diretório do servidor.
- Execute `node utils/initializeAdmin.js` para criar os usuários iniciais.
- Execute `node utils/initializeCategories.js` para criar as categorias iniciais.

## Uso

### 1. Inicie o Servidor Backend

No diretório `server`, inicie o servidor. O servidor estará rodando em `http://localhost:5000`.

### 2. Inicie o Frontend

No diretório `client`, inicie o frontend. O frontend estará acessível em `http://localhost:3000`.

### 3. Acesse o Sistema

Abra o navegador e acesse `http://localhost:3000`. Você poderá navegar pelos produtos, fazer login, registrar-se e gerenciar sua conta.


