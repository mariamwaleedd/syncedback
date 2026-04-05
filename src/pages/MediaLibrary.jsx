import React from 'react';
import './MediaLibrary.css';

const MediaLibrary = ({ isCollapsed }) => {
    return (
        <div className={`dashboard-container ${isCollapsed ? 'is-collapsed' : ''}`}>
            <div className="page-header">
                <h1 style={{ color: 'white', fontFamily: 'var(--font-title)', fontSize: '32px' }}>Media Library</h1>
                <p style={{ color: 'var(--text-dim)', marginTop: '8px' }}>Store and manage all your digital assets.</p>
            </div>
            
            <div className="page-content-placeholder">
                Media Asset Manager coming soon...
            </div>
        </div>
    );
};

export default MediaLibrary;
