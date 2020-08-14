const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  content: String,
  img: String,
  date: Date
});

module.exports = mongoose.model("Post", schema);
