from pymongo import MongoClient

def get_db():
    client = MongoClient("mongodb+srv://kcrulzz:Kcrulzz886@cluster0.g0egu48.mongodb.net/")
    db = client["StarPredictorDB"]
    return db
