const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser")

const routes = require("./routes") 
mongoose
  .connect("mongodb://172.17.0.3:27017/aroma", { useNewUrlParser: true })
  .then(() => {
    const app = express()
    app.use(bodyParser.json())
    app.use("/api", routes)
    app.listen(5000, () => {
      console.log("Server has started!")
    })
  })


