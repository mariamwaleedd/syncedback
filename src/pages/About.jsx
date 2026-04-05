import React from 'react';
import './About.css';

const AboutPage = ({ isCollapsed }) => {
    return (
        <div className={`about-dashboard-container ${isCollapsed ? 'is-collapsed' : ''}`}>
            <div className="about-page-header">
                <h1 style={{ color: 'white', fontFamily: 'var(--font-title)', fontSize: '32px' }}>About</h1>
                <p style={{ color: 'var(--text-dim)', marginTop: '8px' }}>Information and management of your profile and data.</p>
            </div>
            
            <div className="about-page-content-placeholder">
                About Page Content coming soon...
            </div>
        </div>
    );
};

export default AboutPage;
