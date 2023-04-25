import React, { useState, useEffect } from 'react';
import tmdbApi from '../../apiRequests';


const CastList = props => {

    const [casts, setCasts] = useState([]);

    useEffect(() => {
        const getCredits = async () => {
            const res = await tmdbApi.credits(props.id);
            setCasts(res.cast.slice(0, 5));
        }
        getCredits();
    }, [props.id]);
    return (
        <div className="casts">
            {
                casts.map((item, i) => (
                    <div key={i} className="casts__item">
                        <div className="casts__item__img" style={{backgroundImage: `url(${"https://image.tmdb.org/t/p/w500"+item.profile_path})`}}></div>
                        <p className="casts__item__name">{item.name}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default CastList;