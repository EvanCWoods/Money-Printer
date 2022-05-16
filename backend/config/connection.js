const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function main() {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log("Connected")).catch(err => {
        console.log(err);
    });
}

module.exports = main;