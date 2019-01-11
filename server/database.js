const mongoose = require('mongoose')

module.exports = {
    datebaseConnection(dbURL) {
        setTimeout(function () {
            mongoose
                .connect(dbURL, { useNewUrlParser: true })
                .then(x => {
                    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
                })
                .catch(err => {
                    console.error('Error connecting to mongo', err)
                });
        }, 10000)
    }
}

