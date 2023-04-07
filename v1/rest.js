const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json({
    extended: false,
});

const users = [{ id: 1, name: "Ivan" }, { id: 2, name: "Kirill" }];

const stats = {};

router.get('/', (req, res) => {
    
    res.status(200).send("Hello");
});

router.get('/user', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(users));
});

router.post('/user', jsonParser, (req, res) => {
    let body = req.body;
    res.status(200).send(req.body);
    //console.log(req.body);
    // req.on("data", (chunk) => {
    //     body += chunk.toString();
    // });
    // req.on("end", () => {
    //     res.send(body);
    // });
});

router.get('/comments', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(users));
});

router.post('/comments', jsonParser, (req, res) => {
    let body = req.body;
    res.send(req.body);
    // req.on("data", (chunk) => {
    //     body += chunk.toString();
    // });
    // req.on("end", () => {
    //     res.send(body);
    // });
});

router.get('/stats', (req, res) => {
    // формируем HTML-таблицу со статистикой
    let html = "<style>.border1{border: 1px solid #000000;}</style>";
    html += '<table class="border1">';
    for (const userAgent in stats) {
        html += `<tr><td class="border1">${userAgent}</td><td class="border1">${stats[userAgent]}</td></tr>`;
    }
    html += '</table>';
    // отправляем ответ с HTML-таблицей
    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // res.write(html);
    // res.send();
    res.status(200).send(html);
});

router.use((req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.status(404).send("Not found");
});

function updateStats(req) {
    const userAgent = req.headers['user-agent'];
    if (!stats[userAgent]) {
        stats[userAgent] = 1;
    } else {
        stats[userAgent]++;
    }
}

router.use((req, res, next) => {
    updateStats(req);
    next();
});

module.exports = router;