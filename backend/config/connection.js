const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoConnection = (callback) => {
    mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
    }).then(callback);
}

module.exports = mongoConnection;