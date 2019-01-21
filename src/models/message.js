const mongoose = require("mongoose");
const database = require("../database");

let messageSchema = new mongoose.Schema({
  destination: String,
  body: String,
  // msjID: { type: String, default: 'Default' },
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
    enum: ["ERROR", "OK", "TIMEOUT", "PENDING"],
    default: "PENDING"
  }
});

module.exports = (dbKey) => database.get(dbKey).model("Message", messageSchema);
