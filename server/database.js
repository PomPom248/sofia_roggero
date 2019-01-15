const mongoose = require('mongoose')

module.exports = {
    datebaseConnection(dbURL) {
        setTimeout(function () {
            mongoose
                .createConnection(dbURL, { useNewUrlParser: true })
                .then(x => {
                    console.log(`Connected to Mongo! Database name: "${x.name}"`)
                })
                .catch(err => {
                    console.error('Error connecting to mongo', err)
                });
        }, 10000)
    }
}
