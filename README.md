# 📌 API Backend - Projeto Acadêmico

## 📖 Sobre o projeto

API REST desenvolvida em Node.js com Express, utilizando SQLite como banco de dados.

O sistema simula uma lanchonete com:
- Autenticação JWT
- Cadastro de produtos
- Criação de pedidos
- Pagamento simulado
- Controle de status

---

## 🚀 Tecnologias utilizadas

- Node.js
- Express
- SQLite
- JSON Web Token (JWT)
- Swagger
- Postman

---

## 📁 Estrutura do projeto

backend-projeto/
│
├── app.js
├── server.js
├── database.js
├── package.json
├── postman/
│   └── backend-projeto-postman.json
└── README.md

---

## ⚙️ Como executar o projeto

###  Instalar dependências

No terminal, dentro da pasta do projeto, execute:

```bash
npm install
```

###  Iniciar o servidor

```bash
node server.js
``` 

## Documentação da API 📘

Swagger UI disponível em:

http://localhost:3000/api-docs

Caso as rotas não sejam exibidas automaticamente no ambiente local, 
a documentação das rotas pode ser consultada pela coleção Postman incluída neste repositório.

##  🔐 Autenticação (JWT)

A API utiliza autenticação com token.

### Fluxo:
- Criar usuário: POST `/register`  
- Fazer login: POST `/login`  
- Copiar o token retornado  
- Utilizar o token nas rotas protegidas 
  
  Header: Authorization: Bearer SEU_TOKEN  

---

##  📌 Rotas da API

### 🔐 Autenticação
- POST `/register` → cria usuário  
- POST `/login` → realiza login e retorna token  

---

### 📦 Produtos
- POST `/products` → cria produto (protegido)  
- GET `/products` → lista produtos  

---

### 🧾 Pedidos
- POST `/orders` → cria pedido (protegido)  
- GET `/orders` → lista pedidos (protegido)  

---

### 💳 Pagamento
- POST `/pay/:id` → simula pagamento de pedido (protegido)  

---

### 🧪 Testes (Postman)

A coleção de testes contém 10 cenários:

## Testes positivos

- Cadastro de usuário
- Login
- Criação de produto
- Listagem de produtos
- Criação de pedido
- Listagem de pedidos
- Pagamento de pedido

## Testes negativos

- Login inválido
- Acesso sem token
- Pedido inexistente

Arquivo:

/postman/backend-projeto-postman.json

🗄️ Banco de dados

SQLite utilizado para persistência real de dados.

Tabelas:

- users
- products
- orders
 

## 🔗 Repositório

GitHub:
https://github.com/TainaraCostta/backend-projeto


👩🏻‍💻 Autor
Projeto desenvolvido para atividade acadêmica da disciplina de Backend utilizando Node.js, Express, SQLite e JWT.