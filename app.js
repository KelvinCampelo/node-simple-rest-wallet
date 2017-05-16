const bodyParser = require('body-parser');
const load = require('express-load');
const express = require('express');
const app = express();
const SV_PORT = 3000;
const SV_IP = 'localhost';

app.use(bodyParser.json());

load('controllers')
    .then('routes')
    .into(app);

app.listen(SV_PORT, SV_IP, function () {
    console.log('Listening in ip: ', SV_IP, ', port: ', SV_PORT);
});

module.exports = app;