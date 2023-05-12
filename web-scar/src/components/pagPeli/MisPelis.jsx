import {React, useState,useEffect,Fragment} from 'react';
import Caratula from '../caratula/Caratula';
import './pagPeli.scss';
import tmdbApi from '../../apiRequests';




const MisPelis = () => {

    const [ids, setIds] = useState([])
    const[ratings,setRatings] = useState([])

    useEffect(()=>{fetch("http://localhost:8080/getRatedMovies?"+ new URLSearchParams({
        uid: localStorage.getItem("user_id")}))
    .then((response) => response.json())  
        .then((res) => {
            setIds(res.movies)
            setRatings(res.ratings)})
    }
    ,[])

    useEffect(()=>console.log(ids),[ids])

    function createSet(idList,ratingList){
        console.log("creandosets")
        var caratulas = []
        for(let i=0;i<idList.length;i++){
            caratulas.push(<Caratula item={idList[i]} rating={ratingList[i]} />)
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

export default MisPelis;