// base do projeto
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const db = require("./database");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

app.use(cors());
app.use(express.json());

// configuração do swagger
const SECRET = "segredo";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Backend Projeto",
      version: "1.0.0",
      description: "API REST desenvolvida em Node.js"
    }
  },
  apis: ["./app.js"]
};

const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// registro e login
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  db.run(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password],
    function (err) {
      if (err) {
        return res.status(500).json({ message: "Erro ao criar usuário" });
      }

      res.json({ id: this.lastID, message: "Usuário criado" });
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, user) => {
      if (err) {
        return res.status(500).json({ message: "Erro interno" });
      }

      if (!user) {
        return res.status(401).json({ message: "Login inválido" });
      }

      const token = jwt.sign({ email: user.email }, SECRET, {
        expiresIn: "1h"
      });

      res.json({ token });
    }
  );
});

// token

function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "sem token" });
  }

  try {
    jwt.verify(token.replace("Bearer ", ""), SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "token inválido" });
  }
}

  //  produtos 
app.post("/products", auth, (req, res) => {
  const { name, price } = req.body;

  db.run(
    "INSERT INTO products (name, price) VALUES (?, ?)",
    [name, price],
    function (err) {
      if (err) {
        return res.status(500).json({ message: "Erro ao criar produto" });
      }

      res.json({ id: this.lastID, name, price });
    }
  );
});

app.get("/products", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao buscar produtos" });
    }

    res.json(rows);
  });
});

 
/// pedido 
app.post("/orders", auth, (req, res) => {
  const { productId } = req.body;

  db.run(
    "INSERT INTO orders (productId, status) VALUES (?, ?)",
    [productId, "pending"],
    function (err) {
      if (err) {
        return res.status(500).json({ message: "Erro ao criar pedido" });
      }

      res.json({ id: this.lastID, productId, status: "pending" });
    }
  );
});

app.get("/orders", auth, (req, res) => {
  db.all("SELECT * FROM orders", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao buscar pedidos" });
    }

    res.json(rows);
  });
});

// pagamento

app.post("/pay/:id", auth, (req, res) => {
  const { id } = req.params;

  db.get("SELECT * FROM orders WHERE id = ?", [id], (err, order) => {
    if (err) {
      return res.status(500).json({ message: "Erro interno" });
    }

    if (!order) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    db.run(
      "UPDATE orders SET status = ? WHERE id = ?",
      ["paid", id],
      function (err) {
        if (err) {
          return res.status(500).json({ message: "Erro ao atualizar pagamento" });
        }

        res.json({
          message: "Pagamento aprovado",
          order: { ...order, status: "paid" }
        });
      }
    );
  });
});


  // SWAGGER DOCS
app.get("/swagger.json", (req, res) => {
  res.json(swaggerSpec);
});

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Faz login e retorna um token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token gerado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retorna todos os produtos
 *     responses:
 *       200:
 *         description: Lista de produtos
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto (requer autenticação)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Produto criado com sucesso
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Lista todos os pedidos (requer autenticação)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Cria um novo pedido (requer autenticação)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Pedido criado com sucesso
 */

/**
 * @swagger
 * /pay/{id}:
 *   post:
 *     summary: Realiza o pagamento de um pedido (requer autenticação)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pagamento aprovado
 *       404:
 *         description: Pedido não encontrado
 */


module.exports = app;