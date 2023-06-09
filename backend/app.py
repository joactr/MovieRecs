from py1337x import py1337x
from flask import Flask, request
import flask
import json
from flask_cors import CORS
from flask_api import status
import random
from recomendador import Recomendador

recom = Recomendador(data_path='./')
recom.load_grupos_demograficos()
recom.load_preferencias(path="./preferencias.npz",path_dg="./preferencias_demografico.npz")
#recom.save_all_neighbours()
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

@app.route('/registerUser',methods=["POST"])
def registerUser():
    reqData = request.get_json()
    print(reqData["preferences"])
    recom.register_user(reqData["age"], reqData["genero"], reqData["profesion"], reqData["username"])
    uid = recom.get_username_id(reqData["username"])
    recom.save_user_pref(uid,reqData["preferences"])
    recom.obtener_vecinos(recom.preferencias_coop,uid,200)
    recom.save_user_neighbours(uid)
    recom.grupos_demograficos[uid] = recom.get_user_type(reqData["genero"], reqData["age"], reqData["profesion"])
    print(recom.grupos_demograficos)
    return flask.jsonify({"user_id":uid})

@app.route('/logIn',methods=["POST"])
def logIn():
    reqData = request.get_json()
    if recom.log_in(reqData["username"],reqData["password"]):
        uid = recom.get_username_id(reqData["username"])
        return flask.jsonify({"user_id":uid}) 
    else:
        return "Password/User mismatch", status.HTTP_400_BAD_REQUEST

@app.route('/getRatedMovies',methods=["GET"])
def getRatedMovies():
    args = request.args.to_dict(flat=False)
    req_uid = args["uid"][0]
    recoms = recom.get_user_films(int(req_uid))
    aux = []
    for rec in recoms[0]:
        aux.append(recom.tmdb_id(rec))
    return flask.jsonify({"movies":aux, "ratings":recoms[1]}) 

@app.route('/getRecommendations',methods=["GET"])
def getRecommendations():
    args = request.args.to_dict(flat=False)
    demog = args["demog"][0] == "true"
    conte = args["conte"][0] == "true"
    colab = args["colab"][0] == "true"
    nRecs = int(args["nRecs"][0])
    uid = int(args["user"][0])
    print(nRecs,uid)

    recs = []
    if demog and not conte and not colab: #demografica
        return flask.jsonify({"recs":recom.obtener_recomendacion_dg(uid,nRecs)})
    elif not demog and conte and not colab: #contenido
        return flask.jsonify({"recs":recom.obtener_recomendacion_contenido(uid,nRecs)})
    elif not demog and not conte and colab: #colaborativa
        return flask.jsonify({"recs":recom.obtener_recomendacion_colaborativa(uid,nRecs)})
    elif not demog and not conte and not colab: #ninguna
        return flask.jsonify({"recs":[[],[]]})
    else: #Hibrido
        return flask.jsonify({"recs":recom.obtener_recomendacion_hyb(uid,[colab,conte,demog],nRecs)})

if __name__ == "__main__":
    app.run("localhost", 8080)