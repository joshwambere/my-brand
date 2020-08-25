const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT || process.env.LOCAL_PORT;
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }).then(() => {
  const app = express();
  app.use(bodyParser.json());

  app.get("/", (req, res) => {
    return res.send("WELCOME TO MY BRAND");
  });
  app.use(router);
  app.listen(PORT, () => {
    console.log("connection started!");
  });
});
