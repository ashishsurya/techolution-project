import sqlite3

import pymongo
from flask import Flask, json, request
from flask.json import jsonify
from pymongo import ssl_support

app = Flask(__name__)



client = pymongo.MongoClient("mongodb+srv://surya2:surya2@cluster0.wgzps.mongodb.net/test?retryWrites=true&w=majority",ssl=True,
    ssl_cert_reqs=ssl_support.CERT_NONE,)
db = client.test
collection = db["planograms"]


@app.route("/")
def index():
  return jsonify(message="Hi")

@app.post("/planogram")
def addPlanogram():
  body_data = request.get_json()
  collection.insert_one(body_data)
  return jsonify(message=body_data)

  # return jsonify(message="J

@app.get("/planogram")
def getPlanogram():
  planogramCur = collection.find()
  res_data = [i for i in planogramCur]
  return jsonify(res_data)


if __name__ == "__main__":
  app.run(debug=True)
