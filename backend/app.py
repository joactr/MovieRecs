from flask import Flask
import flask
import json
from flask_cors import CORS
import random


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
if __name__ == "__main__":
    app.run("localhost", 8080)