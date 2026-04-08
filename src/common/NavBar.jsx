import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, ShieldAlert, Heart, Activity, Clock, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const notificationsArr = [
  { id: 1, title: 'Health Alert', sub: "Maya's health score dropped to 72%", time: '1 hour ago', icon: <ShieldAlert size={16} />, type: 'alert' },
  { id: 2, title: 'Medication', sub: "Ahmed's evening dose due in 30 mins", time: '2 hours ago', icon: <Heart size={16} />, type: 'med' },
  { id: 3, title: 'System Sync', sub: 'All medical devices synced successfully', time: '5 hours ago', icon: <Activity size={16} />, type: 'sys' },
  { id: 4, title: 'Appointment', sub: 'Grandpa - Dr. Smith @ 10:00 AM tomorrow', time: '1 day ago', icon: <Clock size={16} />, type: 'appt' },
];

const SEARCHABLE_PAGES = [
  { id: 'dashboard', title: 'Dashboard', path: '/', type: 'Page' },
  { id: 'analytics', title: 'Analytics', path: '/analytics', type: 'Page' },
  { id: 'services', title: 'Services', path: '/services', type: 'Page' },
  { id: 'manage-pages', title: 'Manage Pages', path: '/manage-pages', type: 'Feature' },
  { id: 'activities', title: 'Activity Tracking', path: '/activities', type: 'Feature' },
  { id: 'family', title: 'Family Members', path: '/family', type: 'Page' },
  { id: 'media-library', title: 'Media Library', path: '/media-library', type: 'Feature' },
  { id: 'ui-elements', title: 'UI Elements', path: '/ui-elements', type: 'Page' },
  { id: 'messages', title: 'Messages Inbox', path: '/messages', type: 'Page' },
  { id: 'settings', title: 'Settings', path: '/settings', type: 'Page' },
  { id: 'help', title: 'Help Center', path: '/help', type: 'Page' },
  { id: 'profile', title: 'User Profile', path: '/profile', type: 'Page' },
  { id: 'add-feature', title: 'Add New Feature', path: '/add-feature', type: 'Action' },
  { id: 'add-page', title: 'Create New Page', path: '/add-page', type: 'Action' },
];

const NavBar = ({ isCollapsed, toggleNav }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const notificationRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleNotifications = (e) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
    setShowSearchResults(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchResults(value.length > 0);
  };

  const handleResultClick = (path) => {
    navigate(path);
    setShowSearchResults(false);
    setSearchQuery('');
  };

  const filteredResults = SEARCHABLE_PAGES.filter(page => 
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    page.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav className={`navbar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="nav-left">
        <button className="mobile-toggle" onClick={toggleNav}>
          <Menu size={24} />
        </button>
        <div className="search-container" ref={searchRef}>
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search pages, features, analytics..." 
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => { if(searchQuery) setShowSearchResults(true); setShowNotifications(false); }}
          />
          {showSearchResults && (
            <div className="search-dropdown">
              {filteredResults.length > 0 ? (
                <div className="search-results-list">
                  {filteredResults.map((result) => (
                    <div 
                      key={result.id} 
                      className="search-result-item"
                      onClick={() => handleResultClick(result.path)}
                    >
                      <div className="result-info">
                        <h4>{result.title}</h4>
                        <span className="result-type">{result.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="search-no-results">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
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

        <div className="user-profile" style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
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