import React, { useState } from 'react';
import { 
    User, Shield, Bell, Palette, Globe, 
    Save, Trash2, Camera, Lock, Eye, 
    EyeOff, Check, Moon, Sun, Smartphone,
    ChevronRight, LogOut
} from 'lucide-react';
import './Settings.css';

const Settings = ({ isCollapsed }) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [showPassword, setShowPassword] = useState(false);
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        marketing: false,
        security: true
    });

    const [appearance, setAppearance] = useState({
        theme: 'dark',
        language: 'en',
        fontSize: 'medium'
    });

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="settings-tab-content animate-fade-in">
                        <section className="settings-section">
                            <h2 className="section-title">Profile Information</h2>
                            <div className="avatar-upload-wrapper">
                                <div className="avatar-preview">
                                    <img src="https://ui-avatars.com/api/?name=Admin+User&background=2b7fff&color=fff" alt="Profile" />
                                    <button className="change-photo-btn"><Camera size={16} /></button>
                                </div>
                                <div className="avatar-info">
                                    <h3>Your Profile Picture</h3>
                                    <p>JPG, GIF or PNG. Max size of 2MB</p>
                                    <div className="avatar-actions">
                                        <button className="btn-upload">Upload New</button>
                                        <button className="btn-remove">Remove</button>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-form-grid">
                                <div className="setting-input-field">
                                    <label>Full Name</label>
                                    <input type="text" defaultValue="Admin User" />
                                </div>
                                <div className="setting-input-field">
                                    <label>Email Address</label>
                                    <input type="email" defaultValue="admin@healthhub.com" />
                                </div>
                                <div className="setting-input-field full-width">
                                    <label>Professional Bio</label>
                                    <textarea defaultValue="Senior Health Administrator and Platform Manager."></textarea>
                                </div>
                            </div>
                        </section>

                        <section className="settings-section">
                            <h2 className="section-title">Account Details</h2>
                            <div className="settings-form-grid">
                                <div className="setting-input-field">
                                    <label>Username</label>
                                    <input type="text" defaultValue="admin_health" />
                                </div>
                                <div className="setting-input-field">
                                    <label>Timezone</label>
                                    <select defaultValue="UTC-5">
                                        <option value="UTC-5">Eastern Time (US & Canada)</option>
                                        <option value="UTC+0">London (GMT)</option>
                                        <option value="UTC+3">Riyadh (AST)</option>
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
                            <h2 className="section-title">Change Password</h2>
                            <div className="settings-form-grid">
                                <div className="setting-input-field full-width">
                                    <label>Current Password</label>
                                    <div className="password-input-wrap">
                                        <input type={showPassword ? "text" : "password"} placeholder="••••••••" />
                                        <button onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="setting-input-field">
                                    <label>New Password</label>
                                    <input type="password" placeholder="••••••••" />
                                </div>
                                <div className="setting-input-field">
                                    <label>Confirm New Password</label>
                                    <input type="password" placeholder="••••••••" />
                                </div>
                            </div>
                        </section>

                        <section className="settings-section">
                            <div className="security-toggle-card">
                                <div className="text">
                                    <Shield size={24} className="icon-blue" />
                                    <div>
                                        <h4>Two-Factor Authentication</h4>
                                        <p>Add an extra layer of security to your account.</p>
                                    </div>
                                </div>
                                <div className={`custom-toggle ${notifications.security ? 'active' : ''}`} onClick={() => toggleNotification('security')}>
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
                            <h2 className="section-title">Notification Preferences</h2>
                            <p className="section-desc">Control how you receive alerts and updates.</p>
                            
                            <div className="notification-list">
                                {[
                                    { id: 'email', title: 'Email Notifications', desc: 'Receive daily digests and activity reports via email.', icon: <Bell size={20} /> },
                                    { id: 'push', title: 'Push Notifications', desc: 'Get real-time browser alerts for urgent tasks.', icon: <Smartphone size={20} /> },
                                    { id: 'marketing', title: 'Marketing Emails', desc: 'Stay updated with new features and platform tips.', icon: <Globe size={20} /> }
                                ].map((item) => (
                                    <div key={item.id} className="notification-item">
                                        <div className="notif-info">
                                            <div className="notif-icon">{item.icon}</div>
                                            <div>
                                                <h4>{item.title}</h4>
                                                <p>{item.desc}</p>
                                            </div>
                                        </div>
                                        <div className={`custom-toggle ${notifications[item.id] ? 'active' : ''}`} onClick={() => toggleNotification(item.id)}>
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
                            <h2 className="section-title">Visual Customization</h2>
                            <div className="appearance-grid">
                                <div className="appearance-option">
                                    <label>Interface Theme</label>
                                    <div className="theme-selector">
                                        <button className={appearance.theme === 'dark' ? 'active' : ''} onClick={() => setAppearance({...appearance, theme: 'dark'})}>
                                            <Moon size={18} /> Dark Mode
                                        </button>
                                        <button className={appearance.theme === 'light' ? 'active' : ''} onClick={() => setAppearance({...appearance, theme: 'light'})}>
                                            <Sun size={18} /> Light Mode
                                        </button>
                                    </div>
                                </div>
                                <div className="appearance-option">
                                    <label>Platform Language</label>
                                    <div className="lang-selector">
                                        <button className={appearance.language === 'en' ? 'active' : ''} onClick={() => setAppearance({...appearance, language: 'en'})}>English</button>
                                        <button className={appearance.language === 'ar' ? 'active' : ''} onClick={() => setAppearance({...appearance, language: 'ar'})}>العربية</button>
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
                    <h1>Settings</h1>
                    <p>Manage your account settings and preferences</p>
                </div>
                <div className="header-actions">
                    <button className="btn-secondary-outline">Discard</button>
                    <button className="btn-primary-save"><Save size={18} /> Save Changes</button>
                </div>
            </header>

            <div className="settings-layout-grid">
                <aside className="settings-sidebar">
                    <nav className="settings-nav">
                        <button className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                            <User size={20} /> <span>Profile</span>
                        </button>
                        <button className={`nav-item ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
                            <Shield size={20} /> <span>Security</span>
                        </button>
                        <button className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>
                            <Bell size={20} /> <span>Notifications</span>
                        </button>
                        <button className={`nav-item ${activeTab === 'appearance' ? 'active' : ''}`} onClick={() => setActiveTab('appearance')}>
                            <Palette size={20} /> <span>Appearance</span>
                        </button>
                    </nav>

                    <div className="sidebar-footer">
                        <button className="logout-btn">
                            <LogOut size={20} /> <span>Log Out</span>
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