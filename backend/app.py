from flask import Flask, request
import flask
import json
from flask_cors import CORS
import random
from py1337x import py1337x
from recomendador import Recomendador


torrents = py1337x(proxy='1337x.to', cache='py1337xCache', cacheTime=500)
app = Flask(__name__)
CORS(app)
@app.route("/")
def hello():
    return "Hello, World!"
@app.route('/users', methods=["GET"])
def users():
    print("users endpoint reached...")
    lista = [random.randint(100,30000) for i in range (random.randint(3,20))]
    data = {"ids":lista}
    return flask.jsonify(data)
@app.route('/downloadMovie',methods=["GET"])
def downloadMovie():
    args = request.args.to_dict(flat=False)
    movieName = args["movieName"][0]
    results = torrents.search(movieName, category='movies', sortBy='seeders', order='desc') 
    magnet = torrents.info(link=results["items"][0]["link"]) 
    return flask.jsonify(magnet)
if __name__ == "__main__":
    app.run("localhost", 8080)