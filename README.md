# 📌 Projeto Backend - API REST com Node.js

## 📖 Sobre o projeto

Este projeto é uma API REST simples desenvolvida com **Node.js e Express**, com foco em aprendizado de backend.

A API simula um sistema básico com:
- Autenticação de usuários (JWT)
- Cadastro de produtos
- Criação de pedidos
- Pagamento simulado (mock)
- Controle de status de pedidos

---

## 🚀 Tecnologias utilizadas

- Node.js
- Express
- JSON Web Token (JWT)
- CORS

---

## 📁 Estrutura do projeto

- app.js → arquivo principal da aplicação
- server.js → inicialização do servidor
- dados armazenados em memória (sem banco de dados)

---

## ⚙️ Como executar o projeto

### 1. Instalar dependências

No terminal, dentro da pasta do projeto, execute:

```bash
npm install
```

### 2. Iniciar o servidor

```bash
node server.js
```

### 3. Acessar a API

A API ficará disponível em:
http://localhost:3000/api-docs


## 4. 🔐 Autenticação (JWT)

A API utiliza autenticação com token.

### Fluxo:
- Criar usuário: POST `/register`  
- Fazer login: POST `/login`  
- Copiar o token retornado  
- Usar no Header das requisições protegidas:  
  Authorization: Bearer SEU_TOKEN  

---

## 5. 📌 Rotas da API

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

## 🔄 6. Fluxo principal do sistema

- Criar usuário (/register)  
- Fazer login (/login)  
- Criar produtos (/products)  
- Criar pedido (/orders)  
- Realizar pagamento (/pay/:id)  
- Verificar status do pedido  

---

## 🧪 7. Testes (Postman)

Os testes foram realizados utilizando Postman.

### Cenários testados:
- Cadastro de usuário  
- Login e geração de token JWT  
- Criação de produtos  
- Listagem de produtos  
- Criação de pedidos  
- Pagamento simulado  
- Teste de rotas protegidas (com e sem token)  

## 🔗 Repositório

GitHub:
https://github.com/TainaraCostta/backend-projeto

### 🧪 Coleção Postman

A coleção utilizada nos testes está disponível na pasta:

/postman/backend-projeto-postman.json

⚠️ Observações
O projeto utiliza dados em memória (sem banco de dados)
O objetivo é demonstrar funcionamento de API REST simples
Projeto acadêmico com foco em aprendizado

👨‍💻 Autor
Projeto desenvolvido para atividade acadêmica de Backend com Node.js.