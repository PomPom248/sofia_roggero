require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const database = require('./server/database')
// const secondaryDatabase = require('./server/secondaryDatabase')

app.use('/', (bodyParser.json()), require('./server/index'));
// database.datebaseConnection(process.env.MONGO_URL)
database.datebaseConnection(process.env.MONGO_LOCAL)
database.datebaseConnection(process.env.MONGO_TWO)



app.listen(process.env.PORT, () => { console.log(`listening to port ${process.env.PORT}`) })
module.exports = app;