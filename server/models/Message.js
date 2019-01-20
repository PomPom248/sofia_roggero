require('dotenv').config();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const database = require('../database')
const messageSchema = new Schema({
    msjID: String,
    destination: String,
    body: String,
    statusCode: { type: String, enum: ['OK - 200', 'ERROR - 500', 'TIMEOUT - 400', 'PENDING'] }
})

module.exports = (key) => database.get(key).model("Message", messageSchema);