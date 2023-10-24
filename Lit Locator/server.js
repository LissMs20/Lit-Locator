const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.static(__dirname));

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'El20ms2001@',
    database: 'lit_pesquisas'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ' + err.message);
    } else {
        console.log('Conectado ao banco de dados');
    }
});

app.use(bodyParser.json());

app.post('/adicionar-livro-pesquisa', (req, res) => {
    const { title, authors, publisher, publishedDate, thumbnail, previewLink } = req.body;

    const query = "INSERT INTO tabela_pesquisas (title, authors, publisher, publishedDate, thumbnail, previewLink) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(query, [title, authors, publisher, publishedDate, thumbnail, previewLink], (err, results) => {
        if (err) {
            console.error("Erro ao inserir dados de pesquisa no banco de dados:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
        } else {
            res.status(200).json({ message: "Dados de pesquisa adicionados com sucesso" });
        }
    });
});

app.post('/adicionar-favorito', (req, res) => {
    const { title, authors, publisher, publishedDate, thumbnail, previewLink } = req.body;

    const query = "INSERT INTO tabela_favoritos (title, authors, publisher, publishedDate, imageUrl, previewLink) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(query, [title, authors, publisher, publishedDate, thumbnail, previewLink], (err, results) => {
        if (err) {
            console.error("Erro ao inserir livro favorito no banco de dados:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
        } else {
            res.status(200).json({ message: "Livro favorito adicionado com sucesso" });
        }
    });
});

app.get('/listar-livros-pesquisa', (req, res) => {
    db.query('SELECT * FROM tabela_pesquisas', (err, results) => {
        if (err) {
            console.error("Erro ao buscar dados de pesquisa:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/listar-livros-favoritos', (req, res) => {
    db.query('SELECT * FROM tabela_favoritos', (err, results) => {
        if (err) {
            console.error("Erro ao buscar livros favoritos:", err);
            res.status(500).json({ error: "Erro interno do servidor" });
        } else {
            res.status(200).json(results);
        }
    });
});

app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/dashboard.html');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
