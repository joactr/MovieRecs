import React from 'react';

import './caratula.scss';

import { Link } from 'react-router-dom';

import apiConfig from '../../apiRequests';

const Caratula = props => {

    const item = props.item;
    
    const imgChiquita = "https://image.tmdb.org/t/p/original/" + item.poster_path
    const imgGrande = "https://image.tmdb.org/t/p/w500/" + item.backdrop_path

    const link = '/pelicula/' + item.id;

    return (
        <Link to={link} className="movie-container">
            <div className="movie-card" style={{backgroundImage: `url(${imgGrande})`}}>
            </div>
            <h3>{item.title || item.name}</h3>
        </Link>
    );
}

export default Caratula;