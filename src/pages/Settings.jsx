import React from 'react';
import './Settings.css';

const Settings = ({ isCollapsed }) => {
    return (
        <div className={`dashboard-container ${isCollapsed ? 'is-collapsed' : ''}`}>
            <div className="page-header">
                <h1 style={{ color: 'white', fontFamily: 'var(--font-title)', fontSize: '32px' }}>Settings</h1>
                <p style={{ color: 'var(--text-dim)', marginTop: '8px' }}>Preferences, security, and account management.</p>
            </div>
            
            <div className="page-content-placeholder">
                Account Settings coming soon...
            </div>
        </div>
    );
};

export default Settings;
