import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../imgs/logowhite.png';
import laptop from '../imgs/image 1.png';
import phones from '../imgs/image 2.png';
import './ChoosePlatform.css';

const ChoosePlatform = () => {
    const navigate = useNavigate();

    const handleSelect = () => {
        navigate('/');
    };

    return (
        <div className="chooseplatform-choose-container">
            <div className="chooseplatform-choose-content">
                <div className="logo-box">
                    <img src={logo} alt="Logo" className="logo-img" />
                </div>
                
                <h1 className="chooseplatform-choose-title">What do you want to work on today?</h1>
                
                <div className="chooseplatform-platform-grid">
                    <div className="chooseplatform-platform-card" onClick={handleSelect}>
                        <div className="chooseplatform-image-container">
                            <img src={laptop} alt="Website" className="chooseplatform-platform-img" />
                        </div>
                        <h3>Website</h3>
                    </div>
                    
                    <div className="chooseplatform-platform-card" onClick={handleSelect}>
                        <div className="chooseplatform-image-container">
                            <img src={phones} alt="Application" className="chooseplatform-platform-img" />
                        </div>
                        <h3>Application</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChoosePlatform;
