import React from 'react';
import { 
  LayoutGrid, BarChart3, Briefcase, User, Library, 
  FileText, PenTool, MessageSquare, HelpCircle, Settings, 
  LogOut, X, Menu, Globe 
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDialog } from './DialogContext';
import { useTranslation } from './LanguageContext';
import './SideMenu.css';

const SideMenu = ({ isCollapsed, isMobileOpen, isMobile, toggleNav, closeMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { confirm } = useDialog();
  const { t } = useTranslation();

  const menuItems = [
    { icon: <LayoutGrid size={22} />, labelKey: 'dashboard', path: '/dashboard' },
    { icon: <BarChart3 size={22} />, labelKey: 'analytics', path: '/analytics' },
    { icon: <Briefcase size={22} />, labelKey: 'services', path: '/services' },
    { icon: <FileText size={22} />, labelKey: 'pages', path: '/manage-pages' },
    { icon: <User size={22} />, labelKey: 'about', path: '/about' },
    { icon: <Library size={22} />, labelKey: 'mediaLibrary', path: '/media-library', space: true },
    { icon: <PenTool size={22} />, labelKey: 'uiElements', path: '/ui-elements' },
    { icon: <MessageSquare size={22} />, labelKey: 'messages', path: '/messages', space: true },
    { icon: <HelpCircle size={22} />, labelKey: 'help', path: '/help' },
    { icon: <Settings size={22} />, labelKey: 'settings', path: '/settings' },
  ];

  const handleSignOut = async () => {
    const confirmed = await confirm(t('signOutConfirm'));
    if (confirmed) {
      navigate('/login');
      if (isMobile) closeMobile();
    }
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
              <span className="nav-text">{t(item.labelKey)}</span>
            </Link>
          ))}
        </nav>

        <div className="side-menu-footer">
          <a 
            href="https://synced.mariamwaleed.com/" 
            target="_blank" 
            rel="noreferrer"
            className="nav-link view-web-link"
            style={{ textDecoration: 'none' }}
          >
            <div className="nav-icon-box"><Globe size={22} /></div>
            <span className="nav-text">{t('viewWebsite')}</span>
          </a>
          <div className="nav-link exit-link" style={{ cursor: 'pointer' }} onClick={handleSignOut}>
            <div className="nav-icon-box"><LogOut size={22} /></div>
            <span className="nav-text">{t('signOut')}</span>
          </div>
        </div>
      </div>

      {isMobileOpen && <div className="side-menu-overlay" onClick={closeMobile}></div>}
    </>
  );
};

export default SideMenu;