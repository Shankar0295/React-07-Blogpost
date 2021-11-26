import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <Link className="title-style" to="/"><h1 className="title">Blogscape</h1></Link>
            <a className="portfolio-link" target="_blank" href="/">Portfoilo</a>
        </div>
    )
}

export default Header