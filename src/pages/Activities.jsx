import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, Bell, Activity, 
  Clock, ShieldAlert, Heart, Calendar, ChevronRight 
} from 'lucide-react';
import { useTranslation } from '../common/LanguageContext';
import './Activities.css';

const localTranslations = {
  en: {
    activityRecords: "Activity Records",
    fullHistory: "Full history of health logs and notifications",
    totalLogs: "Total Logs",
    searchPlaceholder: "Search logs or patients...",
    noActivities: "No activities found",
    tryAdjusting: "Try adjusting your search or filters to find what you're looking for.",
    resetFilters: "Reset Filters",
    details: "Details",
    filterAll: "All",
    filterHigh: "High",
    filterRoutine: "Routine",
    filterUpcoming: "Upcoming",
    filterSystem: "System",
    filterSecurity: "Security",
    
    // Data titles
    healthAlert: "Health Alert",
    medication: "Medication",
    appointment: "Appointment",
    syncComplete: "Sync Complete",
    security: "Security",
    labResults: "Lab Results",
    exercise: "Exercise",
    vitalsSync: "Vitals Sync",
    
    // Data subs
    mayasDrop: "Maya's health score dropped",
    ahmedVitamins: "Ahmed's daily vitamins",
    grandpaCheckup: "Grandpa's checkup scheduled",
    grandmaSync: "Grandma's fitness data synced",
    emergencyVerified: "Emergency contacts verified",
    bloodTestReady: "Blood test results ready",
    mayasWalk: "Maya's morning walk: 5km",
    oxygenUpdated: "Oxygen levels updated",
    
    // Time relative
    oneHourAgo: "1 hour ago",
    threeHoursAgo: "3 hours ago",
    fiveHoursAgo: "5 hours ago",
    oneDayAgo: "1 day ago",
    twoDaysAgo: "2 days ago",
    threeDaysAgo: "3 days ago",
    fourDaysAgo: "4 days ago",
    fiveDaysAgo: "5 days ago"
  },
  ar: {
    activityRecords: "سجلات النشاط",
    fullHistory: "السجل الكامل للتقارير الصحية والإشعارات",
    totalLogs: "إجمالي السجلات",
    searchPlaceholder: "البحث عن السجلات أو المرضى...",
    noActivities: "لم يتم العثور على أنشطة",
    tryAdjusting: "حاول تعديل البحث أو التصفية للعثور على ما تبحث عنه.",
    resetFilters: "إعادة تعيين الفلاتر",
    details: "التفاصيل",
    filterAll: "الكل",
    filterHigh: "مرتفع",
    filterRoutine: "روتيني",
    filterUpcoming: "قادم",
    filterSystem: "النظام",
    filterSecurity: "الأمان",
    
    // Data titles
    healthAlert: "تنبيه صحي",
    medication: "العلاج",
    appointment: "موعد",
    syncComplete: "مزامنة كاملة",
    security: "الأمان",
    labResults: "نتائج المختبر",
    exercise: "التمارين",
    vitalsSync: "مزامنة العلامات الحيوية",
    
    // Data subs
    mayasDrop: "انخفضت درجة صحة مايا",
    ahmedVitamins: "الفيتامينات اليومية لأحمد",
    grandpaCheckup: "تم تحديد موعد فحص الجد",
    grandmaSync: "تمت مزامنة بيانات لياقة الجدة",
    emergencyVerified: "تم التحقق من جهات اتصال الطوارئ",
    bloodTestReady: "نتائج فحص الدم جاهزة",
    mayasWalk: "مشي مايا الصباحي: 5 كم",
    oxygenUpdated: "تم تحديث مستويات الأكسجين",
    
    // Time relative
    oneHourAgo: "منذ ساعة",
    threeHoursAgo: "منذ 3 ساعات",
    fiveHoursAgo: "منذ 5 ساعات",
    oneDayAgo: "منذ يوم",
    twoDaysAgo: "منذ يومين",
    threeDaysAgo: "منذ 3 أيام",
    fourDaysAgo: "منذ 4 أيام",
    fiveDaysAgo: "منذ 5 أيام"
  }
};

const Activities = ({ isCollapsed }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const { language } = useTranslation();

  const la = (key) => {
    const dict = localTranslations[language] || localTranslations['en'];
    return dict[key] || key;
  };

  const allActivities = [
    { id: 1, titleKey: 'healthAlert', subKey: "mayasDrop", type: 'High', timeKey: 'oneHourAgo', date: '2026-04-07', icon: <ShieldAlert size={20} /> },
    { id: 2, titleKey: 'medication', subKey: "ahmedVitamins", type: 'Routine', timeKey: 'threeHoursAgo', date: '2026-04-07', icon: <Heart size={20} /> },
    { id: 3, titleKey: 'appointment', subKey: "grandpaCheckup", type: 'Upcoming', timeKey: 'fiveHoursAgo', date: '2026-04-07', icon: <Clock size={20} /> },
    { id: 4, titleKey: 'syncComplete', subKey: "grandmaSync", type: 'System', timeKey: 'oneDayAgo', date: '2026-04-06', icon: <Activity size={20} /> },
    { id: 5, titleKey: 'security', subKey: 'emergencyVerified', type: 'Security', timeKey: 'twoDaysAgo', date: '2026-04-05', icon: <Bell size={20} /> },
    { id: 6, titleKey: 'labResults', subKey: 'bloodTestReady', type: 'High', timeKey: 'threeDaysAgo', date: '2026-04-04', icon: <ShieldAlert size={20} /> },
    { id: 7, titleKey: 'exercise', subKey: "mayasWalk", type: 'Routine', timeKey: 'fourDaysAgo', date: '2026-04-03', icon: <Heart size={20} /> },
    { id: 8, titleKey: 'vitalsSync', subKey: 'oxygenUpdated', type: 'System', timeKey: 'fiveDaysAgo', date: '2026-04-02', icon: <Activity size={20} /> },
  ];

  const filters = [
    { key: 'All', labelKey: 'filterAll' },
    { key: 'High', labelKey: 'filterHigh' },
    { key: 'Routine', labelKey: 'filterRoutine' },
    { key: 'Upcoming', labelKey: 'filterUpcoming' },
    { key: 'System', labelKey: 'filterSystem' },
    { key: 'Security', labelKey: 'filterSecurity' }
  ];

  const filteredActivities = allActivities.filter(activity => {
    const titleText = la(activity.titleKey);
    const subText = la(activity.subKey);
    const matchesSearch = titleText.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          subText.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || activity.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`activities-page-container ${isCollapsed ? 'is-collapsed' : ''}`}>
      <header className="activities-page-header">
        <div className="activities-header-left">
          <button className="activities-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <div className="activities-titles">
            <h1>{la('activityRecords')}</h1>
            <p>{la('fullHistory')}</p>
          </div>
        </div>
        <div className="activities-header-stats">
          <div className="activities-stat-item">
            <span>{la('totalLogs')}</span>
            <strong>{allActivities.length}</strong>
          </div>
        </div>
      </header>

      <section className="activities-controls">
        <div className="activities-search-wrapper">
          <Search size={18} className="activities-search-icon" />
          <input 
            type="text" 
            placeholder={la('searchPlaceholder')} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="activities-filters-scroll">
          {filters.map(filter => (
            <button 
              key={filter.key}
              className={`activities-filter-chip ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {la(filter.labelKey)}
            </button>
          ))}
        </div>
      </section>

      <main className="activities-list-container">
        {filteredActivities.length > 0 ? (
          <div className="activities-grouped-list">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="activities-card-row">
                <div className={`activities-icon-box type-${activity.type.toLowerCase()}`}>
                  {activity.icon}
                </div>
                <div className="activities-card-main">
                  <div className="activities-card-header">
                    <h3>{la(activity.titleKey)}</h3>
                    <div className="activities-card-meta">
                      <span className={`activities-tag type-${activity.type.toLowerCase()}`}>
                        {la(`filter${activity.type}`)}
                      </span>
                      <span className="activities-time-stamp">
                        <Clock size={12} /> {la(activity.timeKey)}
                      </span>
                    </div>
                  </div>
                  <p className="activities-description">{la(activity.subKey)}</p>
                  <div className="activities-card-footer">
                    <span className="activities-date">
                      <Calendar size={12} /> {activity.date}
                    </span>
                    <button className="activities-details-link">
                      {la('details')} <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="activities-empty-state">
            <div className="activities-empty-icon">
              <Activity size={48} />
            </div>
            <h3>{la('noActivities')}</h3>
            <p>{la('tryAdjusting')}</p>
            <button className="activities-reset-btn" onClick={() => { setSearchTerm(''); setActiveFilter('All'); }}>
              {la('resetFilters')}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Activities;
