const express = require('express');
const routes = require('./routes');
const mongoConnection = require('./config/connection');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());
app.use(routes);

mongoConnection();

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}!`);
});