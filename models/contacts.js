const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  email: String,
  message: String,
  subject:String
});

module.exports = mongoose.model("contacts", schema);
