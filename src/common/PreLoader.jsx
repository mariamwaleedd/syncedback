import React from 'react';
import logo from '../imgs/logowhite.png';
import './PreLoader.css';

const PreLoader = () => {
    return (
        <div className="simple-preloader">
            <div className="logo-container">
                <img src={logo} alt="Loading..." className="rotate-logo" />
            </div>
        </div>
    );
};

export default PreLoader;