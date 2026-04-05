import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, ShieldAlert, Heart, Activity, Clock, Menu } from 'lucide-react';
import './NavBar.css';

const notificationsArr = [
  { id: 1, title: 'Health Alert', sub: "Maya's health score dropped to 72%", time: '1 hour ago', icon: <ShieldAlert size={16} />, type: 'alert' },
  { id: 2, title: 'Medication', sub: "Ahmed's evening dose due in 30 mins", time: '2 hours ago', icon: <Heart size={16} />, type: 'med' },
  { id: 3, title: 'System Sync', sub: 'All medical devices synced successfully', time: '5 hours ago', icon: <Activity size={16} />, type: 'sys' },
  { id: 4, title: 'Appointment', sub: 'Grandpa - Dr. Smith @ 10:00 AM tomorrow', time: '1 day ago', icon: <Clock size={16} />, type: 'appt' },
];

const NavBar = ({ isCollapsed, toggleNav }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleNotifications = (e) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
  };

  return (
    <nav className={`navbar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="nav-left">
        <button className="mobile-toggle" onClick={toggleNav}>
          <Menu size={24} />
        </button>
        <div className="search-container">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search pages, features, analytics..." 
            className="search-input"
          />
        </div>
      </div>

      <div className="nav-right">
        <div className="notification-wrapper" ref={notificationRef}>
          <button 
            className={`icon-box ${showNotifications ? 'active' : ''}`} 
            onClick={handleToggleNotifications}
          >
            <Bell size={20} />
            <span className="badge">{notificationsArr.length}</span>
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="dropdown-header">
                <h3>Notifications</h3>
                <span className="mark-read">Mark all as read</span>
              </div>
              <div className="notifications-list">
                {notificationsArr.map((notif) => (
                  <div key={notif.id} className="notification-item">
                    <div className={`notif-icon type-${notif.type}`}>
                      {notif.icon}
                    </div>
                    <div className="notif-content">
                      <h4>{notif.title}</h4>
                      <p>{notif.sub}</p>
                      <span>{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dropdown-footer">
                <span>View all notifications</span>
              </div>
            </div>
          )}
        </div>

        <div className="user-profile">
          <div className="avatar">M</div>
          <div className="user-info">
            <span className="user-name">Mariam</span>
            <span className="user-role">Super User</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;