import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Settings, Code2, Package } from 'lucide-react';
import { useTranslation } from '../common/LanguageContext';
import './QuickActions.css';

const actionsData = [
  { id: 1, nameKey: 'dbName', subKey: 'dbSub', icon: <Database size={24} />, color: 'var(--primary)', path: '/analytics' },
  { id: 2, nameKey: 'appSettingsName', subKey: 'appSettingsSub', icon: <Settings size={24} />, color: 'var(--accent-purple)', path: '/settings' },
  { id: 3, nameKey: 'apiManagerName', subKey: 'apiManagerSub', icon: <Code2 size={24} />, color: 'var(--success)', path: '/services' },
  { id: 4, nameKey: 'deploymentsName', subKey: 'deploymentsSub', icon: <Package size={24} />, color: 'var(--warning)', path: '/activities' },
];

const QuickActions = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
              <h3>{t(action.nameKey)}</h3>
              <p>{t(action.subKey)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;

