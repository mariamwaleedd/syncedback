import React, { useState } from 'react';
import { 
    User, Shield, Bell, Palette, Globe, 
    Save, Camera, Eye, 
    EyeOff, Moon, Sun, Smartphone,
    LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDialog } from '../common/DialogContext';
import { useTranslation } from '../common/LanguageContext';
import './Settings.css';

const Settings = ({ isCollapsed }) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    
    const { alert } = useDialog();
    const { language, changeLanguage, t } = useTranslation();

    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        marketing: false,
        security: true
    });

    const [appearance, setAppearance] = useState({
        theme: localStorage.getItem('synced_theme') || 'dark',
        language: language,
        fontSize: 'medium'
    });
    
    const navigate = useNavigate();

    const handleSave = () => {
        alert(t('settingsSaved'), t('success'));
    };

    const handleDiscard = () => {
        alert(t('changesDiscarded'), t('info'));
    };

    const handleLogout = () => {
        navigate('/login');
    };

    React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', appearance.theme);
        localStorage.setItem('synced_theme', appearance.theme);
    }, [appearance.theme]);

    React.useEffect(() => {
        setAppearance(prev => ({ ...prev, language }));
    }, [language]);

    const toggleNotification = (key) => {
        const nextState = !notifications[key];
        setNotifications(prev => ({ ...prev, [key]: nextState }));
        
        const titles = {
            email: t('emailNotif'),
            push: t('pushNotif'),
            marketing: t('marketingNotif'),
            security: t('twoFactor')
        };
        
        const statusMsg = language === 'ar' 
            ? `تم ${nextState ? 'تفعيل' : 'تعطيل'} ${titles[key] || key} بنجاح.`
            : `${titles[key] || key} has been successfully ${nextState ? 'enabled' : 'disabled'}.`;
        
        alert(statusMsg, t('success'));
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="settings-tab-content animate-fade-in">
                        <section className="settings-section">
                            <h2 className="section-title">{t('profileInfo')}</h2>
                            <div className="avatar-upload-wrapper">
                                <div className="avatar-preview">
                                    <img src="https://ui-avatars.com/api/?name=Admin+User&background=2b7fff&color=fff" alt="Profile" />
                                    <button className="change-photo-btn"><Camera size={16} /></button>
                                </div>
                                <div className="avatar-info">
                                    <h3>{t('yourProfilePic')}</h3>
                                    <p>{t('picInfo')}</p>
                                    <div className="avatar-actions">
                                        <button className="btn-upload">{t('uploadNew')}</button>
                                        <button className="btn-remove">{t('remove')}</button>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-form-grid">
                                <div className="setting-input-field">
                                    <label>{t('fullName')}</label>
                                    <input type="text" defaultValue="Admin User" />
                                </div>
                                <div className="setting-input-field">
                                    <label>{t('emailAddress')}</label>
                                    <input type="email" defaultValue="admin@healthhub.com" />
                                </div>
                                <div className="setting-input-field full-width">
                                    <label>{t('professionalBio')}</label>
                                    <textarea defaultValue="Senior Health Administrator and Platform Manager."></textarea>
                                </div>
                            </div>
                        </section>

                        <section className="settings-section">
                            <h2 className="section-title">{t('accountDetails')}</h2>
                            <div className="settings-form-grid">
                                <div className="setting-input-field">
                                    <label>{t('username')}</label>
                                    <input type="text" defaultValue="admin_health" />
                                </div>
                                <div className="setting-input-field">
                                    <label>{t('timezone')}</label>
                                    <select defaultValue="UTC-5">
                                        <option value="UTC-5">{t('timezoneUS')}</option>
                                        <option value="UTC+0">{t('timezoneUK')}</option>
                                        <option value="UTC+3">{t('timezoneSA')}</option>
                                    </select>
                                </div>
                            </div>
                        </section>
                    </div>
                );
            case 'security':
                return (
                    <div className="settings-tab-content animate-fade-in">
                        <section className="settings-section">
                            <h2 className="section-title">{t('changePassword')}</h2>
                            <div className="settings-form-grid">
                                <div className="setting-input-field full-width">
                                    <label>{t('currentPassword')}</label>
                                    <div className="password-input-wrap">
                                        <input 
                                            type={showCurrentPassword ? "text" : "password"} 
                                            placeholder={t('currentPassPlaceholder')} 
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                        />
                                        <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                                            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="setting-input-field">
                                    <label>{t('newPassword')}</label>
                                    <div className="password-input-wrap">
                                        <input 
                                            type={showNewPassword ? "text" : "password"} 
                                            placeholder={t('newPassPlaceholder')} 
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
                                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="setting-input-field">
                                    <label>{t('confirmNewPassword')}</label>
                                    <div className="password-input-wrap">
                                        <input 
                                            type={showConfirmPassword ? "text" : "password"} 
                                            placeholder={t('confirmPassPlaceholder')} 
                                            value={confirmNewPassword}
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        />
                                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="settings-section">
                            <div 
                                className="security-toggle-card"
                                onClick={() => toggleNotification('security')}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="text">
                                    <Shield size={24} className="icon-blue" />
                                    <div>
                                        <h4>{t('twoFactor')}</h4>
                                        <p>{t('twoFactorDesc')}</p>
                                    </div>
                                </div>
                                <div className={`custom-toggle ${notifications.security ? 'active' : ''}`}>
                                    <div className="handle"></div>
                                </div>
                            </div>
                        </section>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="settings-tab-content animate-fade-in">
                        <section className="settings-section">
                            <h2 className="section-title">{t('notifPreferences')}</h2>
                            <p className="section-desc">{t('notifDesc')}</p>
                            
                            <div className="notification-list">
                                {[
                                    { id: 'email', titleKey: 'emailNotif', descKey: 'emailNotifDesc', icon: <Bell size={20} /> },
                                    { id: 'push', titleKey: 'pushNotif', descKey: 'pushNotifDesc', icon: <Smartphone size={20} /> },
                                    { id: 'marketing', titleKey: 'marketingNotif', descKey: 'marketingNotifDesc', icon: <Globe size={20} /> }
                                ].map((item) => (
                                    <div 
                                        key={item.id} 
                                        className="notification-item"
                                        onClick={() => toggleNotification(item.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="notif-info">
                                            <div className="notif-icon">{item.icon}</div>
                                            <div>
                                                <h4>{t(item.titleKey)}</h4>
                                                <p>{t(item.descKey)}</p>
                                            </div>
                                        </div>
                                        <div className={`custom-toggle ${notifications[item.id] ? 'active' : ''}`}>
                                            <div className="handle"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                );
            case 'appearance':
                return (
                    <div className="settings-tab-content animate-fade-in">
                        <section className="settings-section">
                            <h2 className="section-title">{t('visualCustomization')}</h2>
                            <div className="appearance-grid">
                                <div className="appearance-option">
                                    <label>{t('interfaceTheme')}</label>
                                    <div className="theme-selector">
                                        <button className={appearance.theme === 'dark' ? 'active' : ''} onClick={() => setAppearance({...appearance, theme: 'dark'})}>
                                            <Moon size={18} /> {t('darkMode')}
                                        </button>
                                        <button className={appearance.theme === 'light' ? 'active' : ''} onClick={() => setAppearance({...appearance, theme: 'light'})}>
                                            <Sun size={18} /> {t('lightMode')}
                                        </button>
                                    </div>
                                </div>
                                <div className="appearance-option">
                                    <label>{t('platformLanguage')}</label>
                                    <div className="lang-selector">
                                        <button className={language === 'en' ? 'active' : ''} onClick={() => changeLanguage('en')}>
                                            {t('english')}
                                        </button>
                                        <button className={language === 'ar' ? 'active' : ''} onClick={() => changeLanguage('ar')}>
                                            {t('arabic')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`settings-page-wrapper ${isCollapsed ? 'is-collapsed' : ''}`}>
            <header className="settings-header">
                <div className="header-text">
                    <h1>{t('settings')}</h1>
                    <p>{t('perfOverview')}</p>
                </div>
                <div className="header-actions">
                    <button className="btn-secondary-outline" onClick={handleDiscard}>{t('discard')}</button>
                    <button className="btn-primary-save" onClick={handleSave}><Save size={18} /> {t('saveChanges')}</button>
                </div>
            </header>

            <div className="settings-layout-grid">
                <aside className="settings-sidebar">
                    <nav className="settings-nav">
                        <button className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                            <User size={20} /> <span>{t('profile')}</span>
                        </button>
                        <button className={`nav-item ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
                            <Shield size={20} /> <span>{t('security')}</span>
                        </button>
                        <button className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>
                            <Bell size={20} /> <span>{t('notifications')}</span>
                        </button>
                        <button className={`nav-item ${activeTab === 'appearance' ? 'active' : ''}`} onClick={() => setActiveTab('appearance')}>
                            <Palette size={20} /> <span>{t('appearance')}</span>
                        </button>
                    </nav>

                    <div className="sidebar-footer">
                        <button className="logout-btn" onClick={handleLogout}>
                            <LogOut size={20} /> <span>{t('logOut')}</span>
                        </button>
                    </div>
                </aside>

                <main className="settings-main-content">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default Settings;