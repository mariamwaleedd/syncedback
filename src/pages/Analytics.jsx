import React from 'react';
import './Analytics.css';

const Analytics = ({ isCollapsed }) => {
    return (
        <div className={`dashboard-container ${isCollapsed ? 'is-collapsed' : ''}`}>
            <div className="page-header">
                <h1 style={{ color: 'white', fontFamily: 'var(--font-title)', fontSize: '32px' }}>Analytics</h1>
                <p style={{ color: 'var(--text-dim)', marginTop: '8px' }}>Detailed insights and performance reports.</p>
            </div>
            
            <div className="page-content-placeholder">
                Analytics Dashboard coming soon...
            </div>
        </div>
    );
};

export default Analytics;
