require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const database = require('./server/database')

app.use('/', (bodyParser.json()), require('./server/index'));
database.datebaseConnection(process.env.MONGO_URL)


app.listen(process.env.PORT, () => { console.log(`listening to port ${process.env.PORT}`) })
module.exports = app;