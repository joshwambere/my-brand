const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes");
require("dotenv").config();
const swaggerJsDoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');

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

const swaggerOptions={
  swaggerDefinition:{
    info:{
      version: "1.0.0",
      title:"My brand Express API",
      description:"The API below are the api which will be used in the protofolio website",
      contact:{
        name:"Johnson Dusabe",
        email:'johnsondusabe@gmail.com'
      },
      servers:[`http://localhost:${PORT}`], 
    },
    basePath: "/api",
  },
  
  apis:['./swagger.yml']
};
const swaggerDocs=swaggerJsDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(router);
module.exports = app.listen(PORT, () =>
  console.log(`listening on port ${PORT}`)
);
