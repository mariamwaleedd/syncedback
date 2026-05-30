import React, { useState } from 'react';
import { 
    Search, BookOpen, Zap, BarChart3, Mail, 
    Layers, Settings, ChevronRight, HelpCircle,
    MessageCircle, PlayCircle, FileText, ChevronDown
} from 'lucide-react';
import { useDialog } from '../common/DialogContext';
import { useTranslation } from '../common/LanguageContext';
import './HelpPage.css';

const Highlight = ({ text, query }) => {
    if (!query || !query.trim()) return <span>{text}</span>;
    try {
        const escapedQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedQuery})`, 'gi');
        const parts = String(text).split(regex);
        return (
            <span>
                {parts.map((part, i) => 
                    part.toLowerCase() === query.trim().toLowerCase() 
                        ? <mark key={i} className="search-highlight">{part}</mark> 
                        : part
                )}
            </span>
        );
    } catch (e) {
        return <span>{text}</span>;
    }
};

const HelpPage = ({ isCollapsed }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFaq, setActiveFaq] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
    const [supportSubject, setSupportSubject] = useState('');
    const [supportMessage, setSupportMessage] = useState('');
    const { alert } = useDialog();
    const { language, t } = useTranslation();

    const handleSupportSubmit = (e) => {
        e.preventDefault();
        setIsSupportModalOpen(false);
        setSupportSubject('');
        setSupportMessage('');
        alert(t('msgSuccess') + ' ' + t('msgSubtext'), t('success'));
    };

    const categories = [
        { 
            icon: <Zap size={24} />, 
            title: 'Features', 
            desc: 'Managing application features and toggles',
            explanation: 'System for managing core application modules, enabling/disabling functionalities, and setting user permissions across the platform.'
        },
        { 
            icon: <Layers size={24} />, 
            title: 'Pages', 
            desc: 'Creating and configuring SEO-friendly pages',
            explanation: 'Dynamic page creation tool for SEO optimization, allowing you to define URL paths, manage content, and control how pages appear in search results.'
        },
        { 
            icon: <BarChart3 size={24} />, 
            title: 'Analytics', 
            desc: 'Understanding traffic and user behavior',
            explanation: 'Real-time traffic monitoring and behavioral analysis dashboard to track user engagement, popular content, and session metrics.'
        },
        { 
            icon: <Mail size={24} />, 
            title: 'Messaging', 
            desc: 'Inbox management and email campaigns',
            explanation: 'Centralized communication hub for managing incoming user queries, automating email campaigns, and maintaining direct support channels.'
        },
        { 
            icon: <Settings size={24} />, 
            title: 'System', 
            desc: 'Platform settings and profile management',
            explanation: 'Core platform configuration area for managing security protocols, user profiles, administrative roles, and global application settings.'
        },
        { 
            icon: <BookOpen size={24} />, 
            title: 'Guides', 
            desc: 'Step-by-step video tutorials',
            explanation: 'Comprehensive library of walkthroughs and video tutorials designed to help you master every aspect of the Synced platform efficiently.'
        }
    ];

    const faqs = [
        {
            q: "How do I add a new feature to the platform?",
            a: "Navigate to the Home or Feature Management page and click '+ New Feature'. Fill in the English and Arabic details, set the initial status, and click 'Create'. You can preview the feature card live as you type."
        },
        {
            q: "What are SEO Meta Tags and why are they optional?",
            a: "Meta Tags help search engines understand your page content. While optional, filling out the SEO section in the Page Creator (Property and Content Value) improves your application's visibility on Google and social media shares."
        },
        {
            q: "How can I track specific page views?",
            a: "Go to the Analytics section. Under 'Top Pages', you will see a bar chart representing the most visited paths. Detailed timestamps are available in the 'Recent Activity' log on the same page."
        },
        {
            q: "Can I undo a message deletion?",
            a: "Currently, messages moved to the 'Archive' can be recovered. However, messages permanently deleted via the 'Delete' button in the Message Detail view cannot be restored."
        }
    ];

    const steps = [
        {
            num: '01',
            title: 'Configure Features',
            desc: 'Start by defining the core modules of your app in the Features section. Set permissions for users or admins.'
        },
        {
            num: '02',
            title: 'Build Pages',
            desc: 'Use the Page Builder to create static content. Define URL paths and link them to your navigation menu.'
        },
        {
            num: '03',
            title: 'Analyze Traffic',
            desc: 'Monitor the Analytics dashboard daily to see which sections of your app perform best with real-time data.'
        }
    ];

    const translateCategory = (cat) => {
        const keys = {
            'Features': {
                title: language === 'ar' ? 'الميزات' : 'Features',
                desc: language === 'ar' ? 'إدارة ميزات وتنبيهات التطبيق' : 'Managing application features and toggles',
                exp: language === 'ar' ? 'نظام لإدارة وحدات التطبيق الأساسية وتفعيل أو تعطيل الوظائف وتعيين صلاحيات المستخدمين.' : 'System for managing core application modules, enabling/disabling functionalities, and setting user permissions across the platform.'
            },
            'Pages': {
                title: language === 'ar' ? 'الصفحات' : 'Pages',
                desc: language === 'ar' ? 'إنشاء وتكوين صفحات متوافقة مع الـ SEO' : 'Creating and configuring SEO-friendly pages',
                exp: language === 'ar' ? 'أداة إنشاء الصفحات الديناميكية للتحسين في محركات البحث، وتحديد مسارات الروابط وإدارتها.' : 'Dynamic page creation tool for SEO optimization, allowing you to define URL paths, manage content, and control how pages appear in search results.'
            },
            'Analytics': {
                title: language === 'ar' ? 'التحليلات' : 'Analytics',
                desc: language === 'ar' ? 'فهم حركة المرور وسلوك المستخدمين' : 'Understanding traffic and user behavior',
                exp: language === 'ar' ? 'لوحة مراقبة حركة المرور في الوقت الفعلي لتحليل تفاعل المستخدمين والصفحات الشائعة.' : 'Real-time traffic monitoring and behavioral analysis dashboard to track user engagement, popular content, and session metrics.'
            },
            'Messaging': {
                title: language === 'ar' ? 'الرسائل' : 'Messaging',
                desc: language === 'ar' ? 'إدارة البريد الوارد وحملات البريد الإلكتروني' : 'Inbox management and email campaigns',
                exp: language === 'ar' ? 'مركز اتصالات مركزي لإدارة استفسارات المستخدمين والحفاظ على قنوات الدعم المباشرة.' : 'Centralized communication hub for managing incoming user queries, automating email campaigns, and maintaining direct support channels.'
            },
            'System': {
                title: language === 'ar' ? 'النظام' : 'System',
                desc: language === 'ar' ? 'إعدادات المنصة وإدارة الملفات الشخصية' : 'Platform settings and profile management',
                exp: language === 'ar' ? 'منطقة إعدادات النظام لتكوين الأمان والملفات الشخصية والأدوار الإدارية.' : 'Core platform configuration area for managing security protocols, user profiles, administrative roles, and global application settings.'
            },
            'Guides': {
                title: language === 'ar' ? 'التعليمات' : 'Guides',
                desc: language === 'ar' ? 'برامج تعليمية بالفيديو خطوة بخطوة' : 'Step-by-step video tutorials',
                exp: language === 'ar' ? 'مكتبة شاملة من شروحات الفيديو والدروس لمساعدتك على إتقان المنصة بكفاءة.' : 'Comprehensive library of walkthroughs and video tutorials designed to help you master every aspect of the Synced platform efficiently.'
            }
        };
        return keys[cat.title] || { title: cat.title, desc: cat.desc, exp: cat.explanation };
    };

    const translateFaq = (faq, idx) => {
        if (language !== 'ar') return faq;
        const arFaqs = [
            {
                q: "كيف يمكنني إضافة ميزة جديدة للمنصة؟",
                a: "انتقل إلى لوحة التحكم أو صفحة إدارة الميزات وانقر على '+ ميزة جديدة'. املأ التفاصيل باللغتين الإنجليزية والعربية، وحدد الحالة الأولية، ثم انقر فوق 'إنشاء'. يمكنك معاينة بطاقة الميزة مباشرة أثناء الكتابة."
            },
            {
                q: "ما هي علامات ووسوم SEO الميتا ولماذا هي اختيارية؟",
                a: "تساعد علامات الميتا محركات البحث على فهم محتوى صفحتك. على الرغم من أنها اختيارية، إلا أن ملء قسم SEO في منشئ الصفحات يحسن من ظهور تطبيقك على Google ومشاركته على وسائل التواصل الاجتماعي."
            },
            {
                q: "كيف يمكنني تتبع زيارات صفحات معينة؟",
                a: "انتقل إلى قسم التحليلات. ضمن 'الصفحات الأكثر زيارة'، سترى مخططاً شريطياً يمثل المسارات الأكثر زيارة. تتوفر طوابع زمنية مفصلة في سجل 'النشاط الأخير' في نفس الصفحة."
            },
            {
                q: "هل يمكنني التراجع عن حذف الرسالة؟",
                a: "عملياً، يمكن استرداد الرسائل التي تم نقلها إلى 'الأرشيف'. ومع ذلك، لا يمكن استعادة الرسائل المحذوفة نهائياً عبر زر 'حذف' في عرض تفاصيل الرسالة."
            }
        ];
        return arFaqs[idx] || faq;
    };

    const translateStep = (step, idx) => {
        if (language !== 'ar') return step;
        const arSteps = [
            {
                num: '01',
                title: 'تهيئة الميزات',
                desc: 'ابدأ بتحديد الوحدات الأساسية لتطبيقك في قسم الميزات. قم بتعيين أذونات للمستخدمين أو المسؤولين.'
            },
            {
                num: '02',
                title: 'بناء الصفحات',
                desc: 'استخدم منشئ الصفحات لإنشاء محتوى ثابت. حدد مسارات الروابط واربطها بقائمة التنقل الخاصة بك.'
            },
            {
                num: '03',
                title: 'تحليل حركة المرور',
                desc: 'راقب لوحة معلومات التحليلات يومياً لمعرفة الأقسام التي تؤدي بشكل أفضل في تطبيقك ببيانات الوقت الفعلي.'
            }
        ];
        return arSteps[idx] || step;
    };

    const filteredCategories = categories.map(translateCategory).filter(cat => {
        const query = searchQuery.toLowerCase().trim();
        return (cat.title || "").toLowerCase().includes(query) || 
               (cat.desc || "").toLowerCase().includes(query) ||
               (cat.exp || "").toLowerCase().includes(query);
    });

    const filteredFaqs = faqs.map(translateFaq).filter(faq => {
        const query = searchQuery.toLowerCase().trim();
        return (faq.q || "").toLowerCase().includes(query) || 
               (faq.a || "").toLowerCase().includes(query);
    });

    const filteredSteps = steps.map(translateStep).filter(step => {
        const query = searchQuery.toLowerCase().trim();
        return (step.title || "").toLowerCase().includes(query) || 
               (step.desc || "").toLowerCase().includes(query);
    });

    const hasResults = searchQuery.trim() === '' || (filteredCategories.length > 0 || filteredFaqs.length > 0 || filteredSteps.length > 0);

    return (
        <div className={`helppage-help-center-page ${isCollapsed ? 'is-collapsed' : ''}`}>
            <header className="helppage-help-hero">
                <div className="helppage-helppage-help-hero-content">
                    <h1>{t('helpCenter')}</h1>
                    <p>{language === 'ar' ? 'ابحث في قاعدة المعرفة الخاصة بنا أو تصفح الفئات أدناه' : 'Search our knowledge base or browse categories below'}</p>
                    <div className="helppage-help-search-wrapper">
                        <Search className="helppage-search-icon" size={20} />
                        <input 
                            id="help-center-search"
                            name="help-search"
                            type="text" 
                            placeholder={t('helpPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => { if(e.key === 'Enter') e.target.blur(); }}
                            autoFocus
                        />
                        <button className="helppage-search-submit-btn">
                            {language === 'ar' ? 'بحث' : 'Search'}
                        </button>
                    </div>
                </div>
            </header>

            <div className="helppage-help-content-body">
                {hasResults ? (
                    <>
                        {filteredCategories.length > 0 && (
                            <div className="helppage-category-grid">
                                {filteredCategories.map((cat, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`helppage-category-card ${selectedCategory?.title === cat.title ? 'is-active' : ''}`}
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        <div className="helppage-cat-icon-box">{cat.icon}</div>
                                        <h3><Highlight text={cat.title} query={searchQuery} /></h3>
                                        <p><Highlight text={cat.desc} query={searchQuery} /></p>
                                        <button className="helppage-cat-link-btn">
                                            {language === 'ar' ? 'استكشاف' : 'Explore'} <ChevronRight size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {selectedCategory && (
                            <div className="helppage-modal-overlay" onClick={() => setSelectedCategory(null)}>
                                <div className="helppage-modal-content" onClick={e => e.stopPropagation()}>
                                    <button className="helppage-modal-close" onClick={() => setSelectedCategory(null)}>&times;</button>
                                    <div className="helppage-modal-header">
                                        <div className="helppage-modal-icon-box">{selectedCategory.icon}</div>
                                        <h2>{selectedCategory.title} {language === 'ar' ? 'نظرة عامة' : 'Overview'}</h2>
                                    </div>
                                    <div className="helppage-modal-body">
                                        <p>{selectedCategory.exp}</p>
                                    </div>
                                    <div className="helppage-modal-footer">
                                        <button className="helppage-modal-btn" onClick={() => setSelectedCategory(null)}>{language === 'ar' ? 'فهمت' : 'Got it'}</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {filteredSteps.length > 0 && (
                            <section className="helppage-instructions-section">
                                <div className="helppage-section-header">
                                    <h2>{language === 'ar' ? 'دليل البدء السريع' : 'Quick Start Guide'}</h2>
                                    <span className="helppage-badge">{language === 'ar' ? 'محدث' : 'Updated'}</span>
                                </div>
                                
                                <div className="helppage-guide-steps-grid">
                                    {filteredSteps.map((step, idx) => (
                                        <div className="step-item" key={idx}>
                                            <div className="helppage-step-num">{step.num}</div>
                                            <div className="helppage-step-info">
                                                <h4><Highlight text={step.title} query={searchQuery} /></h4>
                                                <p><Highlight text={step.desc} query={searchQuery} /></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <div className="helppage-help-dual-row">
                            {filteredFaqs.length > 0 && (
                                <section className="helppage-faq-section">
                                    <h2>{t('faqTitle')}</h2>
                                    <div className="helppage-faq-list">
                                        {filteredFaqs.map((faq, idx) => (
                                            <div 
                                                key={idx} 
                                                className={`helppage-faq-item ${activeFaq === idx ? 'open' : ''}`}
                                                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                            >
                                                <div className="helppage-faq-question">
                                                    <span><Highlight text={faq.q} query={searchQuery} /></span>
                                                    <ChevronDown size={18} className="helppage-arrow" />
                                                </div>
                                                {activeFaq === idx && <div className="helppage-faq-answer"><Highlight text={faq.a} query={searchQuery} /></div>}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            <aside className="helppage-support-sidebar">
                                <div className="helppage-support-card-blue">
                                    <HelpCircle size={32} />
                                    <h3>{language === 'ar' ? 'هل ما زلت بحاجة للمساعدة؟' : 'Still need help?'}</h3>
                                    <p>{language === 'ar' ? 'فريق الدعم لدينا متاح على مدار الساعة طوال أيام الأسبوع لمساعدتك.' : 'Our support team is available 24/7 to help you with technical issues.'}</p>
                                    <button className="helppage-contact-btn" onClick={() => setIsSupportModalOpen(true)}>{t('contactSupport')}</button>
                                </div>

                                <div className="helppage-resource-list">
                                    <h3>{language === 'ar' ? 'وثائق المنصة' : 'Documentation'}</h3>
                                    <div className="helppage-res-item">
                                        <PlayCircle size={18} />
                                        <span>{language === 'ar' ? 'شروحات الفيديو' : 'Video Tutorials'}</span>
                                    </div>
                                    <div className="helppage-res-item">
                                        <FileText size={18} />
                                        <span>{language === 'ar' ? 'مراجع الـ API' : 'API References'}</span>
                                    </div>
                                    <div className="helppage-res-item">
                                        <MessageCircle size={18} />
                                        <span>{language === 'ar' ? 'منتدى المجتمع' : 'Community Forum'}</span>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </>
                ) : (
                    <div className="helppage-no-results">
                        <div className="helppage-no-results-icon">
                            <Search size={64} />
                        </div>
                        <h2>{language === 'ar' ? 'لم يتم العثور على نتائج' : 'No results found'}</h2>
                        <p>{language === 'ar' ? 'لم نتمكن من العثور على أي مقالات تطابق' : "We couldn't find any articles matching"} "<strong>{searchQuery}</strong>".</p>
                        <button className="helppage-clear-search-btn" onClick={() => setSearchQuery('')}>
                            {language === 'ar' ? 'مسح البحث' : 'Clear search'}
                        </button>
                    </div>
                )}

            {isSupportModalOpen && (
                <div className="helppage-modal-overlay" onClick={() => setIsSupportModalOpen(false)}>
                    <div className="helppage-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="helppage-modal-close" onClick={() => setIsSupportModalOpen(false)}>&times;</button>
                        <div className="helppage-modal-header">
                            <div className="helppage-modal-icon-box">
                                <MessageCircle size={28} />
                            </div>
                            <h2>{t('contactSupport')}</h2>
                        </div>
                        <form onSubmit={handleSupportSubmit}>
                            <div className="helppage-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: language === 'ar' ? 'right' : 'left' }}>
                                <p style={{ margin: '0 0 10px 0', fontSize: '0.95rem', color: 'var(--text-muted)' }}>{language === 'ar' ? 'أرسل لنا رسالة وسنقوم بالرد عليك في أقرب وقت ممكن.' : "Send us a message and we'll get back to you as soon as possible."}</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>{t('subject')}</label>
                                    <input 
                                        type="text" 
                                        placeholder={language === 'ar' ? 'ما الذي تحتاج إلى مساعدة فيه؟' : 'What do you need help with?'}
                                        value={supportSubject}
                                        onChange={e => setSupportSubject(e.target.value)}
                                        required
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            border: '1px solid var(--border-light)',
                                            borderRadius: '12px',
                                            padding: '12px',
                                            color: '#fff',
                                            outline: 'none',
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>{t('message')}</label>
                                    <textarea 
                                        placeholder={language === 'ar' ? 'صِف مشكلتك بالتفصيل...' : 'Describe your issue in detail...'}
                                        value={supportMessage}
                                        onChange={e => setSupportMessage(e.target.value)}
                                        required
                                        rows={4}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            border: '1px solid var(--border-light)',
                                            borderRadius: '12px',
                                            padding: '12px',
                                            color: '#fff',
                                            outline: 'none',
                                            resize: 'none',
                                            fontFamily: 'var(--font-body)'
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="helppage-modal-footer" style={{ marginTop: '20px' }}>
                                <button type="submit" className="helppage-modal-btn">{t('sendMessage')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

export default HelpPage;