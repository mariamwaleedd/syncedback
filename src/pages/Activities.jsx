import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, Filter, Bell, Activity, 
  Clock, ShieldAlert, Heart, Calendar, ChevronRight 
} from 'lucide-react';
import './Activities.css';

const allActivities = [
  { id: 1, title: 'Health Alert', sub: "Maya's health score dropped", type: 'High', time: '1 hour ago', date: '2026-04-07', icon: <ShieldAlert size={20} /> },
  { id: 2, title: 'Medication', sub: "Ahmed's daily vitamins", type: 'Routine', time: '3 hours ago', date: '2026-04-07', icon: <Heart size={20} /> },
  { id: 3, title: 'Appointment', sub: "Grandpa's checkup scheduled", type: 'Upcoming', time: '5 hours ago', date: '2026-04-07', icon: <Clock size={20} /> },
  { id: 4, title: 'Sync Complete', sub: "Grandma's fitness data synced", type: 'System', time: '1 day ago', date: '2026-04-06', icon: <Activity size={20} /> },
  { id: 5, title: 'Security', sub: 'Emergency contacts verified', type: 'Security', time: '2 days ago', date: '2026-04-05', icon: <Bell size={20} /> },
  { id: 6, title: 'Lab Results', sub: 'Blood test results ready', type: 'High', time: '3 days ago', date: '2026-04-04', icon: <ShieldAlert size={20} /> },
  { id: 7, title: 'Exercise', sub: "Maya's morning walk: 5km", type: 'Routine', time: '4 days ago', date: '2026-04-03', icon: <Heart size={20} /> },
  { id: 8, title: 'Vitals Sync', sub: 'Oxygen levels updated', type: 'System', time: '5 days ago', date: '2026-04-02', icon: <Activity size={20} /> },
];

const Activities = ({ isCollapsed }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'High', 'Routine', 'Upcoming', 'System', 'Security'];

  const filteredActivities = allActivities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         activity.sub.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || activity.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`activities-page-container ${isCollapsed ? 'is-collapsed' : ''}`}>
      <header className="activities-page-header">
        <div className="activities-header-left">
          <button className="activities-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <div className="activities-titles">
            <h1>Activity Records</h1>
            <p>Full history of health logs and notifications</p>
          </div>
        </div>
        <div className="activities-header-stats">
          <div className="activities-stat-item">
            <span>Total Logs</span>
            <strong>{allActivities.length}</strong>
          </div>
        </div>
      </header>

      <section className="activities-controls">
        <div className="activities-search-wrapper">
          <Search size={18} className="activities-search-icon" />
          <input 
            type="text" 
            placeholder="Search logs or patients..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="activities-filters-scroll">
          {filters.map(filter => (
            <button 
              key={filter}
              className={`activities-filter-chip ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <main className="activities-list-container">
        {filteredActivities.length > 0 ? (
          <div className="activities-grouped-list">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="activities-card-row">
                <div className={`activities-icon-box type-${activity.type.toLowerCase()}`}>
                  {activity.icon}
                </div>
                <div className="activities-card-main">
                  <div className="activities-card-header">
                    <h3>{activity.title}</h3>
                    <div className="activities-card-meta">
                      <span className={`activities-tag type-${activity.type.toLowerCase()}`}>
                        {activity.type}
                      </span>
                      <span className="activities-time-stamp">
                        <Clock size={12} /> {activity.time}
                      </span>
                    </div>
                  </div>
                  <p className="activities-description">{activity.sub}</p>
                  <div className="activities-card-footer">
                    <span className="activities-date">
                      <Calendar size={12} /> {activity.date}
                    </span>
                    <button className="activities-details-link">
                      Details <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="activities-empty-state">
            <div className="activities-empty-icon">
              <Activity size={48} />
            </div>
            <h3>No activities found</h3>
            <p>Try adjusting your search or filters to find what you're looking for.</p>
            <button className="activities-reset-btn" onClick={() => { setSearchTerm(''); setActiveFilter('All'); }}>
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Activities;
