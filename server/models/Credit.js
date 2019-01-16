require('dotenv').config();

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const database = require('../database')

const creditSchema = new Schema({
    amount: Number
})

module.exports = (key) => database.getPrimary(key).model('Credit', creditSchema)

// module.exports = function creditCheck() {
//     database.getPrimary().model('Credit', creditSchema)
// }
//FUNCIONA

// const primaryConnection = mongoose.createConnection(process.env.MONGO_LOCAL)
// const secondaryConnection = mongoose.createConnection(process.env.MONGO_TWO)

// const originalCredit = primaryConnection.model("Credit", new Schema({
//     amount: Number
// }))

// const copyCredit = secondaryConnection.model("copyCredit", new Schema({
//     amount: Number
// }))
//module.exports={originalCredit,copyCredit}