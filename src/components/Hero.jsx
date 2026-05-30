import React from 'react';
import { 
  Eye, Users, FileCode, Zap, Activity, 
  TrendingUp, CheckCircle, Smartphone, Monitor, Tablet 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../common/LanguageContext';
import './Hero.css';

const chartData = [
  { name: 'Mon', value: 30 },
  { name: 'Tue', value: 45 },
  { name: 'Wed', value: 35 },
  { name: 'Thu', value: 60 },
  { name: 'Fri', value: 40 },
  { name: 'Sat', value: 85 },
  { name: 'Sun', value: 65 },
];

const Hero = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = React.useState('7 Days');
  const { language, t } = useTranslation();

  const daysTranslation = React.useMemo(() => ({
    'Mon': language === 'ar' ? 'الإثنين' : 'Mon',
    'Tue': language === 'ar' ? 'الثلاثاء' : 'Tue',
    'Wed': language === 'ar' ? 'الأربعاء' : 'Wed',
    'Thu': language === 'ar' ? 'الخميس' : 'Thu',
    'Fri': language === 'ar' ? 'الجمعة' : 'Fri',
    'Sat': language === 'ar' ? 'السبت' : 'Sat',
    'Sun': language === 'ar' ? 'الأحد' : 'Sun',
  }), [language]);

  const filteredData = React.useMemo(() => {
    let data = chartData;
    if (activeFilter === '24h') {
      data = chartData.slice(-3).map((d, i) => ({ ...d, name: language === 'ar' ? ['10ص', '2م', '6م'][i] : ['10am', '2pm', '6pm'][i] }));
    } else if (activeFilter === '30 Days') {
      data = [...chartData, ...chartData, ...chartData, ...chartData].slice(0, 30).map((d, i) => ({ ...d, name: language === 'ar' ? `يوم ${i+1}` : `Day ${i+1}` }));
    } else {
      data = chartData.map(d => ({ ...d, name: daysTranslation[d.name] || d.name }));
    }
    return data;
  }, [activeFilter, language, daysTranslation]);

  return (
    <div className="hero-container">
      <div className="hero-stats-grid">
        <div className="hero-stat-card" onClick={() => navigate('/analytics')}>
          <div className="hero-stat-header">
            <div className="hero-stat-icon-box blue"><Eye size={20} /></div>
            <TrendingUp size={16} className="hero-trend-up" />
          </div>
          <h2>48.2K</h2>
          <p>{t('totalPageViews')}</p>
          <span className="hero-stat-change hero-positive">+12.5% <small>{t('vsLastWeek')}</small></span>
        </div>

        <div className="hero-stat-card" onClick={() => navigate('/analytics')}>
          <div className="hero-stat-header">
            <div className="hero-stat-icon-box hero-purple"><Users size={20} /></div>
            <TrendingUp size={16} className="hero-trend-up" />
          </div>
          <h2>3,847</h2>
          <p>{t('activeUsers')}</p>
          <span className="hero-stat-change hero-positive">+8.2% <small>{t('vsLastWeek')}</small></span>
        </div>

        <div className="hero-stat-card" onClick={() => navigate('/manage-pages')}>
          <div className="hero-stat-header">
            <div className="hero-stat-icon-box hero-green"><FileCode size={20} /></div>
            <CheckCircle size={16} className="hero-trend-check" />
          </div>
          <h2>54</h2>
          <p>{t('totalPages')}</p>
          <span className="hero-stat-change active">{t('allActive')} <small>{t('noErrors')}</small></span>
        </div>

        <div className="hero-stat-card" onClick={() => navigate('/services')}>
          <div className="hero-stat-header">
            <div className="hero-stat-icon-box hero-orange"><Zap size={20} /></div>
            <TrendingUp size={16} className="hero-trend-up" />
          </div>
          <h2>23</h2>
          <p>{t('activeFeatures')}</p>
          <span className="hero-stat-change active">100% <small>{t('operational')}</small></span>
        </div>

        <div className="hero-stat-card" onClick={() => navigate('/activities')}>
          <div className="hero-stat-header">
            <div className="hero-stat-icon-box hero-cyan"><Activity size={20} /></div>
            <Activity size={16} className="hero-trend-pulse" />
          </div>
          <h2>99.9%</h2>
          <p>{t('uptime')}</p>
          <span className="hero-stat-change active">{t('healthy')} <small>{t('allSystems')}</small></span>
        </div>
      </div>

      <div className="hero-main-dashboard-grid">
        <div className="hero-chart-section">
          <div className="hero-section-header">
            <div>
              <h3>{t('trafficAnalytics')}</h3>
              <p>{t('pageViewsTime')}</p>
            </div>
            <div className="hero-filter-tabs">
              {['24h', '7 Days', '30 Days'].map(tab => {
                let tabLabel = tab;
                if (language === 'ar') {
                  if (tab === '24h') tabLabel = '24 ساعة';
                  else if (tab === '7 Days') tabLabel = '7 أيام';
                  else if (tab === '30 Days') tabLabel = '30 يوم';
                }
                return (
                  <button 
                    key={tab} 
                    className={activeFilter === tab ? 'active' : ''} 
                    onClick={() => setActiveFilter(tab)}
                  >
                    {tabLabel}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#2B7FFF' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2B7FFF" 
                  strokeWidth={3} 
                  dot={false} 
                  activeDot={{ r: 6, fill: '#2B7FFF' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="hero-device-distribution">
            <h3>{t('deviceDistribution')}</h3>
            <div className="hero-device-grid">
              <div className="hero-device-item">
                <Smartphone size={24} className="hero-device-icon" />
                <h4>68%</h4>
                <p>{t('mobile')}</p>
              </div>
              <div className="hero-device-item">
                <Monitor size={24} className="hero-device-icon" />
                <h4>24%</h4>
                <p>{t('desktop')}</p>
              </div>
              <div className="hero-device-item">
                <Tablet size={24} className="hero-device-icon" />
                <h4>8%</h4>
                <p>{t('tablet')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-activity-section">
          <h3>{t('recentActivity')}</h3>
          <div className="hero-activity-list">
            {[
              { icon: <FileCode />, title: t('pageUpdated'), sub: t('familyDashboard'), time: `5 ${t('minAgo')}`, type: t('admin') },
              { icon: <Activity />, title: t('featureEnabled'), sub: t('aiAssistant'), time: `23 ${t('minAgo')}`, type: t('system') },
              { icon: <Zap />, title: t('newPageCreated'), sub: t('uploadReport'), time: `1 ${t('hourAgo')}`, type: t('admin') },
              { icon: <FileCode />, title: t('settingsModified'), sub: t('notificationSystem'), time: `2 ${t('hoursAgo')}`, type: t('admin') },
              { icon: <Activity />, title: t('databaseBackup'), sub: t('fullBackup'), time: `3 ${t('hoursAgo')}`, type: t('system') },
            ].map((item, i) => (
              <div key={i} className="hero-activity-item" onClick={() => navigate('/activities')}>
                <div className="hero-activity-icon">{item.icon}</div>
                <div className="activity-content">
                  <div className="activity-row">
                    <span className="hero-activity-title">{item.title}</span>
                  </div>
                  <span className="hero-activity-sub">{item.sub}</span>
                  <div className="hero-activity-meta">
                    {item.type} • {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;