import React from 'react';
import Caratula from '../caratula/Caratula';


const PagPeli = () => {


    const itemTest={id:345,poster_path:"test",backdrop_path:"uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg"}

    return (
        <div>
            <Caratula item={itemTest} />
        </div>
    )

}

export default PagPeli;