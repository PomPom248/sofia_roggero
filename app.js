
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.use('/', require('./server/index'));

app.listen(9001, () => { console.log('listening to port 9001') })
module.exports = app;