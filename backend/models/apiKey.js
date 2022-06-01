const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const apiKeySchema = new mongoose.Schema({
    
})

const apiKey = mongoose.model("api_keys", apiKeySchema);

module.exports = apiKey;