const express = require('express');
const app = express();
const parser = require('body-parser');
const prefixCheck = require('./prefix');

const PORT = process.env.PORT || 3000;

app.use(parser.json());
app.use(parser.urlencoded({
    extended: true
}));

app.get('/', async(req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.post('/word', async(req, res) => {
    const array = req.body.sentence.split(" ");
    const results = [];
    array.forEach(element => {
        if(element.length > 2){
            const word = element.replace(/[^а-яА-Я]/g, '');
            results.push({
                word,
                prefix: prefixCheck(word)
            })
        }
    });
    let html = '';
    results.forEach(el => {
        html += `<div>Слово: ${el.word}<br/>Префикс: ${el.prefix.success ? el.prefix.name : 'отсутствует'}</div><br/>`
    })
    res.send(html);
});

app.listen(PORT);

console.log(`Порт доступа: ${PORT} (127.0.0.1:${PORT})\nСервер запущен...`);