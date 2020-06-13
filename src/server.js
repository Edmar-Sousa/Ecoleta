const express = require('express');
const app = express();
const db = require('./database/db');

app.use(express.urlencoded({ extended : true }));
app.use(express.static('public'));

const nunjucks = require('nunjucks');
nunjucks.configure('src/view', {
    express : app,
    noCache : true
})

//rotas
app.get('/', (req, res) => {
    return res.render('index.html', { title : 'oi' }); //01:26:27
});

app.get('/ponto-coleta', (req, res) => {
    return res.render('ponto_coleta.html');
});

app.post('/save', (req, res) => {
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES ( ?, ?, ?, ?, ?, ?, ?);
    `;

    let values = [
        req.body.img,
        req.body.nome,
        req.body.Endereco,
        req.body.Endereco2,
        req.body.state,
        req.body.Cidade,
        req.body.itensList
    ];

    db.run(query, values, (err) => {
        if (err) {
            console.log(err);
            return res.send('erro ao cadastrar');
        }

        return res.render('ponto_coleta.html', { saved: true });
    });
});

app.get('/search-results', (req, res) => {

    const resul = req.query.sarch;

    if(resul == "") {
        return res.render('search.html', { total : 0 });
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${resul}%';`, function(err, rows){
        if (err) return console.log(err);

        const result = rows.length;

        return res.render('search.html', { dados : rows, total : result });
    });
});

app.listen('3000', () => console.log('Server run in port 3000'));