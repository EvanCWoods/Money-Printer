const router = require("express").Router();
const { MongoClient } = require("mongodb")
const dotenv = require("dotenv");

dotenv.config()


router.get("/", async (req, res) => {
    const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true });
    await client.connect();

    const endpoints = ["bitcoin", "ethereum", "binance"]
    let dataArray = [];
    for (let i = 0; i < endpoints.length; i++) {
        const cursor = client.db("algorithm").collection(endpoints[i]).find(
    
            ).sort({ "Timestamp": 1 });
            const results = await cursor.toArray();
        
            let currentData = {
                "_id": results[results.length - 1]._id,
                "Timestamp": results[results.length - 1].Timestamp,
                "Ticker": results[results.length - 1].Ticker,
                "Close": results[results.length - 1].Close,
                "MA200": results[results.length - 1].Indicators.TimeFrame200.MA200,
                "Signal": results[results.length - 1].Signal
            }
        
            let swapData;
        
            for (let i = 1; i < results.length; i++) {
                console.log(results[i].Timestamp)
                if (results[i].Signal != currentData.Signal) {
                    // console.log(currentData.Timestamp, results[i].Timestamp)
                    swapData = {
                        "_id": results[i - 1]._id,
                        "Timestamp": results[i - 1].Timestamp,
                        "Ticker": results[i - 1].Ticker,
                        "Close": results[i - 1].Close,
                        "MA200": results[i - 1].MA200,
                        "Signal": results[i - 1].Signal
                    };
                }
            }        
            
            let finalDataObject = {
                "OpenTimestamp": swapData.Timestamp,
                "CurrentTimestamp": currentData.Timestamp,
                "Duration": Math.floor(((currentData.Timestamp - swapData.Timestamp) / 3600) / 24),
                "Ticker": currentData.Ticker,
                "PositionStart": swapData.Close.toFixed(2),
                "LastClose": currentData.Close.toFixed(2),
                "Performance": "",
                "CurrentMa": currentData.MA200.toFixed(2),
                "Signal": currentData.Signal
            }
        
            if (currentData.Signal == "Sell") {
                finalDataObject.Performance = (-1 * ((currentData.Close - swapData.Close) / swapData.Close) * 100).toFixed(2);
            } else {
                finalDataObject.Performance = (((currentData.Close - swapData.Close) / swapData.Close) * 100).toFixed(2);
            }

            dataArray.push(finalDataObject);
    }
    res.send(dataArray);
});

module.exports = router;    