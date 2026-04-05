import React from 'react';
import './Services.css';

const Services = ({ isCollapsed }) => {
    return (
        <div className={`dashboard-container ${isCollapsed ? 'is-collapsed' : ''}`}>
            <div className="page-header">
                <h1 style={{ color: 'white', fontFamily: 'var(--font-title)', fontSize: '32px' }}>Services</h1>
                <p style={{ color: 'var(--text-dim)', marginTop: '8px' }}>Manage all active services and subscriptions.</p>
            </div>
            
            <div className="page-content-placeholder">
                Service Management Dashboard coming soon...
            </div>
        </div>
    );
};

export default Services;
