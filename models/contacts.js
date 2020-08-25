const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  email: String,
  comment: String,
  subject:String
});

module.exports = mongoose.model("contacts", schema);
