import React from 'react';
import './HelpPage.css';

const HelpPage = ({ isCollapsed }) => {
    return (
        <div className={`dashboard-container ${isCollapsed ? 'is-collapsed' : ''}`}>
            <div className="page-header">
                <h1 style={{ color: 'white', fontFamily: 'var(--font-title)', fontSize: '32px' }}>Help</h1>
                <p style={{ color: 'var(--text-dim)', marginTop: '8px' }}>Troubleshooting, documentation and support.</p>
            </div>
            
            <div className="page-content-placeholder">
                Support Center coming soon...
            </div>
        </div>
    );
};

export default HelpPage;
