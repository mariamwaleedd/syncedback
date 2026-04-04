import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, BarChart3, Briefcase, User, Library, 
  FileText, PenTool, MessageSquare, HelpCircle, Settings, 
  LogOut, X 
} from 'lucide-react';
import './SideMenu.css';

const SideMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsMobileOpen(false);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { icon: <LayoutGrid size={22} />, label: 'Dashboard', active: true },
    { icon: <BarChart3 size={22} />, label: 'Analytics' },
    { icon: <Briefcase size={22} />, label: 'Services' },
    { icon: <User size={22} />, label: 'About' },
    { icon: <Library size={22} />, label: 'Media Library', space: true },
    { icon: <FileText size={22} />, label: 'Pages' },
    { icon: <PenTool size={22} />, label: 'UI Elements' },
    { icon: <MessageSquare size={22} />, label: 'Messages', space: true },
    { icon: <HelpCircle size={22} />, label: 'Help' },
    { icon: <Settings size={22} />, label: 'Settings' },
  ];

  const handleToggle = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <>
      <div className={`side-menu ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-show' : ''}`}>
        <div className="side-menu-header">
          <button className="brand-trigger" onClick={handleToggle}>
            {isMobileOpen ? <X color="white" size={24} /> : <LayoutGrid color="white" size={24} />}
          </button>
        </div>

        <nav className="nav-container">
          {menuItems.map((item, index) => (
            <div key={index} className={`nav-link ${item.active ? 'active' : ''} ${item.space ? 'sep-margin' : ''}`}>
              <div className="nav-icon-box">{item.icon}</div>
              <span className="nav-text">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="side-menu-footer">
          <div className="nav-link exit-link">
            <div className="nav-icon-box"><LogOut size={22} /></div>
            <span className="nav-text">Sign Out</span>
          </div>
        </div>
      </div>

      {isMobile && !isMobileOpen && (
        <button className="mobile-brand-trigger" onClick={handleToggle}>
          <LayoutGrid color="white" size={24} />
        </button>
      )}
      
      {isMobileOpen && <div className="side-menu-overlay" onClick={() => setIsMobileOpen(false)}></div>}
    </>
  );
};

export default SideMenu;