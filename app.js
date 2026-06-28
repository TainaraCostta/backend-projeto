// base do projeto
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const SECRET = "segredo";

// bancos simples em memória
let users = [];
let products = [];
let orders = [];

// criar registro e login 
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  users.push({ email, password });

  res.json({ message: "Usuário criado" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Login inválido" });
  }

  const token = jwt.sign({ email }, SECRET);

  res.json({ token });
});
// criar token
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
// produtos
app.post("/products", auth, (req, res) => {
  const { name, price } = req.body;

  const product = {
    id: products.length + 1,
    name,
    price
  };

  products.push(product);

  res.json(product);
});

app.get("/products", (req, res) => {
  res.json(products);
});
// pedidos
app.post("/orders", auth, (req, res) => {
  const { productId } = req.body;

  const order = {
    id: orders.length + 1,
    productId,
    status: "pending"
  };

  orders.push(order);

  res.json(order);
});

app.get("/orders", auth, (req, res) => {
  res.json(orders);
});
// pagamento mock
app.post("/pay/:id", auth, (req, res) => {
  const order = orders.find(o => o.id == req.params.id);

  if (!order) {
    return res.status(404).json({ message: "pedido não encontrado" });
  }

  order.status = "paid";

  res.json({
    message: "pagamento aprovado",
    order
  });
});

module.exports = app;