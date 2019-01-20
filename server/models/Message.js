require('dotenv').config();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const database = require('../database')
const messageSchema = new Schema({
    destination: String,
    body: String,
    msjID: String,
    status: { type: String, enum: ['OK - 200', 'ERROR - 500', 'TIMEOUT - 400', 'PENDING'] }
})

module.exports = (key) => database.get(key).model("Message", messageSchema);