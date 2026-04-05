import React from 'react';
import './UIElements.css';

const UIElements = ({ isCollapsed }) => {
    return (
        <div className={`uielements-dashboard-container ${isCollapsed ? 'is-collapsed' : ''}`}>
            <div className="uielements-page-header">
                <h1 style={{ color: 'white', fontFamily: 'var(--font-title)', fontSize: '32px' }}>UI Elements</h1>
                <p style={{ color: 'var(--text-dim)', marginTop: '8px' }}>Explore and manage your design systems and components.</p>
            </div>
            
            <div className="uielements-page-content-placeholder">
                Design System Playground coming soon...
            </div>
        </div>
    );
};

export default UIElements;
