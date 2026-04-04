import React from 'react';
import { Search, Bell } from 'lucide-react';
import './NavBar.css';

const NavBar = ({ isCollapsed }) => {
  return (
    <nav className={`navbar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="nav-left">
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
        <div className="notification-wrapper">
          <div className="icon-box">
            <Bell size={20} />
            <span className="badge">3</span>
          </div>
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