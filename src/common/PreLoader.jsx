import React from 'react';
import './PreLoader.css';

const PreLoader = () => {
    return (
        <div className="preloader-overlay">
            <div className="loader-content">
                <div className="loader-ring">
                    <div className="ring-inner"></div>
                </div>
                <div className="loader-logo">
                    <div className="logo-pulse"></div>
                    <span className="logo-text">H</span>
                </div>
            </div>
            <div className="loading-bar">
                <div className="loading-fill"></div>
            </div>
        </div>
    );
};

export default PreLoader;