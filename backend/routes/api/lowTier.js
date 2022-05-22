const router = require("express").Router();
const { MongoClient } = require("mongodb")
const dotenv = require("dotenv");

dotenv.config()


router.get("/btc", async (req, res) => {
    const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true });
    await client.connect();
    const cursor = client.db("data").collection("live").find(
    
    ).sort({ "Timestamp": 1 });
    const results = await cursor.toArray();
    res.send(results);
})

module.exports = router;