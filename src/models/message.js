const mongoose = require("mongoose");
const database = require("../database");

let messageSchema = new mongoose.Schema({
  destination: String,
  body: String,
  msj_id: { type: String, unique: true },
  response_msj: { type: String },
  location: {
    name: {
      type: String,
      default: "Default"
    },
    cost: {
      type: Number,
      default: 1
    }
  },
  status: {
    type: String,
    enum: ["ERROR", "OK", "TIMEOUT"]
  }
});

module.exports = (dbKey) => database.get(dbKey).model("Message", messageSchema);
