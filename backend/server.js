const express = require('express');
const routes = require('./routes');
const mongoConnection = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

mongoConnection(() => {
    app.listen(PORT, () => {
      console.log(`Running on port: ${PORT}!`);
    });
  });
