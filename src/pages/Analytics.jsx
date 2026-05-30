import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, Filter, TrendingUp, Globe, BarChart2, 
    Activity, User, MessageSquare, ExternalLink, 
    Download, Share2, FileText, ChevronRight, Zap,
    CheckCircle, AlertCircle
} from 'lucide-react';
import RichTextToolbar from '../common/RichTextToolbar';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { supabase } from '../Supabase';
import { useTranslation } from '../common/LanguageContext';
import './Analytics.css';

const trafficData = [
    { name: 'Mon', users: 3000, views: 4500 },
    { name: 'Tue', users: 3500, views: 5200 },
    { name: 'Wed', users: 3200, views: 4800 },
    { name: 'Thu', users: 4500, views: 6100 },
    { name: 'Fri', users: 6800, views: 7500 },
    { name: 'Sat', users: 5500, views: 6800 },
    { name: 'Sun', users: 5000, views: 6200 },
];

const sourceData = [
    { name: 'Organic Search', value: 34, color: '#1e3a8a' },
    { name: 'Direct', value: 25, color: '#3b82f6' },
    { name: 'Social Media', value: 17, color: '#001a3d' },
    { name: 'Referral', value: 13, color: '#2563eb' },
    { name: 'Email', value: 11, color: '#60a5fa' },
];

const pageData = [
    { name: '/home', value: 8500 },
    { name: '/projects', value: 6200 },
    { name: '/about', value: 4100 },
    { name: '/contact', value: 3800 },
    { name: '/resume', value: 5500 },
];

const Analytics = ({ isCollapsed }) => {
    const navigate = useNavigate();
    const [recentPages, setRecentPages] = useState([]);
    const [recentServices, setRecentServices] = useState([]);
    const [seoData, setSeoData] = useState({ slug: '', tag: '', desc: '' });
    const [statusModal, setStatusModal] = useState({ isOpen: false, type: 'success', message: '' });
    
    const { language, t } = useTranslation();

    const handleSeoSave = () => {
        setStatusModal({ isOpen: true, type: 'success', message: t('seoSuccess') });
    };

    const handleFilterClick = () => {
        setStatusModal({ isOpen: true, type: 'info', message: t('filterProcessing') });
    };

    useEffect(() => {
        fetchRecentData();
    }, []);

    const fetchRecentData = async () => {
        // Query bilingual columns
        const { data: pagesData } = await supabase
            .from('pages')
            .select('id, name_en, name_ar, path_en, path_ar, status')
            .order('created_at', { ascending: false })
            .limit(2);
        
        if (pagesData) setRecentPages(pagesData);
        
        const { data: servicesData } = await supabase
            .from('features')
            .select('id, title_en, title_ar, category_en, category_ar')
            .order('created_at', { ascending: false })
            .limit(2);
        
        if (servicesData) setRecentServices(servicesData);
    };

    const getSourceLabel = (name) => {
        const labels = {
            'Organic Search': language === 'ar' ? 'بحث طبيعي' : 'Organic Search',
            'Direct': language === 'ar' ? 'مباشر' : 'Direct',
            'Social Media': language === 'ar' ? 'شبكات اجتماعية' : 'Social Media',
            'Referral': language === 'ar' ? 'إحالة' : 'Referral',
            'Email': language === 'ar' ? 'بريد إلكتروني' : 'Email'
        };
        return labels[name] || name;
    };

    const translateActivity = (text) => {
        if (language !== 'ar') return text;
        const translationsMap = {
            'New visitor from LinkedIn Profile viewed': 'قام زائر جديد من LinkedIn بعرض الملف الشخصي',
            'Contact form submitted john.doe@example.com': 'تم تقديم نموذج الاتصال john.doe@example.com',
            'Project page viewed /projects/web-app': 'تم عرض صفحة المشروع /projects/web-app',
            'Resume downloaded resume.pdf': 'تم تحميل السيرة الذاتية resume.pdf',
            'Portfolio shared Twitter referral': 'تم مشاركة الملف التعريفي عبر إحالة Twitter'
        };
        return translationsMap[text] || text;
    };

    return (
        <div className={`analytics-page ${isCollapsed ? 'is-collapsed' : ''}`}>
            <header className="analytics-header">
                <div className="analytics-header-left">
                    <button className="analytics-back-btn-ui" onClick={() => navigate(-1)}>
                        <ArrowLeft size={20} />
                    </button>
                    <div className="analytics-titles">
                        <h1>{t('analytics')}</h1>
                        <p>{t('manageActivity')}</p>
                    </div>
                </div>
                <button className="analytics-filter-btn" onClick={handleFilterClick}>
                    <Filter size={18} />
                    <span>{t('filter')}</span>
                </button>
            </header>

            <div className="analytics-grid">
                <div className="analytics-chart-card analytics-wide-chart">
                    <div className="analytics-card-header">
                        <TrendingUp size={18} />
                        <h3>{t('trafficDays')}</h3>
                    </div>
                    <div className="analytics-chart-wrapper">
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={trafficData}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2b7fff" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#2b7fff" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                                <Tooltip 
                                    contentStyle={{ background: '#fff', borderRadius: '8px', border: 'none', color: '#000' }}
                                    itemStyle={{ color: '#000' }}
                                />
                                <Area type="monotone" dataKey="views" stroke="#2b7fff" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                                <Area type="monotone" dataKey="users" stroke="#60a5fa" strokeWidth={2} fill="transparent" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="analytics-chart-legend">
                        <span className="analytics-legend-item"><i className="analytics-dot analytics-users"></i> {t('users')}</span>
                        <span className="analytics-legend-item"><i className="analytics-dot analytics-views"></i> {t('views')}</span>
                    </div>
                </div>

                <div className="analytics-chart-card">
                    <div className="analytics-card-header">
                        <Globe size={18} />
                        <h3>{t('trafficSources')}</h3>
                    </div>
                    <div className="analytics-chart-wrapper">
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={sourceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {sourceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="analytics-pie-legend">
                        {sourceData.map(item => (
                            <div key={item.name} className="analytics-pie-analytics-legend-item">
                                <span className="analytics-label">{getSourceLabel(item.name)} {item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="analytics-chart-card analytics-wide-chart">
                    <div className="analytics-card-header">
                        <BarChart2 size={18} />
                        <h3>{t('topPages')}</h3>
                    </div>
                    <div className="analytics-chart-wrapper">
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={pageData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={11} axisLine={false} tickLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                                <Tooltip 
                                    contentStyle={{ background: '#fff', borderRadius: '8px', border: 'none', color: '#000' }}
                                    itemStyle={{ color: '#000' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#2b7fff" strokeWidth={3} fillOpacity={0.1} fill="#2b7fff" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="analytics-activity-card">
                    <div className="analytics-card-header">
                        <Activity size={18} />
                        <h3>{t('recentActivity')}</h3>
                    </div>
                    <div className="analytics-activity-list">
                        <div className="analytics-activity-item">
                            <div className="analytics-icon-box"><User size={14} /></div>
                            <div className="analytics-info">
                                <p>{translateActivity('New visitor from LinkedIn Profile viewed')}</p>
                                <span>{language === 'ar' ? 'منذ دقيقتين' : '2 minutes ago'}</span>
                            </div>
                        </div>
                        <div className="analytics-activity-item">
                            <div className="analytics-icon-box"><MessageSquare size={14} /></div>
                            <div className="analytics-info">
                                <p>{translateActivity('Contact form submitted john.doe@example.com')}</p>
                                <span>{language === 'ar' ? 'منذ ١٥ دقيقة' : '15 minutes ago'}</span>
                            </div>
                        </div>
                        <div className="analytics-activity-item">
                            <div className="analytics-icon-box"><ExternalLink size={14} /></div>
                            <div className="analytics-info">
                                <p>{translateActivity('Project page viewed /projects/web-app')}</p>
                                <span>{language === 'ar' ? 'منذ ٢٣ دقيقة' : '23 minutes ago'}</span>
                            </div>
                        </div>
                        <div className="analytics-activity-item">
                            <div className="analytics-icon-box"><Download size={14} /></div>
                            <div className="analytics-info">
                                <p>{translateActivity('Resume downloaded resume.pdf')}</p>
                                <span>{language === 'ar' ? 'منذ ساعة' : '1 hour ago'}</span>
                            </div>
                        </div>
                        <div className="analytics-activity-item">
                            <div className="analytics-icon-box"><Share2 size={14} /></div>
                            <div className="analytics-info">
                                <p>{translateActivity('Portfolio shared Twitter referral')}</p>
                                <span>{language === 'ar' ? 'منذ ساعتين' : '2 hours ago'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="analytics-stats-row-grid">
                <div className="analytics-stat-mini-card">
                    <div className="analytics-mini-head">
                        <span>{t('bounceRate')}</span>
                        <TrendingUp size={14} className="analytics-rotate-down" />
                    </div>
                    <div className="analytics-val">42.3%</div>
                    <div className="analytics-progress-bar"><div className="analytics-fill" style={{width: '42%'}}></div></div>
                </div>
                <div className="analytics-stat-mini-card">
                    <div className="analytics-mini-head">
                        <span>{t('avgDuration')}</span>
                        <TrendingUp size={14} />
                    </div>
                    <div className="analytics-val">{language === 'ar' ? '٣ دقائق و ٢٤ ثانية' : '3m 24s'}</div>
                    <div className="analytics-progress-bar"><div className="analytics-fill" style={{width: '65%'}}></div></div>
                </div>
                <div className="analytics-stat-mini-card">
                    <div className="analytics-mini-head">
                        <span>{t('pagesSession')}</span>
                        <TrendingUp size={14} />
                    </div>
                    <div className="analytics-val">4.8</div>
                    <div className="analytics-progress-bar"><div className="analytics-fill" style={{width: '80%'}}></div></div>
                </div>
            </div>

            <div className="analytics-dual-lists-grid">
                <div className="analytics-list-card-box">
                    <div className="analytics-box-head">
                        <h3>{t('recentServices')}</h3>
                        <p>{t('recentServicesDesc')}</p>
                    </div>
                    <div className="analytics-list-items">
                        {recentServices.map(service => (
                            <div key={service.id} className="analytics-list-item-row">
                                <Zap size={16} /> <span>{language === 'ar' ? (service.title_ar || service.title_en) : service.title_en}</span>
                            </div>
                        ))}
                        {recentServices.length === 0 && (
                             <div className="analytics-list-item-row">
                                <Zap size={16} /> <span>{t('noServices')}</span>
                            </div>
                        )}
                    </div>
                    <button className="analytics-view-all-link" onClick={() => navigate('/services')}>{t('viewAllServices')} <ChevronRight size={14}/></button>
                </div>

                <div className="analytics-list-card-box">
                    <div className="analytics-box-head">
                        <h3>{t('recentPages')}</h3>
                        <p>{t('recentPagesDesc')}</p>
                    </div>
                    <div className="analytics-list-items">
                        {recentPages.map(page => (
                            <div key={page.id} className="analytics-list-item-row-between">
                                <div className="analytics-left">
                                    <FileText size={16} /> 
                                    <div className="analytics-txt">
                                        <strong>{language === 'ar' ? (page.name_ar || page.name_en) : page.name_en}</strong>
                                        <span>{language === 'ar' ? (page.path_ar || page.path_en) : page.path_en}</span>
                                    </div>
                                </div>
                                <span className="analytics-badge-complete">{page.status || 'Complete'}</span>
                            </div>
                        ))}
                        {recentPages.length === 0 && (
                            <div className="analytics-list-item-row-between">
                                <div className="analytics-left">
                                    <FileText size={16} /> 
                                    <div className="analytics-txt">
                                        <strong>{t('noPages')}</strong>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <button className="analytics-view-all-link" onClick={() => navigate('/manage-pages')}>{t('viewAllPages')} <ChevronRight size={14}/></button>
                </div>
            </div>

            <section className="analytics-seo-form-section">
                <h2 className="analytics-section-title">{t('seo')}</h2>
                <div className="analytics-seo-input-grid">
                    <div className="analytics-field">
                        <label>{t('slugName')}</label>
                        <input type="text" placeholder={t('slugPlaceholder')} value={seoData.slug} onChange={(e) => setSeoData({...seoData, slug: e.target.value})} />
                    </div>
                    <div className="analytics-field">
                        <label>{t('pageTag')}</label>
                        <input type="text" placeholder={t('tagPlaceholder')} value={seoData.tag} onChange={(e) => setSeoData({...seoData, tag: e.target.value})} />
                    </div>
                </div>
                
                <div className="editor-container">
                    <RichTextToolbar />
                    <div className="analytics-field">
                        <label>{t('metaDesc')}</label>
                        <textarea placeholder={t('metaDescPlaceholder')} value={seoData.desc} onChange={(e) => setSeoData({...seoData, desc: e.target.value})}></textarea>
                    </div>
                </div>
                <div className="analytics-seo-actions" style={{marginTop: '20px', display: 'flex', gap: '12px'}}>
                    <button className="analytics-btn-primary" onClick={handleSeoSave}>{t('saveDetails')}</button>
                    <button className="analytics-btn-secondary" onClick={() => setSeoData({ slug: '', tag: '', desc: '' })}>{t('discardChanges')}</button>
                </div>
            </section>

            {statusModal.isOpen && (
                <div className="analytics-modal-overlay">
                    <div className="analytics-modal-card">
                        <div className={`analytics-modal-icon ${statusModal.type}`}>
                            {statusModal.type === 'success' ? <CheckCircle size={32} /> : <AlertCircle size={32} />}
                        </div>
                        <h2>{statusModal.type === 'success' ? t('success') : t('processing')}</h2>
                        <p>{statusModal.message}</p>
                        <button className="analytics-modal-btn" onClick={() => setStatusModal({ ...statusModal, isOpen: false })}>
                            {statusModal.type === 'success' ? t('great') : t('understand')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Analytics;