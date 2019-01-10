const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    destination: String,
    body: String,
    status: { type: String, enum: ['OK - 200', 'NOT SENT - 500', 'TIMEOUT - 400'] }
})

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;