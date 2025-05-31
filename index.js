// Importando o módulo Express
const express = require('express');

// Instância do Express chamada app, que é o servidor.
const app = express();

// Porta onde o servidor vai rodar.
const PORT = 3000;

// um middleware para o Express, se vierem dados em formato JSON, pode interpretar e transformar em objeto JS automaticamente
app.use(express.json());

// Array em memória onde vamos guardar os jogos.
const jogos = [];

app.post('/jogos', (req, res) => {
    const { nome, genero, plataforma} = req.body;

    // Verifica se os dados de todos os campos foram enviados
    if (!nome || !genero || !plataforma) {
        return res.status(400).json({mensagem: "Todos os campos são obrigatórios"});
    }

    // Gerar ID altomaticamente (1 a mais que o ultimo ID existente, mas 1 se for o primeiro)
    const id = jogos.length > 0 ? jogos[jogos.length - 1].id + 1 : 1;

    // Criar objeto do novo jogo
    const novoJogo = {
        id,
        nome,
        genero,
        plataforma
    };

    // Adiciona ao array
    jogos.push(novoJogo);
    
    // Retorna o jogo criado
    res.status(201).json({
        mensagem: "Jogo adicionado com sucesso.",
        jogo: novoJogo
    });
});


// Rota principal, só pra teste.
app.get('/', (req, res) => {
    res.send('Api de coleção de jogos esta rodando!');
});

// Inicia o servidor escutando na porta definida (3000).
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});