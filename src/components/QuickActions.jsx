import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Settings, Code2, Package } from 'lucide-react';
import './QuickActions.css';

const actionsData = [
  { id: 1, name: 'Database', sub: 'Manage data', icon: <Database size={24} />, color: 'var(--primary)', path: '/analytics' },
  { id: 2, name: 'App Settings', sub: 'Configure app', icon: <Settings size={24} />, color: 'var(--accent-purple)', path: '/settings' },
  { id: 3, name: 'API Manager', sub: 'API endpoints', icon: <Code2 size={24} />, color: 'var(--success)', path: '/services' },
  { id: 4, name: 'Deployments', sub: 'Version control', icon: <Package size={24} />, color: 'var(--warning)', path: '/activities' },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="quickactions-quick-actions-container">
      <div className="quickactions-quick-actions-grid">
        {actionsData.map((action) => (
          <div 
            key={action.id} 
            className="quickactions-quick-action-card"
            onClick={() => navigate(action.path)}
          >
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
