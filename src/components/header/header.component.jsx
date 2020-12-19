import React from 'react';
import { Link } from 'react-router-dom';

import './header.styles.sass';

const Header = () => (
    <div className="header">
        <Link className="logo-container" to="/"> 
            <h1 className="logo">DEMO</h1>
        </Link>
        <div className="navigation">
            <Link className="option" to="/"> 首頁 </Link>
            <Link className="option" to="/favorites"> 我的收藏 </Link>
            <Link className="option" to="/projector"> 播放 </Link>
        </div>
    </div>
);

export default Header;