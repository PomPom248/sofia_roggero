require('dotenv').config();

const mongoose = require('mongoose')

module.exports = {
    datebaseConnection() {
        setTimeout(function () {
            mongoose
                .connect(process.env.MONGO_URL, { useNewUrlParser: true })
                .then(x => {
                    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
                })
                .catch(err => {
                    console.error('Error connecting to mongo', err)
                });
        }, 10000)
    }
}

