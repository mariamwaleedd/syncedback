import React from 'react';
import logo from '../imgs/logowhite.png';
import './PreLoader.css';

const PreLoader = ({ pageTitle }) => {
    return (
        <div className="simple-preloader">
            <div className="loader-content-wrap">
                <div className="logo-container">
                    <img src={logo} alt="Loading..." className="rotate-logo" />
                </div>
                <div className="loading-text-area">
                    <h2 className="current-page-name">{pageTitle}</h2>
                </div>
            </div>
        </div>
    );
};

export default PreLoader;