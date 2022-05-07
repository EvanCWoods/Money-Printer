# IMPORT LIBRARIES
from decouple import config
from pymongo import MongoClient
import os
import ssl

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
    schemaList = ["live", "ethereum", "binance"]    # LIST THE SCHEMAS TO BE LOOPED
    for element in schemaList:
        data = list(getSchemas(element).find().sort("timestamp", 1))    # FOR EACH SCHEMA, GET THE DATA IN ASCENDING TIME ORDER
        newObject = {
            "Timestamp": data.timestamp,
            "Ticker": element,
            "Price": data.Close,
        }



# FUNCTION TO SEND THE NEW DATA TO THE NEW DATABASE
    # MULTIPLE SCHEMAS


# RUN THE WORKER EVERY HOUR, 5 SECONDS AFTER THE NEW HOUR, TO ENSURE NEW DATA IS IN ALL SCHEMAS.





def main():
    analysis()


if __name__ == '__main__':
    main()