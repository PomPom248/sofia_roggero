require('dotenv').config();

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const database = require('../database')

const creditSchema = new Schema({
    amount: Number
})

module.exports = (key) => database.get(key).model("Credit", creditSchema)