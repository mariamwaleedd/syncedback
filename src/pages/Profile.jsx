import React from 'react';
import { 
  User, Mail, Phone, MapPin, Shield, 
  Key, Bell, Smartphone, Globe, Camera,
  ExternalLink, Award, Briefcase, Calendar, Zap, Code
} from 'lucide-react';
import './Profile.css';

const Profile = ({ isCollapsed }) => {
  return (
    <div className={`dashboard-container profile-page ${isCollapsed ? 'is-collapsed' : ''}`}>
      <div className="profile-header-banner">
        <div className="banner-overlay"></div>
        <div className="profile-main-info">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">M</div>
          </div>
          <div className="profile-name-section">
            <div className="name-with-badge">
              <h1>Mariam Waleed</h1>
              <span className="verify-badge"><Zap size={12} fill="currentColor" /> Pro</span>
            </div>
            <p>Super User • Joined April 2026</p>
          </div>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-left-col">
          <div className="profile-card info-card">
            <div className="card-header">
              <User size={20} className="header-icon" />
              <h3>Personal Details</h3>
            </div>
            <div className="details-form">
              <div className="input-row">
                <div className="input-group">
                  <label><User size={14} /> Full Name</label>
                  <input type="text" defaultValue="Mariam Waleed" />
                </div>
                <div className="input-group">
                  <label><Briefcase size={14} /> Role</label>
                  <input type="text" defaultValue="Super User / Administrator" />
                </div>
              </div>
              <div className="input-group">
                <label><Mail size={14} /> Email Address</label>
                <input type="email" defaultValue="mariam@123.com" />
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label><Phone size={14} /> Contact No</label>
                  <input type="text" defaultValue="+20 123 456 7890" />
                </div>
                <div className="input-group">
                  <label><MapPin size={14} /> Location</label>
                  <input type="text" defaultValue="Cairo, Egypt" />
                </div>
              </div>
              <div className="input-group">
                <label><Calendar size={14} /> About Me</label>
                <textarea defaultValue="Full-stack developer with 5+ years of experience in building modern, performant web applications using React, Next.js, and Node.js. Passionate about UI/UX and system architecture." />
              </div>
              <div className="form-actions">
                <button className="save-btn">Update Profile</button>
              </div>
            </div>
          </div>

          <div className="profile-card stats-card">
            <div className="card-header">
              <Zap size={20} className="header-icon" />
              <h3>Account Analytics</h3>
            </div>
            <div className="stats-inner-grid">
              <div className="stat-item">
                <div className="stat-icon-box blue"><Zap size={20} /></div>
                <h4>154</h4>
                <p>Tasks Done</p>
              </div>
              <div className="stat-item">
                <div className="stat-icon-box purple"><Briefcase size={20} /></div>
                <h4>12</h4>
                <p>Projects</p>
              </div>
              <div className="stat-item">
                <div className="stat-icon-box green"><Award size={20} /></div>
                <h4>85%</h4>
                <p>Efficiency</p>
              </div>
              <div className="stat-item">
                <div className="stat-icon-box orange"><Calendar size={20} /></div>
                <h4>48</h4>
                <p>Active Days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-right-col">
          <div className="profile-card social-card">
            <div className="card-header">
              <Globe size={20} className="header-icon" />
              <h3>Social Connect</h3>
            </div>
            <div className="social-links-list">
              <a href="#" className="social-item">
                <div className="social-icon github"><Code size={18} /></div>
                <span>GitHub Profile</span>
                <ExternalLink size={14} className="ext-icon" />
              </a>
              <a href="#" className="social-item">
                <div className="social-icon linkedin"><ExternalLink size={18} /></div>
                <span>LinkedIn Profile</span>
                <ExternalLink size={14} className="ext-icon" />
              </a>
              <a href="#" className="social-item">
                <div className="social-icon twitter"><Globe size={18} /></div>
                <span>Twitter / X</span>
                <ExternalLink size={14} className="ext-icon" />
              </a>
            </div>
          </div>

          <div className="profile-card security-card">
            <div className="card-header">
              <Shield size={20} className="header-icon" />
              <h3>Security Settings</h3>
            </div>
            <div className="security-list">
              <div className="security-item">
                <div className="security-info">
                  <div className="sec-icon-box"><Key size={18} /></div>
                  <div>
                    <h4>Password Management</h4>
                    <p>Last changed Dec 2025</p>
                  </div>
                </div>
                <button className="sec-action-btn">Edit</button>
              </div>
              <div className="security-item">
                <div className="security-info">
                  <div className="sec-icon-box"><Smartphone size={18} /></div>
                  <div>
                    <h4>2FA Security</h4>
                    <p>Enabled for extra safety</p>
                  </div>
                </div>
                <div className="toggle-box">
                  <input type="checkbox" id="2fa-toggle" defaultChecked />
                  <label htmlFor="2fa-toggle"></label>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-card preferences-card">
            <div className="card-header">
              <Bell size={20} className="header-icon" />
              <h3>Notifications</h3>
            </div>
            <div className="pref-list">
              <div className="pref-row">
                <span>Email Notifications</span>
                <div className="toggle-box">
                  <input type="checkbox" id="pref-email" defaultChecked />
                  <label htmlFor="pref-email"></label>
                </div>
              </div>
              <div className="pref-row">
                <span>Push Updates</span>
                <div className="toggle-box">
                  <input type="checkbox" id="pref-push" defaultChecked />
                  <label htmlFor="pref-push"></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
