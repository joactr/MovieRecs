import {React, useState,useEffect,Fragment} from 'react';
import Caratula from '../caratula/Caratula';
import './pagPeli.scss';
import tmdbApi from '../../apiRequests';




const PagPeli = () => {

    const [ids, setIds] = useState([])
    const[ratings,setRatings] = useState([])

    useEffect(() => {
        let tipoRecs = localStorage.getItem("recomendador")
        tipoRecs = tipoRecs.split(",")
        var demog = (tipoRecs[0] === 'true');
        var conte = (tipoRecs[1] === 'true');
        var colab = (tipoRecs[2] === 'true');
        fetch("http://localhost:8080/getRecommendations?" + new URLSearchParams({
            demog: demog, conte: conte, colab: colab, user: localStorage.getItem("user_id"), nRecs: localStorage.getItem("nRecs")
        }))
        .then((response) => response.json())
            .then((res) => {
                res = res.recs
                let resIDs = []
                let resRatings = []
                for (let i = 0; i < res.length; i++){
                    resIDs.push(res[i][0])
                    resRatings.push(res[i][1])
                }
                setIds(resIDs)
                setRatings(resRatings)
        })
    },[])

    function createSet(idList,ratingList){
        console.log("creandosets")
        var caratulas = []
        for(let i=0;i<idList.length;i++){
            caratulas.push(<Caratula item={idList[i]} score={ratingList[i]} />)
        }
        return(
            <div className="movieFlex">
                {caratulas}
            </div>
        )
    }

    function createMovies(idList,ratingList){
        var divs = []
        if(idList.length>0){
            for(let i=0;i<idList.length;i+=5){
                var sub_ids = idList.slice(i, i + 5);
                var sub_ratings = ratingList.slice(i, i+5);
                divs.push(createSet(sub_ids,sub_ratings))
            }
        }
        return(divs)
    }
    

    return (
        <Fragment>
        {createMovies(ids,ratings)}
        </Fragment>
    )

}

export default PagPeli;