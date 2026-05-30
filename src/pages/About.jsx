import React from 'react';
import { 
    Mail, 
    ExternalLink, 
    Users, 
    Award, 
    Briefcase, 
    Globe, 
    ShieldCheck, 
    Heart, 
    Sparkles, 
    Share2, 
    UserRound,
    CheckCircle,
    AlertCircle,
    Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../common/LanguageContext';
import './About.css';

const localTranslations = {
    en: {
        platformName: "HealthHub Platform",
        subtitle: "Next-Generation Healthcare Management System",
        activeUsers: "Active Users",
        hospitals: "Hospitals",
        uptime: "Uptime",
        followUpdates: "Follow Updates",
        ourVision: "Our Vision",
        visionText: "To democratize healthcare access through intuitive technology, making professional medical management available to everyone, everywhere.",
        ourMission: "Our Mission",
        missionText: "Building secure, fast, and reliable digital tools for medical professionals and patients to collaborate effectively in a modern environment.",
        countries: "Countries",
        awards: "Awards",
        years: "Years",
        support: "Support",
        meetTeam: "Meet the Team",
        meetTeamDesc: "The talented individuals driving the healthcare revolution.",
        viewProfile: "View Profile",
        joinTitle: "Want to join our journey?",
        joinDesc: "We're always looking for talented developers and medical experts to join our team.",
        viewCareers: "View Careers",
        contactUs: "Contact Us",
        confirmed: "Confirmed",
        systemAction: "System Action",
        excellent: "Excellent",
        okay: "Okay",
        followMsg: "You are now following HealthHub updates!",
        shareMsg: "Sharing profile...",
        openWebMsg: "Opening website...",
        careersMsg: "Opening careers portal...",
        founderRole: "Founder & CEO",
        founderBio: "Visionary behind HealthHub with over 10 years of experience in healthcare technology.",
        designerRole: "Product Designer",
        designerBio: "Creating seamless user experiences that prioritize patient well-being and accessibility.",
        developerRole: "Lead Developer",
        developerBio: "Full-stack expert focusing on high-performance architecture and secure data management.",
        advisorRole: "Medical Advisor",
        advisorBio: "Board-certified physician ensuring all digital health features meet clinical standards."
    },
    ar: {
        platformName: "منصة هيلث هوب",
        subtitle: "نظام إدارة الرعاية الصحية من الجيل القادم",
        activeUsers: "مستخدم نشط",
        hospitals: "مستشفى",
        uptime: "وقت التشغيل",
        followUpdates: "متابعة التحديثات",
        ourVision: "رؤيتنا",
        visionText: "تسهيل الوصول إلى الرعاية الصحية للجميع من خلال تكنولوجيا سهلة الاستخدام، وجعل الإدارة الطبية الاحترافية متاحة للجميع في كل مكان.",
        ourMission: "مهمتنا",
        missionText: "بناء أدوات رقمية آمنة وسريعة وموثوقة للمهنيين الطبيين والمرضى للتعاون بفعالية في بيئة حديثة.",
        countries: "دول",
        awards: "جوائز",
        years: "سنوات",
        support: "دعم 24/7",
        meetTeam: "تعرف على الفريق",
        meetTeamDesc: "الأفراد الموهوبون الذين يقودون ثورة الرعاية الصحية.",
        viewProfile: "عرض الملف الشخصي",
        joinTitle: "هل تريد الانضمام إلى رحلتنا؟",
        joinDesc: "نحن نبحث دائماً عن مطورين موهوبين وخبراء طبيين للانضمام إلى فريقنا.",
        viewCareers: "عرض الوظائف",
        contactUs: "اتصل بنا",
        confirmed: "تم التأكيد",
        systemAction: "إجراء النظام",
        excellent: "ممتاز",
        okay: "موافق",
        followMsg: "أنت الآن تتابع تحديثات هيلث هوب!",
        shareMsg: "جاري مشاركة الملف الشخصي...",
        openWebMsg: "جاري فتح الموقع الإلكتروني...",
        careersMsg: "جاري فتح بوابة الوظائف...",
        founderRole: "المؤسس والرئيس التنفيذي",
        founderBio: "المبتكر وراء هيلث هوب مع أكثر من 10 سنوات من الخبرة في تكنولوجيا الرعاية الصحية.",
        designerRole: "مصمم المنتجات",
        designerBio: "ابتكار تجارب مستخدم سلسة تعطي الأولوية لسلامة المرضى وسهولة الوصول.",
        developerRole: "مطور رئيسي",
        developerBio: "خبير في التطوير الشامل يركز على البنية البرمجية عالية الأداء وإدارة البيانات الآمنة.",
        advisorRole: "مستشار طبي",
        advisorBio: "طبيب معتمد يضمن تلبية جميع الميزات الصحية الرقمية للمعايير السريرية."
    }
};

const AboutPage = ({ isCollapsed }) => {
    const navigate = useNavigate();
    const { language, t } = useTranslation();
    const [statusModal, setStatusModal] = React.useState({ isOpen: false, type: 'success', message: '' });

    const lt = (key) => {
        const dict = localTranslations[language] || localTranslations['en'];
        return dict[key] || key;
    };

    const handleAction = (message, type = 'success') => {
        setStatusModal({ isOpen: true, type, message });
    };

    const teamMembers = [
        {
            id: 1,
            name: language === 'ar' ? 'المستخدم المسؤول' : 'Admin User',
            role: lt('founderRole'),
            image: 'https://ui-avatars.com/api/?name=Admin+User&background=2b7fff&color=fff&size=128',
            bio: lt('founderBio'),
        },
        {
            id: 2,
            name: language === 'ar' ? 'سارة جونسون' : 'Sarah Johnson',
            role: lt('designerRole'),
            image: 'https://ui-avatars.com/api/?name=Sarah+J&background=d946ef&color=fff&size=128',
            bio: lt('designerBio'),
        },
        {
            id: 3,
            name: language === 'ar' ? 'مايكل تشين' : 'Michael Chen',
            role: lt('developerRole'),
            image: 'https://ui-avatars.com/api/?name=Michael+C&background=10b981&color=fff&size=128',
            bio: lt('developerBio'),
        },
        {
            id: 4,
            name: language === 'ar' ? 'إيما رودريغيز' : 'Emma Rodriguez',
            role: lt('advisorRole'),
            image: 'https://ui-avatars.com/api/?name=Emma+R&background=f97316&color=fff&size=128',
            bio: lt('advisorBio'),
        }
    ];

    return (
        <div className={`about-page-container ${isCollapsed ? 'is-collapsed' : ''}`}>
            <header className="about-hero">
                <div className="profile-mini-card">
                    <div className="profile-main">
                        <div className="profile-img-wrap">
                            <img src="https://ui-avatars.com/api/?name=Health+Hub&background=2b7fff&color=fff&size=200" alt="Platform" />
                            <div className="verified-badge"><ShieldCheck size={20} /></div>
                        </div>
                        <div className="profile-details">
                            <div className="name-row">
                                <h1>{lt('platformName')}</h1>
                                <span className="platform-tag">v2.4.0 Official</span>
                            </div>
                            <p className="subtitle">{lt('subtitle')}</p>
                            <div className="profile-stats-row">
                                <div className="stat"><strong>50k+</strong> <span>{lt('activeUsers')}</span></div>
                                <div className="stat"><strong>120+</strong> <span>{lt('hospitals')}</span></div>
                                <div className="stat"><strong>99.9%</strong> <span>{lt('uptime')}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-actions">
                        <button className="btn-follow" onClick={() => handleAction(lt('followMsg'), 'success')}>{lt('followUpdates')}</button>
                        <button className="btn-msg" onClick={() => navigate('/messages')}><Mail size={18} /></button>
                    </div>
                </div>
            </header>

            <div className="about-content-wrapper">
                <section className="vision-mission-grid">
                    <div className="vision-card">
                        <div className="icon-box-circle purple"><Sparkles size={24} /></div>
                        <h2>{lt('ourVision')}</h2>
                        <p>{lt('visionText')}</p>
                    </div>
                    <div className="vision-card">
                        <div className="icon-box-circle blue"><Heart size={24} /></div>
                        <h2>{lt('ourMission')}</h2>
                        <p>{lt('missionText')}</p>
                    </div>
                </section>

                <section className="about-stats-grid">
                    <div className="metric-box">
                        <Users size={20} />
                        <div className="m-info"><h3>12</h3><p>{lt('countries')}</p></div>
                    </div>
                    <div className="metric-box">
                        <Award size={20} />
                        <div className="m-info"><h3>25</h3><p>{lt('awards')}</p></div>
                    </div>
                    <div className="metric-box">
                        <Briefcase size={20} />
                        <div className="m-info"><h3>8</h3><p>{lt('years')}</p></div>
                    </div>
                    <div className="metric-box">
                        <Globe size={20} />
                        <div className="m-info"><h3>24/7</h3><p>{lt('support')}</p></div>
                    </div>
                </section>

                <section className="team-section">
                    <div className="team-header">
                        <h2>{lt('meetTeam')}</h2>
                        <p>{lt('meetTeamDesc')}</p>
                    </div>
                    <div className="team-grid">
                        {teamMembers.map(member => (
                            <div key={member.id} className="member-card">
                                <div className="member-top">
                                    <img src={member.image} alt={member.name} />
                                    <div className="member-socials">
                                        <button className="s-btn" onClick={() => handleAction(lt('shareMsg')) }><Share2 size={14} /></button>
                                        <button className="s-btn" onClick={() => handleAction(lt('openWebMsg')) }><Globe size={14} /></button>
                                        <button className="s-btn" onClick={() => navigate('/profile')}><UserRound size={14} /></button>
                                    </div>
                                </div>
                                <div className="member-info">
                                    <h3>{member.name}</h3>
                                    <span className="role">{member.role}</span>
                                    <p>{member.bio}</p>
                                    <button className="view-profile-btn" onClick={() => navigate('/profile')}>
                                        {lt('viewProfile')} <ExternalLink size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="about-footer-cta">
                    <div className="cta-content">
                        <h2>{lt('joinTitle')}</h2>
                        <p>{lt('joinDesc')}</p>
                        <div className="cta-btns">
                            <button className="primary-cta" onClick={() => handleAction(lt('careersMsg'), 'info')}>{lt('viewCareers')}</button>
                            <button className="secondary-cta" onClick={() => navigate('/messages')}>{lt('contactUs')}</button>
                        </div>
                    </div>
                </footer>
            </div>

            {statusModal.isOpen && (
                <div className="about-modal-overlay">
                    <div className="about-modal-card">
                        <div className={`about-modal-icon ${statusModal.type}`}>
                            {statusModal.type === 'success' ? <CheckCircle size={32} /> : 
                             statusModal.type === 'info' ? <Zap size={32} /> : <AlertCircle size={32} />}
                        </div>
                        <h2>{statusModal.type === 'success' ? lt('confirmed') : lt('systemAction')}</h2>
                        <p>{statusModal.message}</p>
                        <button className="about-modal-btn" onClick={() => setStatusModal({ ...statusModal, isOpen: false })}>
                            {statusModal.type === 'success' ? lt('excellent') : lt('okay')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AboutPage;