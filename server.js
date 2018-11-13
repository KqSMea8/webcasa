const express = require('express');
const cors = require('cors');
const app = express();

// Porta para subir o servidor
const serverPort = 8001;

// Seta as rotas default da API
const routes = {
	produtos: {
		get: '/api/produtos'
	},
	usuarios: {
		get: '/api/usuarios'
	}
};

// Aplica o CORS para aceitar requisições de outros domínios
app.use(cors());

// Registra a rota GET default, enviando o JSON como retorno
app.get(routes.produtos.get, function (req, res) {
    res.sendFile(__dirname + '/data/produtos.json');
});

app.get(routes.usuarios.get, function (req, res) {
    res.sendFile(__dirname + '/data/usuarios.json');
});

app.use('*', function (req, res) {
	res.redirect(routes.produtos.get);
	res.redirect(routes.usuarios.get);
});

// Inicia o servidor e avisa o usuário
app.listen(serverPort);
console.log(`[produtos] API escutando na porta ${serverPort}.`);
