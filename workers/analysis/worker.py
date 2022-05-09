from decouple import config
from pymongo import MongoClient
import ssl
import numpy as np
import pandas as pd
import sys
import time

HOUR = 3600
RAW_MONGO_URI = config("RAW_MONGO_URI")
RATE = 200


def getSchemas(schema, URI, clusterName):
    cluster = MongoClient(URI,
            ssl_cert_reqs=ssl.CERT_NONE)
    db = cluster[clusterName]
    return db[schema]



def analysis():
    collections = ["live", "ethereum", "binance"]
    for name in collections:
        data = list(getSchemas(name, RAW_MONGO_URI, "data").find().sort("timestamp", 1))    # FOR EACH SCHEMA, GET THE DATA IN ASCENDING TIME ORDER
            
        # LOOP THROUGH AND ISOLATE THE CLOSING PRICE
        prices = []
        timestamps = []
        signals = []
        for item in data:
            prices.append(item["Close"])  
            timestamps.append(item["timestamp"])  
        
        prices = prices[-200:]
        timestamps = timestamps[-200:]
        

        averages = getMa(pd.DataFrame(prices), RATE)    # GET THE AVERAGE
        prices = np.array(prices[199:]).flatten()  # ADJUST FOR THE LOSS IN AVERAGE CALCULATION
        timestamps = np.array(timestamps[199:]).flatten()   # ADJUST FOR THE LOSS IN AVERAGE CALCULATION
        averages = np.array(averages[199:]).flatten()   # ADJUST FOR THE LOSS IN AVERAGE CALCULATION

        
        if (prices > averages):
            signals.append("Buy")
        else:
            signals.append("Sell")

        # CREATE AND ADD NEW OBJECTS TO DATABASE
    
        # RE ASSIGN THE TICKER VALUE
        if (name == "live"):
            ticker = "BTC"
        elif (name == "ethereum"):
            ticker = "ETH"
        elif (name == "binance"):
            ticker = "BNB"


        return {
                "Timestamp": str(timestamps[-1]),
                "Ticker": ticker,
                "Close": float(prices[-1]),
                "MA200": float(averages[-1]),
                "Signal": str(signals[-1])
                }
        
    


def getHours():
    currentTime = int(time.time())

    if (currentTime % HOUR == 0):
        time.sleep(5)
        collections = ["bitcoin", "ethereum", "binance"]
        for name in collections:
            db = getSchemas(name, RAW_MONGO_URI, "algorithm")
            db.insert_one(analysis())

        time.sleep(1)
    else:
        time.sleep(1)
        getHours()






# FUNCTION TO GET AVERAGE
def getMa(prices, rate):
    return prices.rolling(rate).mean()


def main():
    data = analysis()
    print(data)
    sys.exit(1)


if __name__ == '__main__':
    main()