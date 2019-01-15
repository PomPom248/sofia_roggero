require('dotenv').config();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { getPrimary } = require('../database')

const messageSchema = new Schema({
    destination: String,
    body: String,
    status: { type: String, enum: ['OK - 200', 'ERROR - 500', 'TIMEOUT - 400'] }
})


module.exports = (primary) => {
    getPrimary(primary).model('Message', messageSchema)
}

//FUNCIONA
// const primaryConnection = mongoose.createConnection(process.env.MONGO_LOCAL)
// const secondaryConnection = mongoose.createConnection(process.env.MONGO_TWO)


// const originalMessage = primaryConnection.model("Message", new Schema({
//     destination: String,
//     body: String,
//     status: { type: String, enum: ['OK - 200', 'ERROR - 500', 'TIMEOUT - 400']
// }))
// const copyMessage = secondaryConnection.model("copyMessage", new Schema({
//     destination: String,
//     body: String,
//     status: { type: String, enum: ['OK - 200', 'ERROR - 500', 'TIMEOUT - 400']
// }))
//module.exports={originalMessage,copyMessage}