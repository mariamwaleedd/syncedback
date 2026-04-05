import React from 'react';
import './ManagePages.css';

const ManagePages = ({ isCollapsed }) => {
    return (
        <div className={`dashboard-container ${isCollapsed ? 'is-collapsed' : ''}`}>
            <div className="page-header">
                <h1 style={{ color: 'white', fontFamily: 'var(--font-title)', fontSize: '32px' }}>Pages</h1>
                <p style={{ color: 'var(--text-dim)', marginTop: '8px' }}>Create and manage all content pages.</p>
            </div>
            
            <div className="page-content-placeholder">
                Page Builder Dashboard coming soon...
            </div>
        </div>
    );
};

export default ManagePages;
