import React from 'react';
import { 
  User, Mail, Phone, MapPin, Shield, 
  Key, Bell, Smartphone, Globe, Camera,
  ExternalLink, Award, Briefcase, Calendar, Zap, Code
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDialog } from '../common/DialogContext';
import { useTranslation } from '../common/LanguageContext';
import './Profile.css';

const localTranslations = {
  en: {
    personalDetails: "Personal Details",
    accountAnalytics: "Account Analytics",
    socialConnect: "Social Connect",
    securitySettings: "Security Settings",
    notifications: "Notifications",
    fullName: "Full Name",
    role: "Role",
    emailAddress: "Email Address",
    contactNo: "Contact No",
    location: "Location",
    aboutMe: "About Me",
    updateProfile: "Update Profile",
    tasksDone: "Tasks Done",
    projects: "Projects",
    efficiency: "Efficiency",
    activeDays: "Active Days",
    githubProfile: "GitHub Profile",
    linkedinProfile: "LinkedIn Profile",
    twitterX: "Twitter / X",
    passwordManagement: "Password Management",
    lastChangedDec: "Last changed Dec 2025",
    twoFaSecurity: "2FA Security",
    enabledExtraSafety: "Enabled for extra safety",
    edit: "Edit",
    emailNotifications: "Email Notifications",
    pushUpdates: "Push Updates",
    joinedDate: "Super User • Joined April 2026",
    successMsg: "Profile details updated successfully!",
    githubAlert: "Opening GitHub Profile...",
    linkedinAlert: "Redirecting to LinkedIn...",
    twitterAlert: "Redirecting to Twitter...",
    aboutMeDefault: "Full-stack developer with 5+ years of experience in building modern, performant web applications using React, Next.js, and Node.js. Passionate about UI/UX and system architecture."
  },
  ar: {
    personalDetails: "البيانات الشخصية",
    accountAnalytics: "تحليلات الحساب",
    socialConnect: "اتصالات التواصل الاجتماعي",
    securitySettings: "إعدادات الأمان",
    notifications: "الإشعارات",
    fullName: "الاسم الكامل",
    role: "الدور",
    emailAddress: "البريد الإلكتروني",
    contactNo: "رقم الاتصال",
    location: "الموقع",
    aboutMe: "نبذة عني",
    updateProfile: "تحديث الملف الشخصي",
    tasksDone: "المهام المكتملة",
    projects: "المشاريع",
    efficiency: "الكفاءة",
    activeDays: "أيام النشاط",
    githubProfile: "ملف GitHub الشخصي",
    linkedinProfile: "ملف LinkedIn الشخصي",
    twitterX: "تويتر / X",
    passwordManagement: "إدارة كلمة المرور",
    lastChangedDec: "آخر تغيير في ديسمبر ٢٠٢٥",
    twoFaSecurity: "أمان المصادقة الثنائية (2FA)",
    enabledExtraSafety: "مفعّلة لمزيد من الأمان",
    edit: "تعديل",
    emailNotifications: "إشعارات البريد الإلكتروني",
    pushUpdates: "تحديثات دفع الإشعارات",
    joinedDate: "مشرف متميز • انضم في أبريل ٢٠٢٦",
    successMsg: "تم تحديث تفاصيل الملف الشخصي بنجاح!",
    githubAlert: "جاري فتح ملف GitHub الشخصي...",
    linkedinAlert: "جاري توجيهك إلى LinkedIn...",
    twitterAlert: "جاري توجيهك إلى تويتر...",
    aboutMeDefault: "مطورة شاملة مع أكثر من 5 سنوات من الخبرة في بناء تطبيقات ويب حديثة وفعالة باستخدام React وNext.js وNode.js. شغوفة بتصميم واجهات وتجربة المستخدم وهندسة البرمجيات."
  }
};

const Profile = ({ isCollapsed }) => {
  const [toggleStates, setToggleStates] = React.useState({
    tfa: true,
    email: true,
    push: true
  });
  const navigate = useNavigate();
  const { alert } = useDialog();
  const { language } = useTranslation();

  const lp = (key) => {
    const dict = localTranslations[language] || localTranslations['en'];
    return dict[key] || key;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    alert(lp('successMsg'), 'success');
  };

  const handleToggle = (key) => {
    setToggleStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={`dashboard-container profile-page ${isCollapsed ? 'is-collapsed' : ''}`}>
      <div className="profile-header-banner">
        <div className="profile-banner-overlay"></div>
        <div className="profile-main-info">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">M</div>
          </div>
          <div className="profile-name-section">
            <div className="profile-name-with-badge">
              <h1>Mariam Waleed</h1>
              <span className="profile-verify-badge"><Zap size={12} fill="currentColor" /> Pro</span>
            </div>
            <p>{lp('joinedDate')}</p>
          </div>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-left-col">
          <div className="profile-card info-card">
            <div className="profile-card-header">
              <User size={20} className="profile-header-icon" />
              <h3>{lp('personalDetails')}</h3>
            </div>
            <div className="profile-details-form">
              <div className="profile-input-row">
                <div className="profile-input-group">
                  <label><User size={14} /> {lp('fullName')}</label>
                  <input type="text" defaultValue="Mariam Waleed" />
                </div>
                <div className="profile-input-group">
                  <label><Briefcase size={14} /> {lp('role')}</label>
                  <input type="text" defaultValue={language === 'ar' ? 'مشرف متميز / مدير النظام' : 'Super User / Administrator'} />
                </div>
              </div>
              <div className="profile-input-group">
                <label><Mail size={14} /> {lp('emailAddress')}</label>
                <input type="email" defaultValue="mariam@123.com" />
              </div>
              <div className="profile-input-row">
                <div className="profile-input-group">
                  <label><Phone size={14} /> {lp('contactNo')}</label>
                  <input type="text" defaultValue="+20 123 456 7890" />
                </div>
                <div className="profile-input-group">
                  <label><MapPin size={14} /> {lp('location')}</label>
                  <input type="text" defaultValue={language === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt'} />
                </div>
              </div>
              <div className="profile-input-group">
                <label><Calendar size={14} /> {lp('aboutMe')}</label>
                <textarea defaultValue={lp('aboutMeDefault')} />
              </div>
              <div className="form-actions">
                <button className="profile-save-btn" onClick={handleUpdate}>{lp('updateProfile')}</button>
              </div>
            </div>
          </div>

          <div className="profile-card stats-card">
            <div className="profile-card-header">
              <Zap size={20} className="profile-header-icon" />
              <h3>{lp('accountAnalytics')}</h3>
            </div>
            <div className="profile-stats-inner-grid" onClick={() => navigate('/analytics')} style={{ cursor: 'pointer' }}>
              <div className="profile-stat-item">
                <div className="profile-stat-icon-box blue"><Zap size={20} /></div>
                <h4>154</h4>
                <p>{lp('tasksDone')}</p>
              </div>
              <div className="profile-stat-item">
                <div className="profile-stat-icon-box purple"><Briefcase size={20} /></div>
                <h4>12</h4>
                <p>{lp('projects')}</p>
              </div>
              <div className="profile-stat-item">
                <div className="profile-stat-icon-box green"><Award size={20} /></div>
                <h4>85%</h4>
                <p>{lp('efficiency')}</p>
              </div>
              <div className="profile-stat-item">
                <div className="profile-stat-icon-box orange"><Calendar size={20} /></div>
                <h4>48</h4>
                <p>{lp('activeDays')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-right-col">
          <div className="profile-card social-card">
            <div className="profile-card-header">
              <Globe size={20} className="profile-header-icon" />
              <h3>{lp('socialConnect')}</h3>
            </div>
            <div className="profile-social-links-list">
              <div className="profile-social-item" onClick={() => alert(lp('githubAlert'), 'info')}>
                <div className="profile-social-icon profile-github"><Code size={18} /></div>
                <span>{lp('githubProfile')}</span>
                <ExternalLink size={14} className="profile-ext-icon" />
              </div>
              <div className="profile-social-item" onClick={() => alert(lp('linkedinAlert'), 'info')}>
                <div className="profile-social-icon profile-linkedin"><ExternalLink size={14} /></div>
                <span>{lp('linkedinProfile')}</span>
                <ExternalLink size={14} className="profile-ext-icon" />
              </div>
              <div className="profile-social-item" onClick={() => alert(lp('twitterAlert'), 'info')}>
                <div className="profile-social-icon profile-twitter"><Globe size={18} /></div>
                <span>{lp('twitterX')}</span>
                <ExternalLink size={14} className="profile-ext-icon" />
              </div>
            </div>
          </div>

          <div className="profile-card security-card">
            <div className="profile-card-header">
              <Shield size={20} className="profile-header-icon" />
              <h3>{lp('securitySettings')}</h3>
            </div>
            <div className="profile-security-list">
              <div className="profile-security-item">
                <div className="profile-security-info">
                  <div className="profile-sec-icon-box"><Key size={18} /></div>
                  <div>
                    <h4>{lp('passwordManagement')}</h4>
                    <p>{lp('lastChangedDec')}</p>
                  </div>
                </div>
                <button className="profile-sec-action-btn" onClick={() => navigate('/settings')}>{lp('edit')}</button>
              </div>
              <div className="profile-security-item">
                <div className="profile-security-info">
                  <div className="profile-sec-icon-box"><Smartphone size={18} /></div>
                  <div>
                    <h4>{lp('twoFaSecurity')}</h4>
                    <p>{lp('enabledExtraSafety')}</p>
                  </div>
                </div>
                <div className={`custom-toggle ${toggleStates.tfa ? 'active' : ''}`} onClick={() => handleToggle('tfa')}>
                  <div className="handle"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-card preferences-card">
            <div className="profile-card-header">
              <Bell size={20} className="profile-header-icon" />
              <h3>{lp('notifications')}</h3>
            </div>
            <div className="profile-pref-list">
              <div className="profile-pref-row">
                <span>{lp('emailNotifications')}</span>
                <div className={`custom-toggle ${toggleStates.email ? 'active' : ''}`} onClick={() => handleToggle('email')}>
                  <div className="handle"></div>
                </div>
              </div>
              <div className="profile-pref-row">
                <span>{lp('pushUpdates')}</span>
                <div className={`custom-toggle ${toggleStates.push ? 'active' : ''}`} onClick={() => handleToggle('push')}>
                  <div className="handle"></div>
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
