import React from 'react';
import { Database, Settings, Code2, Package } from 'lucide-react';
import './QuickActions.css';

const actionsData = [
  { id: 1, name: 'Database', sub: 'Manage data', icon: <Database size={24} />, color: 'var(--primary)' },
  { id: 2, name: 'App Settings', sub: 'Configure app', icon: <Settings size={24} />, color: 'var(--accent-purple)' },
  { id: 3, name: 'API Manager', sub: 'API endpoints', icon: <Code2 size={24} />, color: 'var(--success)' },
  { id: 4, name: 'Deployments', sub: 'Version control', icon: <Package size={24} />, color: 'var(--warning)' },
];

const QuickActions = () => {
  return (
    <div className="quickactions-quick-actions-container">
      <div className="quickactions-quick-actions-grid">
        {actionsData.map((action) => (
          <div key={action.id} className="quickactions-quick-action-card">
            <div className="quickactions-action-icon-box" style={{ color: action.color }}>
              {action.icon}
            </div>
            <div className="quickactions-action-content">
              <h3>{action.name}</h3>
              <p>{action.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
