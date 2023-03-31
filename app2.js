const express = require("express");

const restApi = require('./v1/rest');

const app2 = express();

app2.use(express.static('public'));
app2.use('/v1', restApi);

app2.listen(5500, '127.0.0.2', () => {
    console.log("server is running http://127.0.0.2:5500/v1");
})
