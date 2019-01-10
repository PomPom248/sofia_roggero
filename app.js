
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

mongoose
    .connect('mongodb://sofia_roggero_mongodb_1/cabify-bootcamp', { useNewUrlParser: true })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .then(() => {
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    });

app.use(bodyParser.json());

app.use('/', require('./server/index'));

app.listen(9001, () => { console.log('listening to port 9001') })
module.exports = app;