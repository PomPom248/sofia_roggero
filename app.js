require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use('/', (bodyParser.json()), require('./server/index'))


app.listen(process.env.PORT, () => { console.log(`listening to port ${process.env.PORT}`) })
module.exports = app;