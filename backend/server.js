const express = require('express');
const routes = require('./routes');
const mongoConnection = require('./config/connection');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());
app.use(routes);

mongoConnection();

app.use('/images', express.static(path.join(__dirname, '../client/images')));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}!`);
});