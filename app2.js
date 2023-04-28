const express = require("express");
const helmet = require('helmet');
const morgan = require('morgan');

const restApi = require('./v2/rest');

const app2 = express();
app2.use(helmet());
app2.use(morgan('tiny'));
app2.use(express.static('public'));
//app2.use('/v1', restApi);
app2.use('/v2', restApi);


app2.use((req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.status(404).send("Not found");
});

app2.listen(5500, '127.0.0.1', () => {
    console.log("server is running http://127.0.0.1:5500/v2");
})

