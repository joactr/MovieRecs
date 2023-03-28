import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import './nav.scss'

const linkList = [
    {
        display: 'Recomendaciones',
        path: '/'
    },
    {
        display: 'Mis películas',
        path: '/movie'
    },
    {
        display: 'Configuración',
        path: '/tv'
    }
];

const Nav = () => {
    const { pathname } = useLocation();

    const active = linkList.findIndex(e => e.path === pathname);

    return ( 
        <div className="header">
            <div className="header_wrap">
                <div className="logo">
                    <label className='linkChiquito'>{localStorage.getItem("username")}</label>
                </div>
                <ul className="header_nav">
                    {
                        linkList.map((e, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={e.path} className="navLink">
                                    {e.display}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <div className="logo">
                    <Link to="/login" className='linkChiquito' onClick={() => alert("Quitando info")}>Log out</Link>
                </div>
            </div>
            
        </div>
    );
}


export default Nav;