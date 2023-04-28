const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json({
    extended: false,
});

const users = [{ id: 1, name: "Ivan" }, { id: 2, name: "Kirill" }];

const stats = {};

router.get('/', (req, res) => {
    res.status(200).send("Hello");
});

router.get('/user', authenticateApiKey, (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(users));
});

router.post('/user', jsonParser, (req, res) => {
    let body = req.body;
    res.status(200).send(req.body);
});

router.get('/comments', authenticateApiKey,(req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(users));
});

router.post('/comments', jsonParser, authenticateApiKey, validateInput(Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
    })), (req, res) => {
    let body = req.body;
    users.push(body);
    res.send(users);
});

router.get('/stats', authenticateApiKey, (req, res) => {
    // формируем HTML-таблицу со статистикой
    let html = "<style>.border1{border: 1px solid #000000;}</style>";
    html += '<table class="border1">';
    const userAgent = req.headers['user-agent'];
    if (!stats[userAgent]) {
        stats[userAgent] = 1;
    } else {
        stats[userAgent]++;
    }
    html += `<tr><td class="border1">${userAgent}</td><td class="border1">${stats[userAgent]}</td></tr>`;
    
    html += '</table>';
    // отправляем ответ с HTML-таблицей
    res.status(200).send(html);
});

router.use((req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.status(404).send("Not found");
});

function validateInput(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
        }
        next();
    };
}

function authenticateApiKey(req, res, next) {
    const { apikey } = req.query;
    if (apikey=="111") {
        next();
    }
    else{
        return res.status(401).json({
        error: 'API key is missing'
        })
    }
};

module.exports = router;