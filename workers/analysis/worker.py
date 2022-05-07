from decouple import config
from pymongo import MongoClient
import ssl
import numpy as np
import pandas as pd

HOUR = 3600
RAW_MONGO_URI = config("RAW_MONGO_URI")
RATE = 200


def getSchemas(schema):
    cluster = MongoClient(RAW_MONGO_URI,
            ssl_cert_reqs=ssl.CERT_NONE)
    db = cluster["data"]
    return db[schema]



def analysis():
    data = list(getSchemas("live").find().sort("timestamp", 1))    # FOR EACH SCHEMA, GET THE DATA IN ASCENDING TIME ORDER
        
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
    ticker = "BTC"

    print(
        {
            "Timestamp": timestamps[-1],
            "Ticker": ticker,
            "Close": prices[-1],
            "MA200": averages[-1],
            "Signal": signals[-1]
            }
        )
    



# FUNCTION TO GET AVERAGE
def getMa(prices, rate):
    return prices.rolling(rate).mean()


def main():
    analysis()


if __name__ == '__main__':
    main()