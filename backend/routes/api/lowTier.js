const router = require("express").Router();
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

router.get("/btc", async (req, res) => {
  if (req.headers.apikey) {
    const client = new MongoClient(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    await client.connect();
    const apiCheck = await client
      .db("users")
      .collection("users")
      .findOne({ apikey: req.headers.apiKey });

    if (apiCheck) {
      const cursor = await client
        .db("data")
        .collection("live")
        .find()
        .sort({ Timestamp: 1 });
      const results = await cursor.toArray();
      res.json(results);
    } else {
      res.send("something went wrong");
    }
  } else {
    res.json("You must provide a valid API key in the request headers.");
  }
});

module.exports = router;
