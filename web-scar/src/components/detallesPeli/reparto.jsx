import React, { useState, useEffect } from 'react';
import tmdbApi from '../../apiRequests';


const Reparto = props => {

    const [reparto, setReparto] = useState([]);

    useEffect(() => {
        const getCredits = async () => {
            const res = await tmdbApi.credits(props.id);
            setReparto(res.cast.slice(0, 5));
        }
        getCredits();
    }, [props.id]);
    return (
        <div className="reparto">
            {
                reparto.map((item, i) => (
                    <div key={i} className="reparto__item">
                        <div className="reparto__item__img" style={{backgroundImage: `url(${"https://image.tmdb.org/t/p/w500"+item.profile_path})`}}></div>
                        <p className="reparto__item__name">{item.name}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default Reparto;