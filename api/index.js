const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

// Inicialização do Firebase Admin
if (!admin.apps.length) {
  // LEIA DA VARIÁVEL DE AMBIENTE NA VERCEL
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const app = express();

// Configurar CORS para permitir a URL do seu frontend deployado
// process.env.FRONTEND_URL_DEPLOYED será uma variável de ambiente na Vercel
app.use(cors({ origin: process.env.FRONTEND_URL_DEPLOYED || "*" }));

app.use(express.json());

app.use("/perguntas", perguntasRouter); // Responderá a /api/perguntas
app.use("/scores", scoresRouter);       // Responderá a /api/scores

app.get("/", (req, res) => res.send("Backend API está funcionando!"));

// Importar e usar suas rotas
const perguntasRouter = require("../routes/perguntas");
const scoresRouter = require("../routes/scores);

module.exports = app; // Exporta o app Express