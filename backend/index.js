const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "minha_chave_secreta";

// Registro de usuário
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email e senha obrigatórios" });

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword], function(err) {
    if (err) return res.status(400).json({ error: "Usuário já existe" });
    res.json({ id: this.lastID, email });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha obrigatórios" });
  }

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) return res.status(500).json({ error: "Erro no servidor" });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Você logou com sucesso!",
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });
  });
});

app.listen(3000, "0.0.0.0", () => { 
  console.log("Backend rodando na porta 3000, SERVIDOR OK");
})

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});