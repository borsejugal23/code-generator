// server/model/code.model.js
const mongoose = require("mongoose");

const codeSchema =  mongoose.Schema({
  value: { type: String, unique: true },
  createdAt: { type: Date,  default: Date.now },
  used: { type: Boolean, default: false },
});

const Code = mongoose.model("Code", codeSchema);

module.exports = Code;
