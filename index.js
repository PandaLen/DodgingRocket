const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/savedata', urlencodedParser, (req, res) => {
    let player = req.body.player;
    let score = req.body.scoreForm;
    let date = new Date();
    let str = `\n${player},${score},${date.toLocaleDateString()},${date.toLocaleTimeString()}`;
    fs.appendFile('./data/result.csv', str, function (err) {
        if (err) {
            console.error(err);
            return res.status(400).json({
                success: false,
                message: 'Byla zjištěna chyba při zápisu do souboru'
            });
        }
    });
    res.redirect(301, '/results');
});

app.get('/results', (req, res) => {
    csv().fromFile('./data/result.csv')
    .then(data => {
        res.render('index.pug', {'players':data, 'nadpis': 'Results'});
    })
    .catch(err => {
        console.log(err);
    })
});

app.listen(port, () => {
    console.log(`Server naslouchá na portu ${port}`);
});