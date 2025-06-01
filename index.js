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

// Rota para retornar todos os jogos
app.get('/jogos', (req, res) => {
    res.json(jogos);
});

// Retorna 1 jogo pelo ID
app.get('/jogos/:id', (req, res) => {
    const id = parseInt(req.params.id); // Para pegar o id na url
    const jogo = jogos.find(j => j.id === id);

    if (!jogo) {
        return res.status(400).json({mensagem: "Jogo não encotrado."});
    }

    res.json(jogo);
});

// Permitir atualizações nos dados
app.put('/jogos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, genero, plataforma } = req.body;

    const jogo = jogos.find(j => j.id === id);
    if (!jogo) {
    return res.status(404).json({ mensagem: "Jogo não encontrado."});
    }
    
    // Atualizar somente os campos enviados
    if (nome) jogo.nome = nome;
    if (genero) jogo.genero = genero;
    if (plataforma) jogo.plataforma = plataforma;

    res.json({
        mensagem: "Jogo atualizado com sucesso.",
        jogo
    })
});

// Permite que o usuário remova um jogo existente do array
app.delete('/jogos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    const index = jogos.findIndex(j => j.id === id); // procura no array jogos qual é o índice do jogo que tem o id igual ao que foi passado na URL

    if (index === -1) {
        return res.status(404).json({mensagem: "Jogo não encontrado."});
    }

    jogos.splice(index, 1); // remove 1 item na posição index

    res.json({
        mensagem: "Jogo removido com sucesso."
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