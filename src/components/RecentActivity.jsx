import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Activity, Clock, ShieldAlert, Heart } from 'lucide-react';
import { useTranslation } from '../common/LanguageContext';
import './RecentActivity.css';

const activities = [
  { id: 1, titleKey: 'healthAlert', subKey: 'mayasDrop', typeKey: 'high', timeKey: 'oneHourAgo', icon: <ShieldAlert size={18} /> },
  { id: 2, titleKey: 'medication', subKey: 'ahmedVitamins', typeKey: 'routine', timeKey: 'threeHoursAgo', icon: <Heart size={18} /> },
  { id: 3, titleKey: 'appointment', subKey: 'grandpaCheckup', typeKey: 'upcoming', timeKey: 'fiveHoursAgo', icon: <Clock size={18} /> },
  { id: 4, titleKey: 'syncComplete', subKey: 'grandmaSync', typeKey: 'systemTag', timeKey: 'oneDayAgo', icon: <Activity size={18} /> },
  { id: 5, titleKey: 'security', subKey: 'emergencyVerified', typeKey: 'securityTag', timeKey: 'twoDaysAgo', icon: <Bell size={18} /> },
];

const RecentActivity = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="recentactivity-recent-activity-container">
      <div className="recentactivity-activity-header">
        <h1>{t('recentActivity')}</h1>
        <p>{t('healthAlertsUpdates')}</p>
      </div>

      <div className="recentactivity-activity-list">
        {activities.map((activity) => (
          <div key={activity.id} className="recentactivity-activity-row" onClick={() => navigate('/activities')}>
            <div className={`recentactivity-activity-icon-box type-${activity.typeKey.toLowerCase()}`}>
              {activity.icon}
            </div>
            <div className="recentactivity-activity-content">
              <div className="recentactivity-recentactivity-activity-row-header">
                <h3>{t(activity.titleKey)}</h3>
                <span className="recentactivity-activity-tag">{t(activity.typeKey)}</span>
              </div>
              <p className="recentactivity-activity-sub">{t(activity.subKey)}</p>
              <span className="recentactivity-activity-time">{t(activity.timeKey)}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="recentactivity-see-all-activity-btn" onClick={() => navigate('/activities')}>{t('seeAllActivity')}</button>
    </div>
  );
};

export default RecentActivity;

