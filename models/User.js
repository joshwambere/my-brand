const mongoose = require("mongoose");

const schema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  isadmin: Boolean
});

module.exports = mongoose.model("User", schema);
