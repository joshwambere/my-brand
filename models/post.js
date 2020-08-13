const mongoose = require("mongoose")

const schema = mongoose.Schema({
  title: String,
  cover:String,
  createdAt:Date,
  content: String
})

module.exports = mongoose.model("Post", schema)