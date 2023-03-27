const http = require('node:http');

const host = "127.0.1.1";
const port = 5500;

const users = [{id: 1, name: "Ivan"}, {id: 2, name: "Kirill"}];

const stats = {};

const server = http.createServer((req, res) => {
    if(req.url === "/") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("Hello");
    } else if (req.url === "/user") {
        // res.statusCode = 200;
        // res.setHeader("Content-Type", "text/plain");
        // res.end("Hello user");
        if (req.method === "GET") {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(users));
        } else if (req.method === "POST") {
            body = "";
            req.on("data", (chunk) =>{
                body += chunk.toString();
            })
            req.on("end", () => {
                res.end(body);
            })
        } else {
            res.statusCode = 400;
            res.setHeader("Content-Type", "text/plain");
            res.end("Bad method");
        } 
    
    } else if (req.url === "/comments") {
        // res.statusCode = 200;
        // res.setHeader("Content-Type", "text/plain");
        // res.end("Hello user");
        if (req.method === "GET") {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(users));
        } else if (req.method === "POST") {
            body = "";
            req.on("data", (chunk) =>{
                body += chunk.toString();
            })
            req.on("end", () => {
                res.end(body);
            })
        } else {
            res.statusCode = 400;
            res.setHeader("Content-Type", "text/plain");
            res.end("Bad method");
        }
    } else if (req.method === 'GET' && req.url === '/stats') {
        // формируем HTML-таблицу со статистикой
        let html = "<style>.border1{border: 1px solid #000000;}</style>";
        html += '<table class="border1">';
        for (const userAgent in stats) {
            html += `<tr><td class="border1">${userAgent}</td><td class="border1">${stats[userAgent]}</td></tr>`;
        }
        html += '</table>';
        // отправляем ответ с HTML-таблицей
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        res.end();
    }else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Not found");
    }
    
});

function updateStats(req) {
    const userAgent = req.headers['user-agent'];
    if (!stats[userAgent]) {
        stats[userAgent] = 1;
    } else {
        stats[userAgent]++;
    }
}

server.on("request", (req, res) => {
    updateStats(req);
});

server.on("connection", () => {
    console.log("Новое подключение");
});

server.listen(port, host, () => {
    console.log(`Server is on. http://${host}:${port}`)
});
