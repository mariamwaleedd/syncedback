import React from 'react';
import { 
  LayoutGrid, BarChart3, Briefcase, User, Library, 
  FileText, PenTool, MessageSquare, HelpCircle, Settings, 
  LogOut, X, Menu 
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './SideMenu.css';

const SideMenu = ({ isCollapsed, isMobileOpen, isMobile, toggleNav, closeMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: <LayoutGrid size={22} />, label: 'Dashboard', path: '/' },
    { icon: <BarChart3 size={22} />, label: 'Analytics', path: '/analytics' },
    { icon: <Briefcase size={22} />, label: 'Services', path: '/services' },
    { icon: <User size={22} />, label: 'About', path: '/about' },
    { icon: <Library size={22} />, label: 'Media Library', path: '/media-library', space: true },
    { icon: <FileText size={22} />, label: 'Pages', path: '/manage-pages' },
    { icon: <PenTool size={22} />, label: 'UI Elements', path: '/ui-elements' },
    { icon: <MessageSquare size={22} />, label: 'Messages', path: '/messages', space: true },
    { icon: <HelpCircle size={22} />, label: 'Help', path: '/help' },
    { icon: <Settings size={22} />, label: 'Settings', path: '/settings' },
  ];

  const handleSignOut = () => {
    navigate('/login');
    if (isMobile) closeMobile();
  };

  return (
    <>
      <div className={`side-menu ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-show' : ''}`}>
        <div className="side-menu-header">
          <button className="brand-trigger" onClick={toggleNav}>
            {isMobileOpen ? <X color="white" size={24} /> : <LayoutGrid color="white" size={24} />}
          </button>
        </div>

        <nav className="nav-container">
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''} ${item.space ? 'sep-margin' : ''}`}
              onClick={isMobile ? closeMobile : undefined}
            >
              <div className="nav-icon-box">{item.icon}</div>
              <span className="nav-text">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="side-menu-footer">
          <div className="nav-link exit-link" style={{ cursor: 'pointer' }} onClick={handleSignOut}>
            <div className="nav-icon-box"><LogOut size={22} /></div>
            <span className="nav-text">Sign Out</span>
          </div>
        </div>
      </div>

      {isMobileOpen && <div className="side-menu-overlay" onClick={closeMobile}></div>}
    </>
  );
};

export default SideMenu;