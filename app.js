import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import db from './src/config/dbConnect.js';
import router from './src/routes/routes.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

db.on('error', console.error.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('Conexão feita com sucesso');
});

const app = express();

const corsOptions = {
  origin: 'http://localhost:5500', // ou o endereço local onde está rodando seu frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(router);
app.use(express.static('public'));


app.get('/adicionar-venda', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/front', 'adicionar-venda.html'));
});

export default app;
