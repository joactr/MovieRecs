import {React,useEffect,useState} from 'react';
import './caratula.scss';
import { Link } from 'react-router-dom';
import tmdbApi from '../../apiRequests';
import StarRateIcon from '@mui/icons-material/StarRate';

const Caratula = props => {

    const[idPeli,setIdPeli] = useState(-1)
    const [datosPeli, setDatosPeli] = useState({ poster_path: null })
    const [rating, setRating] = useState(null)
    const [score,setScore] = useState(null)

    useEffect(()=>{
        if(props.item !== -1)
            tmdbApi.detail(props.item).then((e) => setDatosPeli(e))
        if (props.rating)
            setRating(props.rating)
        if (props.score)
            setScore(props.score)
    }, [props.item])
    
    function setStars() {
        if (rating) {
            let res =
                []
            for (let i = 0; i < rating; i++){
                res.push(<StarRateIcon></StarRateIcon>)
            }
            return(res)
        }else{return(<p/>)}
    }

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }

    function setAffinity() {
        if (score)
            return Math.round(Math.min(99,Number(score*50)))+"%"
    }

    
    const imgChiquita = ("https://image.tmdb.org/t/p/w300" + datosPeli.poster_path) || "https://image.tmdb.org/t/p/w500"
    const imgGrande = "https://image.tmdb.org/t/p/w500" + datosPeli.backdrop_path

    const link = '/pelicula/' + props.item;

    return (
        <Link to={link} className="movie-container">
            <div className="movie-card" style={{backgroundImage: `url(${imgChiquita || imgGrande})`}}>
            </div>
            <h5>{datosPeli.title || datosPeli.name}</h5>
            <div className='starContainer'>{setStars()}</div>
            {/*<div className='starContainer'>{setAffinity()}</div>*/}
        </Link>
    );
}

export default Caratula;