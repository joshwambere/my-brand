const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
mongoose
  .connect(
    'mongodb+srv://johnson:johnson1@johnson.4lkdx.mongodb.net/aroma',
    { useNewUrlParser: true }
  )
  .then(() => {
    const app = express();
    app.use(bodyParser.json());

    app.use('/api', routes);
    app.get('/', (req, res) => {
      return res.send('WELCOME TO MY BRAND');
    });

    app.listen(PORT, () => {
      console.log('connection started!');
    });
  });
