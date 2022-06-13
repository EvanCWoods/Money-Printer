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
    timeframes = [200, 100, 50, 20, 10]
    # LOOP THROUGH AND ISOLATE THE CLOSING PRICE
    prices = []
    timestamps = []
    signals = []
    for item in data:
        prices.append(item["Close"])  
        timestamps.append(item["timestamp"])  



    def averages(prices, rate, timestamps):
        prices = prices[-rate:]
        timestamps = timestamps[-rate:] 
        averages = getMa(prices, rate)    # GET THE AVERAGE
        prices = np.array(prices[(rate-1):]).flatten()  # ADJUST FOR THE LOSS IN AVERAGE CALCULATION
        timestamps = np.array(timestamps[(rate-1):]).flatten()   # ADJUST FOR THE LOSS IN AVERAGE CALCULATION
        averages = np.array(averages[(rate-1):]).flatten()   # ADJUST FOR THE LOSS IN AVERAGE CALCULATION

        return averages

    
    def get_bollinger_bands(prices, rate):
        sma = getMa(prices, rate)
        std = pd.DataFrame(prices).rolling(rate).std()
        bollinger_up = sma + std * 2 # Calculate top band
        bollinger_down = sma - std * 2 # Calculate bottom band
        return {"bollinger_up": np.array(bollinger_up).flatten()[-1], "sma": np.array(sma).flatten()[-1], "bollinger_down": np.array(bollinger_down).flatten()[-1]}

        
    def rsiIndex(prices, periods):
        close_delta = pd.DataFrame(prices).diff()

        # Make two series: one for lower closes and one for higher closes
        up = close_delta.clip(lower=0)
        down = -1 * close_delta.clip(upper=0)
        
        # Use exponential moving average
        ma_up = up.ewm(com = periods - 1, adjust=True, min_periods = periods).mean()
        ma_down = down.ewm(com = periods - 1, adjust=True, min_periods = periods).mean()
            
        rsi = ma_up / ma_down
        rsi = 100 - (100/(1 + rsi))
        return np.array(rsi).flatten()[-1]


    def getSignal(price, rate):
        if (price > float(averages(prices, rate, timestamps)[-1])):
            return "Buy"
        else:
            return "Sell"

    n = 201
    forDb = []
    ticker = "BTC"
    
    while n < len(prices):
        forDb.append(
            {
            "Timestamp": int(timestamps[n]),
            "Ticker": ticker,
            "Close": float(prices[n]),
            "Indicators": {
                "TimeFrame200": {
                    "MA200": float(averages(prices[n-200:n], 200, timestamps)[0]),
                    "BollingerBands": get_bollinger_bands(prices[n-200:n], 200),
                    "RSI": rsiIndex(prices[n-201:n], 200)
                },
                "TimeFrame100": {
                    "MA100": float(averages(prices[n-100:n], 100, timestamps)[0]),
                    "BollingerBands": get_bollinger_bands(prices[n-100:n], 100),
                    "RSI": rsiIndex(prices[n-101:n], 100)
                },
                "TimeFrame50": {
                    "MA50": float(averages(prices[n-50:n], 50, timestamps)[0]),
                    "BollingerBands": get_bollinger_bands(prices[n-50:n], 50),
                    "RSI": rsiIndex(prices[n-51:n], 50)
                },
                "TimeFrame20": {
                    "MA20": float(averages(prices[n-20:n], 20, timestamps)[0]),
                    "BollingerBands": get_bollinger_bands(prices[n-20:n], 20),
                    "RSI": rsiIndex(prices[n-21:n], 20)
                },
                "TimeFrame10": {
                    "MA10": float(averages(prices[n-10:n], 10, timestamps)[0]),
                    "BollingerBands": get_bollinger_bands(prices[n-10:n], 10),
                    "RSI": rsiIndex(prices[n-11:n], 10)
                }
            }, 
            "Signal": getSignal(prices[n], 200)
            }
        )
        n+=1

    
    return forDb

# FUNCTION TO GET AVERAGE
def getMa(prices, rate):
    return pd.DataFrame(prices).rolling(rate).mean()


def main():
    cluster = MongoClient(RAW_MONGO_URI,
            ssl_cert_reqs=ssl.CERT_NONE)
    db = cluster["algorithm"]
    schema = db["bitcoin"]
    data = analysis()
    schema.insert_many(data)


if __name__ == '__main__':
    main()



    # averages = getMa(pd.DataFrame(prices), RATE)    # GET THE AVERAGE
    # prices = np.array(prices[199:]).flatten()  # ADJUST FOR THE LOSS IN AVERAGE CALCULATION
    # timestamps = np.array(timestamps[199:]).flatten()   # ADJUST FOR THE LOSS IN AVERAGE CALCULATION
    # averages = np.array(averages[199:]).flatten()   # ADJUST FOR THE LOSS IN AVERAGE CALCULATION

        
    # i = 0
    # while i < len(prices):
    #     if (prices[i] > averages[i]):
    #         signals.append("Buy")
    #     else:
    #         signals.append("Sell")
    #     i+=1

    # # CREATE AND ADD NEW OBJECTS TO DATABASE
    # forDB = []

    # n = 0
    # while n < len(prices):
    #     # RE ASSIGN THE TICKER VALUE
    #     ticker = "BTC"

    #     forDB.append(
    #         {
    #             "Timestamp": int(timestamps[n]),
    #             "Ticker": str(ticker),
    #             "Close": float(prices[n]),
    #             "MA200": float(averages[n]),
    #             "Signal": str(signals[n])
    #         }
    #     )
    #     n+=1

    # return forDB