import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, BarChart3, Briefcase, User, Library, 
  FileText, PenTool, MessageSquare, HelpCircle, Settings, 
  LogOut, Menu, X 
} from 'lucide-react';
import './SideMenu.css';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setIsOpen(true);
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

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      {isMobile && (
        <button className="mobile-toggle-btn" onClick={toggleSidebar}>
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      )}

      <div className={`side-menu ${!isOpen ? 'collapsed' : ''} ${isMobile && mobileMenuOpen ? 'mobile-show' : ''}`}>
        <div className="side-menu-header">
          <div className="brand-icon">
            <LayoutGrid color="white" size={24} />
          </div>
          {isOpen && !isMobile && (
            <button className="collapse-control" onClick={toggleSidebar}>
              <Menu size={20} />
            </button>
          )}
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
      
      {isMobile && mobileMenuOpen && <div className="side-menu-overlay" onClick={() => setMobileMenuOpen(false)}></div>}
    </>
  );
};

export default SideMenu;