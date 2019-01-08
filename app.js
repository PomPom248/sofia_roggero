
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', require('./server/index'));
// app.use('/', require('./server/message'));

app.listen(9001, () => { console.log('listening to port 9001') })
module.exports = app;