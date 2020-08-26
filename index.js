const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT || process.env.LOCAL_PORT;
const app = express();
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log("Error while trying to connect ", error);
  });

app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.send("WELCOME TO MY BRAND");
});

app.use(router);
module.exports = app.listen(PORT, () =>
  console.log(`listening on port ${PORT}`)
);
