import React from 'react';
import { Bell, Activity, Clock, ShieldAlert, Heart } from 'lucide-react';
import './RecentActivity.css';

const activities = [
  { id: 1, title: 'Health Alert', sub: "Maya's health score dropped", type: 'High', time: '1 hour ago', icon: <ShieldAlert size={18} /> },
  { id: 2, title: 'Medication', sub: "Ahmed's daily vitamins", type: 'Routine', time: '3 hours ago', icon: <Heart size={18} /> },
  { id: 3, title: 'Appointment', sub: "Grandpa's checkup scheduled", type: 'Upcoming', time: '5 hours ago', icon: <Clock size={18} /> },
  { id: 4, title: 'Sync Complete', sub: "Grandma's fitness data synced", type: 'System', time: '1 day ago', icon: <Activity size={18} /> },
  { id: 5, title: 'Security', sub: 'Emergency contacts verified', type: 'Security', time: '2 days ago', icon: <Bell size={18} /> },
];

const RecentActivity = () => {
  return (
    <div className="recent-activity-container">
      <div className="activity-header">
        <h1>Recent Activity</h1>
        <p>Health alerts and updates</p>
      </div>

      <div className="activity-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-row">
            <div className={`activity-icon-box type-${activity.type.toLowerCase()}`}>
              {activity.icon}
            </div>
            <div className="activity-content">
              <div className="activity-row-header">
                <h3>{activity.title}</h3>
                <span className="activity-tag">{activity.type}</span>
              </div>
              <p className="activity-sub">{activity.sub}</p>
              <span className="activity-time">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="see-all-activity-btn">See All Activity</button>
    </div>
  );
};

export default RecentActivity;
