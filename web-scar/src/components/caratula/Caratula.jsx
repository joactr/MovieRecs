import {React,useEffect,useState} from 'react';
import './caratula.scss';
import { Link } from 'react-router-dom';
import tmdbApi from '../../apiRequests';

const Caratula = props => {

    const[idPeli,setIdPeli] = useState(-1)
    const[datosPeli,setDatosPeli] = useState({poster_path:null})

    useEffect(()=>{
        if(props.item !== -1)
            tmdbApi.detail(props.item).then((e)=>setDatosPeli(e))
    },[props.item])

    
    const imgChiquita = ("https://image.tmdb.org/t/p/original" + datosPeli.poster_path) || "https://image.tmdb.org/t/p/original"
    const imgGrande = "https://image.tmdb.org/t/p/w500" + datosPeli.backdrop_path

    const link = '/pelicula/' + props.item;

    return (
        <Link to={link} className="movie-container">
            <div className="movie-card" style={{backgroundImage: `url(${imgChiquita})`}}>
            </div>
            <h5>{datosPeli.title || datosPeli.name}</h5>
        </Link>
    );
}

export default Caratula;