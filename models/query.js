const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  email: String,
  comment: String,
  post_id:String
});

module.exports = mongoose.model("comment", schema);
