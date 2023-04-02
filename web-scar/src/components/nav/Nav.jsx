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
        path: '/mis-pelis'
    },
    {
        display: 'Configuración',
        path: '/config'
    }
];

const Nav = () => {
    const { pathname } = useLocation();

    const active = linkList.findIndex(e => e.path === pathname);

    const isLogin = window.location.pathname === "/login"

    return ( 
        <div className={isLogin ? "invis" : "none"}>
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
                    <Link to="/login" className='linkChiquito' onClick={() => localStorage.removeItem("username")}>Log out</Link>
                </div>
            </div>
            
        </div>
    );
}


export default Nav;