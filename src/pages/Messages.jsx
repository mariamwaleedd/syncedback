import React from 'react';
import './Messages.css';

const Messages = ({ isCollapsed }) => {
    return (
        <div className={`dashboard-container ${isCollapsed ? 'is-collapsed' : ''}`}>
            <div className="page-header">
                <h1 style={{ color: 'white', fontFamily: 'var(--font-title)', fontSize: '32px' }}>Messages</h1>
                <p style={{ color: 'var(--text-dim)', marginTop: '8px' }}>Stay connected and manage communications.</p>
            </div>
            
            <div className="page-content-placeholder">
                Messaging Hub coming soon...
            </div>
        </div>
    );
};

export default Messages;
