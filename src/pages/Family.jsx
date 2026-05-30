import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, Heart, Activity, 
  MapPin, Phone, MoreVertical 
} from 'lucide-react';
import { useTranslation } from '../common/LanguageContext';
import './Family.css';

const localTranslations = {
  en: {
    familyMembers: "Family Members",
    managingProfiles: "Managing health profiles and connectivity",
    searchPlaceholder: "Search member name or role...",
    activeProfiles: "Active Profiles",
    avgScore: "Average Score",
    lastSync: "Last Sync",
    twoMinAgo: "2m ago",
    viewDetails: "View Details",
    deleteMember: "Delete Member",
    scoreText: "Score",
    viewFullProfile: "View Full Profile",
    removeTitle: "Remove Family Member?",
    removeDesc: "This action will permanently delete this member's health data and profile records. This cannot be undone.",
    cancel: "Cancel",
    deletePermanently: "Delete Permanently",
    
    // Status
    healthy: "Healthy",
    active: "Active",
    checkupDue: "Checkup Due",
    resting: "Resting",
    
    // Emotion
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
    familyMembers: "أعضاء العائلة",
    managingProfiles: "إدارة الملفات الصحية والاتصال",
    searchPlaceholder: "البحث عن اسم العضو أو دوره...",
    activeProfiles: "الملفات النشطة",
    avgScore: "متوسط الدرجة",
    lastSync: "آخر مزامنة",
    twoMinAgo: "منذ دقيقتين",
    viewDetails: "عرض التفاصيل",
    deleteMember: "حذف العضو",
    scoreText: "درجة صحة",
    viewFullProfile: "عرض الملف الكامل",
    removeTitle: "إزالة عضو العائلة؟",
    removeDesc: "سيؤدي هذا الإجراء إلى حذف البيانات الصحية وسجلات الملف الشخصي لهذا العضو بشكل دائم. لا يمكن التراجع عن هذا الإجراء.",
    cancel: "إلغاء",
    deletePermanently: "حذف نهائياً",
    
    // Status
    healthy: "سليم",
    active: "نشط",
    checkupDue: "بانتظار الفحص",
    resting: "مستريح",
    
    // Emotion
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
  { id: 1, name: 'Mona', role: 'Mother', age: 42, score: '92%', emoji: '😊', emotion: 'Happy', status: 'Healthy', phone: '+123 456 789', email: 'mona@family.com', location: 'Home' },
  { id: 2, name: 'Ahmed', role: 'Father', age: 45, score: '85%', emoji: '👨', emotion: 'Focused', status: 'Active', phone: '+123 456 790', email: 'ahmed@family.com', location: 'Office' },
  { id: 3, name: 'Maya', role: 'Daughter', age: 16, score: '98%', emoji: '😁', emotion: 'Energetic', status: 'Healthy', phone: '+123 456 791', email: 'maya@family.com', location: 'School' },
  { id: 4, name: 'Omar', role: 'Son', age: 12, score: '95%', emoji: '👦', emotion: 'Playful', status: 'Healthy', phone: '+123 456 792', email: 'omar@family.com', location: 'Home' },
  { id: 5, name: 'Grandpa', role: 'Grandfather', age: 72, score: '78%', emoji: '👴', emotion: 'Calm', status: 'Checkup Due', phone: '+123 456 793', email: 'grandpa@family.com', location: 'Home' },
  { id: 6, name: 'Grandma', role: 'Grandmother', age: 68, score: '88%', emoji: '👵', emotion: 'Peaceful', status: 'Healthy', phone: '+123 456 794', email: 'grandma@family.com', location: 'Home' },
  { id: 7, name: 'Aunt Sara', role: 'Aunt', age: 38, score: '91%', emoji: '👩', emotion: 'Busy', status: 'Active', phone: '+123 456 795', email: 'sara@family.com', location: 'Studio' },
  { id: 8, name: 'Uncle Sam', role: 'Uncle', age: 40, score: '82%', emoji: '👨', emotion: 'Tired', status: 'Resting', phone: '+123 456 796', email: 'sam@family.com', location: 'Home' },
  { id: 9, name: 'Cousin Lili', role: 'Cousin', age: 14, score: '94%', emoji: '👧', emotion: 'Excited', status: 'Healthy', phone: '+123 456 797', email: 'lili@family.com', location: 'Gym' },
  { id: 10, name: 'Cousin Leo', role: 'Cousin', age: 10, score: '96%', emoji: '👦', emotion: 'Quiet', status: 'Healthy', phone: '+123 456 798', email: 'leo@family.com', location: 'Home' },
];

const Family = ({ isCollapsed }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState(familyData);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const { language, t } = useTranslation();

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

  const filteredMembers = members.filter(member => {
    const translatedName = getNameLabel(member.name);
    const translatedRole = t(member.role);
    return translatedName.toLowerCase().includes(searchTerm.toLowerCase()) || 
           translatedRole.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDelete = () => {
    setMembers(members.filter(m => m.id !== deleteId));
    setDeleteId(null);
    setMenuOpenId(null);
  };

  return (
    <div className={`family-page-container ${isCollapsed ? 'is-collapsed' : ''}`}>
      <header className="family-page-header">
        <div className="family-header-left">
          <button className="family-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <div className="family-page-titles">
            <h1>{lf('familyMembers')}</h1>
            <p>{lf('managingProfiles')}</p>
          </div>
        </div>
        <div className="family-header-actions">
          <div className="family-search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder={lf('searchPlaceholder')} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="family-stats-banner">
        <div className="family-stat-card">
          <span>{lf('activeProfiles')}</span>
          <h2>{members.length}</h2>
        </div>
        <div className="family-stat-card">
          <span>{lf('avgScore')}</span>
          <h2>89%</h2>
        </div>
        <div className="family-stat-card">
          <span>{lf('lastSync')}</span>
          <h2>{lf('twoMinAgo')}</h2>
        </div>
      </div>

      <main className="family-members-grid">
        {filteredMembers.map(member => (
          <div key={member.id} className="family-profile-card">
            <div className="family-card-header">
              <div className="family-avatar-box">
                <span className="family-emoji">{member.emoji}</span>
                <span className={`family-status-indicator ${member.status.toLowerCase().replace(' ', '-')}`}></span>
              </div>
              <div className="family-more-actions">
                <button className="family-more-btn" onClick={() => setMenuOpenId(menuOpenId === member.id ? null : member.id)}>
                  <MoreVertical size={18} />
                </button>
                {menuOpenId === member.id && (
                  <div className="family-dropdown-menu">
                    <button className="family-dropdown-item" onClick={() => navigate(`/family-profile/${member.id}`)}>
                      {lf('viewDetails')}
                    </button>
                    <button className="family-dropdown-item delete" onClick={() => setDeleteId(member.id)}>
                      {lf('deleteMember')}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="family-card-body">
              <div className="family-name-role">
                <h3>{getNameLabel(member.name)}</h3>
                <span className="family-role-badge">{t(member.role)}</span>
              </div>
              
              <div className="family-health-insight">
                <div className="family-insight-item">
                  <Heart size={14} className="heart-icon" />
                  <span>{member.score} {lf('scoreText')}</span>
                </div>
                <div className="family-insight-item">
                  <Activity size={14} className="activity-icon" />
                  <span>{getEmotionLabel(member.emotion)}</span>
                </div>
              </div>

              <div className="family-contact-brief">
                <div className="contact-item">
                  <Phone size={14} />
                  <span>{member.phone}</span>
                </div>
                <div className="contact-item">
                  <MapPin size={14} />
                  <span>{getLocationLabel(member.location)}</span>
                </div>
              </div>
            </div>

            <div className="family-card-footer">
              <button className="family-profile-btn" onClick={() => navigate(`/family-profile/${member.id}`)}>
                {lf('viewFullProfile')}
              </button>
            </div>
          </div>
        ))}
      </main>

      {deleteId && (
        <div className="family-modal-overlay">
          <div className="family-delete-modal">
            <div className="family-modal-icon-danger">
              <Heart size={40} />
            </div>
            <h2>{lf('removeTitle')}</h2>
            <p>{lf('removeDesc')}</p>
            <div className="family-modal-actions">
              <button className="family-cancel-btn" onClick={() => setDeleteId(null)}>{lf('cancel')}</button>
              <button className="family-confirm-delete-btn" onClick={handleDelete}>{lf('deletePermanently')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Family;
