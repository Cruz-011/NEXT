import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { IamAuthenticator } from 'ibm-watson/auth/index.js';
import AssistantV2 from 'ibm-watson/assistant/v2.js';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração do Watson Assistant
const assistant = new AssistantV2({
  version: '2021-06-14',
  authenticator: new IamAuthenticator({
    apikey: process.env.REACT_APP_WATSON_API_KEY, // Chave de API do .env
  }),
  serviceUrl: process.env.REACT_APP_WATSON_URL,  // URL do Watson Assistant do .env
});

// Variável para armazenar o ID da sessão
let sessionId = null;

// Função para criar uma sessão
const createSession = async () => {
  try {
    const session = await assistant.createSession({
      assistantId: process.env.REACT_APP_WATSON_ASSISTANT_ID,  // ID do assistente do .env
    });
    sessionId = session.result.session_id; // Armazena o ID da sessão
    console.log('Sessão criada com ID:', sessionId);
  } catch (error) {
    console.error('Erro ao criar sessão:', error);
  }
};

// Cria a sessão ao iniciar o servidor
createSession();

// Endpoint para processar mensagens
app.post('/api/watson', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Mensagem não fornecida.' });
  }

  try {
    const response = await assistant.message({
      assistantId: process.env.REACT_APP_WATSON_ASSISTANT_ID,
      sessionId,
      input: {
        'message_type': 'text',
        'text': message,
      },
    });

    const reply = response.result.output.generic[0].text;
    res.json({ reply });
  } catch (error) {
    console.error('Erro no Watson:', error);
    res.status(500).json({ error: 'Erro ao processar a mensagem.' });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
