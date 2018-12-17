const express = require('express');
const app = express();
const parser = require('body-parser');
const {prefixCheck, azLib} = require('./prefix');
const Az = require('az');

const PORT = process.env.PORT || 3000;

app.use(parser.json());
app.use(parser.urlencoded({
    extended: true
}));

app.get('/', async(req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.post('/word', (req, res) => {
    const array = req.body.sentence.split(" ");
    const results = [];
    Az.Morph.init('./node_modules/az/dicts', () => {
        array.forEach(element => {
            const word = element.replace(/[^а-яА-Я]/g, '');
            const morph = Az.Morph(word);
            results.push({
                word,
                morph
            })
        });
        let html = '';
        results.forEach(el => {
            html += `<div>Слово: ${el.word}<br/>Анализ слова: ${el.morph[0].tag.ext}</div><br/>`
        })
        res.send(html);
    });
});

app.listen(PORT);

console.log(`Порт доступа: ${PORT} (127.0.0.1:${PORT})\nСервер запущен...`);