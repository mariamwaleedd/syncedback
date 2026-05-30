import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Heart, Activity, Phone, Mail, 
  MapPin, Calendar, Shield, Award, Droplets,
  Thermometer, Wind, AlertCircle
} from 'lucide-react';
import { useTranslation } from '../common/LanguageContext';
import './FamilyProfile.css';

const localTranslations = {
  en: {
    memberNotFound: "Member not found",
    healthVitals: "Health Vitals",
    healthScore: "Health Score",
    emotion: "Emotion",
    bloodType: "Blood Type",
    fitnessLevel: "Fitness Level",
    personalInfo: "Personal Info",
    ageLabel: "Age",
    yearsOld: "Years Old",
    weightLabel: "Weight",
    heightLabel: "Height",
    contactDetails: "Contact details",
    phoneLabel: "Phone",
    emailLabel: "Email",
    locationLabel: "Location",
    securityPermissions: "Security Permissions",
    fullAccessLogs: "Full access to health logs and daily activity tracking system.",
    manageBtn: "Manage",
    emergencyContact: "Emergency Contact",
    notifyScoreDrop: "Notify primary health provider in case of score drop below 70%.",
    elite: "Elite",
    
    // Statuses
    healthy: "Healthy",
    active: "Active",
    checkupDue: "Checkup Due",
    resting: "Resting",
    
    // Emotions
    happy: "Happy",
    focused: "Focused",
    energetic: "Energetic",
    playful: "Playful",
    calm: "Calm",
    peaceful: "Peaceful",
    busy: "Busy",
    tired: "Tired",
    excited: "Excited",
    quiet: "Quiet",
    
    // Locations
    home: "Home",
    office: "Office",
    school: "School",
    studio: "Studio",
    gym: "Gym"
  },
  ar: {
    memberNotFound: "العضو غير موجود",
    healthVitals: "المؤشرات الحيوية الصحية",
    healthScore: "درجة الصحة",
    emotion: "الحالة المزاجية",
    bloodType: "فصيلة الدم",
    fitnessLevel: "مستوى اللياقة",
    personalInfo: "المعلومات الشخصية",
    ageLabel: "العمر",
    yearsOld: "سنة",
    weightLabel: "الوزن",
    heightLabel: "الطول",
    contactDetails: "تفاصيل الاتصال",
    phoneLabel: "الهاتف",
    emailLabel: "البريد الإلكتروني",
    locationLabel: "الموقع",
    securityPermissions: "صلاحيات الأمان",
    fullAccessLogs: "وصول كامل لسجلات الصحة ونظام تتبع النشاط اليومي.",
    manageBtn: "إدارة",
    emergencyContact: "جهة اتصال الطوارئ",
    notifyScoreDrop: "إخطار مقدم الرعاية الصحية الأساسي في حالة انخفاض الدرجة عن 70%.",
    elite: "ممتاز",
    
    // Statuses
    healthy: "سليم",
    active: "نشط",
    checkupDue: "بانتظار الفحص",
    resting: "مستريح",
    
    // Emotions
    happy: "سعيد",
    focused: "مركز",
    energetic: "نشيط",
    playful: "مرح",
    calm: "هادئ",
    peaceful: "مسالم",
    busy: "مشغول",
    tired: "متعب",
    excited: "متحمس",
    quiet: "هادئ",
    
    // Locations
    home: "المنزل",
    office: "المكتب",
    school: "المدرسة",
    studio: "الاستوديو",
    gym: "النادي الرياضي"
  }
};

const familyData = [
  { id: 1, name: 'Mona', role: 'Mother', age: 42, score: '92%', emoji: '😊', emotion: 'Happy', status: 'Healthy', phone: '+123 456 789', email: 'mona@family.com', location: 'Home', bloodType: 'A+', weight: '62 kg', height: '165 cm' },
  { id: 2, name: 'Ahmed', role: 'Father', age: 45, score: '85%', emoji: '👨', emotion: 'Focused', status: 'Active', phone: '+123 456 790', email: 'ahmed@family.com', location: 'Office', bloodType: 'O-', weight: '85 kg', height: '182 cm' },
  { id: 3, name: 'Maya', role: 'Daughter', age: 16, score: '98%', emoji: '😁', emotion: 'Energetic', status: 'Healthy', phone: '+123 456 791', email: 'maya@family.com', location: 'School', bloodType: 'A+', weight: '54 kg', height: '160 cm' },
  { id: 4, name: 'Omar', role: 'Son', age: 12, score: '95%', emoji: '👦', emotion: 'Playful', status: 'Healthy', phone: '+123 456 792', email: 'omar@family.com', location: 'Home', bloodType: 'A+', weight: '42 kg', height: '145 cm' },
  { id: 5, name: 'Grandpa', role: 'Grandfather', age: 72, score: '78%', emoji: '👴', emotion: 'Calm', status: 'Checkup Due', phone: '+123 456 793', email: 'grandpa@family.com', location: 'Home', bloodType: 'B+', weight: '78 kg', height: '175 cm' },
];

const FamilyProfile = ({ isCollapsed }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, t } = useTranslation();
  const member = familyData.find(m => m.id === parseInt(id));

  const [emergencyAlert, setEmergencyAlert] = React.useState(true);

  const lf = (key) => {
    const dict = localTranslations[language] || localTranslations['en'];
    return dict[key] || key;
  };

  const getStatusLabel = (status) => {
    const keyMap = {
      'Healthy': 'healthy',
      'Active': 'active',
      'Checkup Due': 'checkupDue',
      'Resting': 'resting'
    };
    return lf(keyMap[status] || status);
  };

  const getEmotionLabel = (emotion) => {
    const keyMap = {
      'Happy': 'happy',
      'Focused': 'focused',
      'Energetic': 'energetic',
      'Playful': 'playful',
      'Calm': 'calm',
      'Peaceful': 'peaceful',
      'Busy': 'busy',
      'Tired': 'tired',
      'Excited': 'excited',
      'Quiet': 'quiet'
    };
    return lf(keyMap[emotion] || emotion);
  };

  const getLocationLabel = (location) => {
    const keyMap = {
      'Home': 'home',
      'Office': 'office',
      'School': 'school',
      'Studio': 'studio',
      'Gym': 'gym'
    };
    return lf(keyMap[location] || location);
  };

  const getNameLabel = (name) => {
    const fallback = t(name);
    return fallback !== name ? fallback : name;
  };

  if (!member) {
    return <div className="profile-error">{lf('memberNotFound')}</div>;
  }

  return (
    <div className={`family-profile-container ${isCollapsed ? 'is-collapsed' : ''}`}>
      <header className="profile-hero-header">
        <button className="profile-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <div className="profile-hero-content">
          <div className="profile-avatar-large">
            <span className="profile-emoji-large">{member.emoji}</span>
          </div>
          <div className="profile-main-info">
            <h1>{getNameLabel(member.name)}</h1>
            <div className="profile-badges">
              <span className="profile-role-tag">{t(member.role)}</span>
              <span className={`profile-status-tag ${member.status.toLowerCase().replace(' ', '-')}`}>{getStatusLabel(member.status)}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="profile-content-grid">
        <section className="profile-vitals-section">
          <h2>{lf('healthVitals')}</h2>
          <div className="vitals-grid">
            <div className="vital-card">
              <Heart className="vital-icon heart" size={24} />
              <div className="vital-text">
                <span>{lf('healthScore')}</span>
                <h3>{member.score}</h3>
              </div>
            </div>
            <div className="vital-card">
              <Activity className="vital-icon activity" size={24} />
              <div className="vital-text">
                <span>{lf('emotion')}</span>
                <h3>{getEmotionLabel(member.emotion)}</h3>
              </div>
            </div>
            <div className="vital-card">
              <Droplets className="vital-icon drop" size={24} />
              <div className="vital-text">
                <span>{lf('bloodType')}</span>
                <h3>{member.bloodType}</h3>
              </div>
            </div>
            <div className="vital-card">
              <Award className="vital-icon award" size={24} />
              <div className="vital-text">
                <span>{lf('fitnessLevel')}</span>
                <h3>{lf('elite')}</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="profile-details-column">
          <div className="detail-group">
            <h3>{lf('personalInfo')}</h3>
            <div className="detail-list">
              <div className="detail-item">
                <Calendar size={18} />
                <div className="item-text">
                  <label>{lf('ageLabel')}</label>
                  <span>{member.age} {lf('yearsOld')}</span>
                </div>
              </div>
              <div className="detail-item">
                <Thermometer size={18} />
                <div className="item-text">
                  <label>{lf('weightLabel')}</label>
                  <span>{member.weight}</span>
                </div>
              </div>
              <div className="detail-item">
                <Wind size={18} />
                <div className="item-text">
                  <label>{lf('heightLabel')}</label>
                  <span>{member.height}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-group">
            <h3>{lf('contactDetails')}</h3>
            <div className="detail-list">
              <div className="detail-item">
                <Phone size={18} />
                <div className="item-text">
                  <label>{lf('phoneLabel')}</label>
                  <span>{member.phone}</span>
                </div>
              </div>
              <div className="detail-item">
                <Mail size={18} />
                <div className="item-text">
                  <label>{lf('emailLabel')}</label>
                  <span>{member.email}</span>
                </div>
              </div>
              <div className="detail-item">
                <MapPin size={18} />
                <div className="item-text">
                  <label>{lf('locationLabel')}</label>
                  <span>{getLocationLabel(member.location)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="profile-security-section">
          <div className="security-card">
            <Shield size={24} />
            <div className="security-info">
              <h4>{lf('securityPermissions')}</h4>
              <p>{lf('fullAccessLogs')}</p>
            </div>
            <button className="security-btn">{lf('manageBtn')}</button>
          </div>
          
          <div className="emergency-alert-card">
            <AlertCircle size={24} />
            <div className="alert-info">
              <h4>{lf('emergencyContact')}</h4>
              <p>{lf('notifyScoreDrop')}</p>
            </div>
            <div className={`custom-toggle ${emergencyAlert ? 'active' : ''}`} onClick={() => setEmergencyAlert(!emergencyAlert)}>
              <div className="handle"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FamilyProfile;
