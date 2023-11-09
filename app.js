import express from 'express';
import db from './src/config/dbConnect.js'; // Importe a conexão do banco de dados
import router from './src/routes/routes.js'; // Importe o arquivo de rotas

// Iniciando o servidor e escutando uma porta:
db.on('error', console.error.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('Conexão feita com sucesso');
});

// Passando a instância do express para utilizar as rotas:
const app = express();
app.use(express.json()); // Faz interpretar o que está chegando via POST ou PUT
app.use(router); // Use o router diretamente aqui
app.use(express.static('public'))

export default app;
