const express = require('express');
const app = express();
const parser = require('body-parser');
const showRes = require('./prefix');

const PORT = process.env.PORT || 3000;

app.use(parser.json());
app.use(parser.urlencoded({
    extended: true
}));

app.get('/', async(req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.post('/word', async(req, res) => {
    const result = showRes(req.body.word);
    res.send(result);
});

app.listen(PORT);

console.log(`Порт доступа: ${PORT} (127.0.0.1:${PORT})\nСервер запущен...`);