function generateApiKey() {
    const {randomBytes} = require("crypto");
    const apiKey = randomBytes(16).toString("hex");
    const hashedApiKey = hashApiKey(apiKey);

    return {apiKey, hashedApiKey}
}

function hashApiKey(apiKey) {
    const { createHash } = require("crypto");

    return createHash("md5").update(apiKey).digest("hex");
}

module.exports = generateApiKey;