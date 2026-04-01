const axios = require("axios");

const URL = "http://localhost:3000/register";

async function cadastrarUsuario() {
  try {
    const response = await axios.post(URL, {
      email: "diegobritto50@gmail.com",
      password: "123456"
    });

    console.log("✅ Usuário criado com sucesso!");
    console.log(response.data);

  } catch (error) {
    if (error.response) {
      console.log("❌ Erro ao cadastrar:");
      console.log(error.response.data);
    } else {
      console.log("🚨 Erro de conexão:", error.message);
    }
  }
}

cadastrarUsuario();