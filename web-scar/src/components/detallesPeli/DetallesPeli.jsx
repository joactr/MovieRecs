import {React, useState,useEffect,Fragment} from 'react';
import { useParams } from 'react-router';
import tmdbApi from '../../apiRequests';
import omdbApi from '../../omdbApi';
import CastList from './reparto';
import './detallesPeli.scss';
import rotten from './Rotten_Tomatoes.png';
import imdbLogo from './imdb.png';
import metacriticLogo from './Metacritic.png';


const DetallesPeli = () => {

    const [datosPeli, setDatosPeli] = useState(null);
    const [datosomdb,setDatosomdb] = useState(null);
    const [rottenRating,setRottenRating] = useState(null);

    const {id} = useParams();

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(id);
            
            setDatosPeli(response);
            const responseDetails = await omdbApi.getData(response.imdb_id);
            setDatosomdb(responseDetails)
            console.log(responseDetails)
            window.scrollTo(0,0);
        }
        getDetail();
    }, [id]);

    function ratingsExtra(){
        if(datosomdb){
            let ratings = datosomdb.Ratings
            let nota = 0
            let mostrar = []
            
            if(ratings.filter(e => e.Source === 'Internet Movie Database').length > 0){
                nota = ratings.filter(e => e.Source === 'Internet Movie Database')[0].Value
                mostrar.push(<div style={{ marginRight:'30px'}}><img className="imagenNota" src={imdbLogo}/>{nota}</div>)
            }
            if(ratings.filter(e => e.Source === 'Rotten Tomatoes').length > 0){
                nota = ratings.filter(e => e.Source === 'Rotten Tomatoes')[0].Value
                mostrar.push(<div style={{ marginRight:'30px'}}><img className="imagenNota" src={rotten}/>{nota}</div>)
            }
            if(ratings.filter(e => e.Source === 'Metacritic').length > 0){
                nota = ratings.filter(e => e.Source === 'Metacritic')[0].Value
                mostrar.push(<div style={{ marginRight:'30px'}}><img className="imagenNota" src={metacriticLogo}/>{nota}</div>)
            }
            return mostrar
        }
    }

    return(
        datosPeli &&(<Fragment>
             
                <div className="backgroundMovie" style={{backgroundImage: `url(${"https://image.tmdb.org/t/p/original"+datosPeli.backdrop_path})`}}/>
                <div className="movie-content">
                    <div className="movie-content__poster">
                        <div className="movie-content__poster__img" style={{backgroundImage: `url(${"https://image.tmdb.org/t/p/original"+datosPeli.poster_path})`}}></div>
                    </div>
                    <div className="movie-content__info">
                        
                                <h1 className="title">
                                    {datosPeli.title || datosPeli.name}
                                </h1>
                                <div className="genres">
                                    {
                                        datosPeli.genres && datosPeli.genres.slice(0, 5).map((genre, i) => (
                                            <span key={i} className="genres__item">{genre.name}</span>
                                        ))
                                    }
                                </div>
                                <div className="calificaciones">
                                    {ratingsExtra()}
                                </div>
                                <p className="overview">{datosPeli.overview}</p>
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Casts</h2>
                                    </div>
                                    <CastList id={datosPeli.id}/>
                                </div>
                    </div>


                </div>
            
            
            
        </Fragment>)
    )
}

export default DetallesPeli;