const router = require("express").Router();
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

router.get("/all/btc", async (req, res) => {
    console.log(req.headers);
  if (req.headers.apikey) {
    const client = new MongoClient(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    await client.connect();
    const apiCheck = await client
      .db("users")
      .collection("users")
      .findOne({ apiKey: req.headers.apikey });

    if (apiCheck) {
      const cursor = await client
        .db("algorithm")
        .collection("bitcoin")
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


router.get("/current/btc", async (req, res) => {
    if (req.headers.apikey) {
      const client = new MongoClient(process.env.MONGO_URI, {
        useNewUrlParser: true,
      });
      await client.connect();
      const apiCheck = await client
        .db("users")
        .collection("users")
        .findOne({ apiKey: req.headers.apikey });
  
      if (apiCheck) {
        const cursor = await client
          .db("algorithm")
          .collection("bitcoin")
          .find()
          .sort({ Timestamp: 1 });
        let results = await cursor.toArray();
        results = results[results.length - 1];
        res.json(results);
      } else {
        res.send("something went wrong");
      }
    } else {
      res.json("You must provide a valid API key in the request headers.");
    }
  });

module.exports = router;
