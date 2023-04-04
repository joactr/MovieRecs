import {React, useState,useEffect,Fragment} from 'react';
import Caratula from '../caratula/Caratula';
import './pagPeli.scss';
import tmdbApi from '../../apiRequests';




const PagPeli = () => {

    const[ids,setIds] = useState([])

    useEffect(()=>{fetch("http://localhost:8080/users")
    .then((response) => response.json())  
	.then((res) => setIds(res.ids))}
    ,[])

    useEffect(()=>console.log(ids),[ids])

    function createSet(idList){
        console.log("creandosets")
        var caratulas = []
        for(let i=0;i<idList.length;i++){
            caratulas.push(<Caratula item={idList[i]} />)
        }
        return(
            <div className="movieFlex">
                {caratulas}
            </div>
        )
    }

    function createMovies(idList){
        var divs = []
        if(idList.length>0){
            for(let i=0;i<idList.length;i+=5){
                var sub_ids = idList.slice(i, i+5);
                divs.push(createSet(sub_ids))
            }
        }
        
        return(divs)
    }
    

    return (
        <Fragment>
        {createMovies(ids)}
        </Fragment>
    )

}

export default PagPeli;