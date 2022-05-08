# IMPORT LIBRARIES
from decouple import config
from pymongo import MongoClient
import ssl
import pandas as pd
import numpy as np


### 
# NOTES FOR TOMORROW:
    # THIS ONLY APPLIES TO BTC DATA RIGHT NOW SO CAN CURATE THIS TO BE ONE TIME USE SCRIPT
        # GLOBAL VARIABLES THAT ARE EASY TO CHANGE FOR EACH COINTS
    
    # SET UP WORKER TO RUN THIS EVERY HOUR BEFORE ADDING DATA TO THE DATABASE

###

# GLOBAL VARIABLES
HOUR = 3600
RAW_MONGO_URI = config("RAW_MONGO_URI")
RATE = 200



# FUNCTION TO LOOP THROUGH ALL DATABASE SCHEMAS
def getSchemas(schema):
    cluster = MongoClient(RAW_MONGO_URI,
            ssl_cert_reqs=ssl.CERT_NONE)
    db = cluster["data"]
    return db[schema]


# FUNCTION TO PERFORM ANALYSIS ON THE DATA FORM EACH SCHEMA
    # RETURN AN OBJECT WITH TIMESTAMP, AVERAGES, TICKER, PRICE, BUY/SELL ETC.
def analysis():
    data = list(getSchemas("live").find().sort("timestamp", 1))    # FOR EACH SCHEMA, GET THE DATA IN ASCENDING TIME ORDER
        
    # LOOP THROUGH AND ISOLATE THE CLOSING PRICE
    prices = []
    timestamps = []
    signals = []
    for item in data:
        prices.append(item["Close"])  
        timestamps.append(item["timestamp"])  

    averages = getMa(pd.DataFrame(prices), RATE)    # GET THE AVERAGE
    prices = np.array(prices[199:]).flatten()  # ADJUST FOR THE LOSS IN AVERAGE CALCULATION
    timestamps = np.array(timestamps[199:]).flatten()   # ADJUST FOR THE LOSS IN AVERAGE CALCULATION
    averages = np.array(averages[199:]).flatten()   # ADJUST FOR THE LOSS IN AVERAGE CALCULATION
        
    i = 0
    while i < len(prices):
        if (prices[i] > averages[i]):
            signals.append("Buy")
        else:
            signals.append("Sell")
        i+=1

    # CREATE AND ADD NEW OBJECTS TO DATABASE
    forDB = []

    n = 0
    while n < len(prices):
        # RE ASSIGN THE TICKER VALUE
        ticker = "BTC"

        forDB.append(
            {
                "Timestamp": timestamps[n],
                "Ticker": ticker,
                "Close": prices[n],
                "MA200": averages[n],
                "Signal": signals[n]
            }
        )
        n+=1

    print(len(forDB))

# FUNCTION TO GET AVERAGE
def getMa(prices, rate):
    return prices.rolling(rate).mean()

# FUNCTION TO RUN THE ALGORITHM


# FUNCTION TO SEND THE NEW DATA TO THE NEW DATABASE
    # MULTIPLE SCHEMAS


# RUN THE WORKER EVERY HOUR, 5 SECONDS AFTER THE NEW HOUR, TO ENSURE NEW DATA IS IN ALL SCHEMAS.





def main():
    analysis()


if __name__ == '__main__':
    main()