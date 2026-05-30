import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, Plus, Trash2, Edit2,
    Check, AlertCircle, Info,
    Search, Globe, ExternalLink,
    Monitor, Smartphone, Tablet
} from 'lucide-react';
import { useTranslation } from '../common/LanguageContext';
import './UIElements.css';

const localTranslations = {
  en: {
    title: "UI Elements",
    desc: "Reusable components and design system patterns",
    buttons: "Buttons",
    primary: "Primary",
    secondary: "Secondary",
    outline: "Outline",
    danger: "Danger",
    glassButton: "Glass Button",
    textLink: "Text Link",
    badgesStatus: "Badges & Status",
    active: "Active",
    pending: "Pending",
    rejected: "Rejected",
    processing: "Processing",
    draft: "Draft",
    online: "Online",
    offline: "Offline",
    busy: "Busy",
    formControls: "Form Controls",
    standardInput: "Standard Input",
    enterText: "Enter text...",
    inputIcon: "Input with Icon",
    searchResources: "Search resources...",
    selectMenu: "Select Menu",
    optionOne: "Option One",
    optionTwo: "Option Two",
    optionThree: "Option Three",
    togglesCheckboxes: "Toggles & Checkboxes",
    pushNotifications: "Push Notifications",
    maintenanceMode: "Maintenance Mode",
    acceptTerms: "Accept Terms",
    newsletter: "Newsletter",
    progressIndicators: "Progress Indicators",
    systemStorage: "System Storage",
    uploadStatus: "Upload Status",
    cpuUsage: "CPU Usage",
    alertsToasts: "Alerts & Toasts",
    successAlert: "Changes saved successfully!",
    infoAlert: "New system update available.",
    dangerAlert: "Error: Invalid credentials provided.",
    avatarsIcons: "Avatars & Icons"
  },
  ar: {
    title: "عناصر واجهة المستخدم",
    desc: "مكونات قابلة لإعادة الاستخدام ونماذج نظام التصميم",
    buttons: "الأزرار",
    primary: "أساسي",
    secondary: "ثانوي",
    outline: "إطار خارجي",
    danger: "خطر",
    glassButton: "زر زجاجي",
    textLink: "رابط نصي",
    badgesStatus: "الشارات والحالة",
    active: "نشط",
    pending: "معلق",
    rejected: "مرفوض",
    processing: "جاري المعالجة",
    draft: "مسودة",
    online: "متصل",
    offline: "غير متصل",
    busy: "مشغول",
    formControls: "عناصر التحكم في النموذج",
    standardInput: "حقل إدخال قياسي",
    enterText: "أدخل النص...",
    inputIcon: "إدخال مع أيقونة",
    searchResources: "البحث في الموارد...",
    selectMenu: "قائمة الاختيار",
    optionOne: "الخيار الأول",
    optionTwo: "الخيار الثاني",
    optionThree: "الخيار الثالث",
    togglesCheckboxes: "المفاتيح وصناديق الاختيار",
    pushNotifications: "إشعارات الدفع",
    maintenanceMode: "وضع الصيانة",
    acceptTerms: "الموافقة على الشروط",
    newsletter: "النشرة الإخبارية",
    progressIndicators: "مؤشرات التقدم",
    systemStorage: "سعة تخزين النظام",
    uploadStatus: "حالة الرفع",
    cpuUsage: "استخدام المعالج (CPU)",
    alertsToasts: "التنبيهات والرسائل المنبثقة",
    successAlert: "تم حفظ التغييرات بنجاح!",
    infoAlert: "تحديث جديد للنظام متاح الآن.",
    dangerAlert: "خطأ: بيانات الاعتماد المدخلة غير صالحة.",
    avatarsIcons: "الصور الرمزية والأيقونات"
  }
};

const UIElements = ({ isCollapsed }) => {
    const navigate = useNavigate();
    const [toggleStates, setToggleStates] = useState({
        switch1: true,
        switch2: false,
        check1: true,
        check2: false
    });
    const { language } = useTranslation();

    const tLocal = (key) => {
        return localTranslations[language]?.[key] || localTranslations['en'][key] || key;
    };

    const toggle = (key) => {
        setToggleStates(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className={`ui-elements-page ${isCollapsed ? 'is-collapsed' : ''}`}>
            <header className="ui-header">
                <div className="header-left">
                    <button className="back-circle-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={20} />
                    </button>
                    <div className="titles">
                        <h1>{tLocal('title')}</h1>
                        <p>{tLocal('desc')}</p>
                    </div>
                </div>
            </header>

            <div className="ui-grid">
                <section className="ui-card-group">
                    <h2 className="group-title">{tLocal('buttons')}</h2>
                    <div className="elements-stack horizontal">
                        <button className="btn-solid-primary"><Plus size={18} /> {tLocal('primary')}</button>
                        <button className="btn-solid-secondary">{tLocal('secondary')}</button>
                        <button className="btn-outline">{tLocal('outline')}</button>
                        <button className="btn-danger"><Trash2 size={18} /> {tLocal('danger')}</button>
                        <button className="btn-icon-square"><Edit2 size={18} /></button>
                    </div>
                    <div className="elements-stack horizontal mt-20">
                        <button className="btn-glass">{tLocal('glassButton')}</button>
                        <button className="btn-link">{tLocal('textLink')} <ExternalLink size={14} /></button>
                    </div>
                </section>

                <section className="ui-card-group">
                    <h2 className="group-title">{tLocal('badgesStatus')}</h2>
                    <div className="elements-stack horizontal">
                        <span className="badge-ui success">{tLocal('active')}</span>
                        <span className="badge-ui warning">{tLocal('pending')}</span>
                        <span className="badge-ui danger">{tLocal('rejected')}</span>
                        <span className="badge-ui info">{tLocal('processing')}</span>
                        <span className="badge-ui default">{tLocal('draft')}</span>
                    </div>
                    <div className="elements-stack horizontal mt-20">
                        <div className="status-indicator active"><span className="dot"></span> {tLocal('online')}</div>
                        <div className="status-indicator inactive"><span className="dot"></span> {tLocal('offline')}</div>
                        <div className="status-indicator busy"><span className="dot"></span> {tLocal('busy')}</div>
                    </div>
                </section>

                <section className="ui-card-group">
                    <h2 className="group-title">{tLocal('formControls')}</h2>
                    <div className="elements-stack">
                        <div className="input-wrap-ui">
                            <label>{tLocal('standardInput')}</label>
                            <input type="text" placeholder={tLocal('enterText')} />
                        </div>
                        <div className="input-wrap-ui">
                            <label>{tLocal('inputIcon')}</label>
                            <div className="icon-field">
                                <Search size={18} />
                                <input type="text" placeholder={tLocal('searchResources')} />
                            </div>
                        </div>
                        <div className="input-wrap-ui">
                            <label>{tLocal('selectMenu')}</label>
                            <select className="select-ui">
                                <option>{tLocal('optionOne')}</option>
                                <option>{tLocal('optionTwo')}</option>
                                <option>{tLocal('optionThree')}</option>
                            </select>
                        </div>
                    </div>
                </section>

                <section className="ui-card-group">
                    <h2 className="group-title">{tLocal('togglesCheckboxes')}</h2>
                    <div className="elements-stack horizontal space-between align-center mb-20">
                        <span>{tLocal('pushNotifications')}</span>
                        <div 
                            className={`ui-switch ${toggleStates.switch1 ? 'active' : ''}`}
                            onClick={() => toggle('switch1')}
                        >
                            <div className="handle"></div>
                        </div>
                    </div>
                    <div className="elements-stack horizontal space-between align-center mb-20">
                        <span>{tLocal('maintenanceMode')}</span>
                        <div 
                            className={`ui-switch ${toggleStates.switch2 ? 'active' : ''}`}
                            onClick={() => toggle('switch2')}
                        >
                            <div className="handle"></div>
                        </div>
                    </div>
                    <div className="elements-stack horizontal gap-30">
                        <label className="checkbox-ui">
                            <input type="checkbox" checked={toggleStates.check1} onChange={() => toggle('check1')} />
                            <span className="checkmark"></span>
                            {tLocal('acceptTerms')}
                        </label>
                        <label className="checkbox-ui">
                            <input type="checkbox" checked={toggleStates.check2} onChange={() => toggle('check2')} />
                            <span className="checkmark"></span>
                            {tLocal('newsletter')}
                        </label>
                    </div>
                </section>

                <section className="ui-card-group wide">
                    <h2 className="group-title">{tLocal('progressIndicators')}</h2>
                    <div className="elements-stack">
                        <div className="progress-item">
                            <div className="progress-label"><span>{tLocal('systemStorage')}</span> <span>75%</span></div>
                            <div className="progress-bg"><div className="progress-fill blue" style={{width: '75%'}}></div></div>
                        </div>
                        <div className="progress-item">
                            <div className="progress-label"><span>{tLocal('uploadStatus')}</span> <span>42%</span></div>
                            <div className="progress-bg"><div className="progress-fill green" style={{width: '42%'}}></div></div>
                        </div>
                        <div className="progress-item">
                            <div className="progress-label"><span>{tLocal('cpuUsage')}</span> <span>90%</span></div>
                            <div className="progress-bg"><div className="progress-fill danger" style={{width: '90%'}}></div></div>
                        </div>
                    </div>
                </section>

                <section className="ui-card-group">
                    <h2 className="group-title">{tLocal('alertsToasts')}</h2>
                    <div className="elements-stack">
                        <div className="alert-ui success">
                            <Check size={18} />
                            <span>{tLocal('successAlert')}</span>
                        </div>
                        <div className="alert-ui info">
                            <Info size={18} />
                            <span>{tLocal('infoAlert')}</span>
                        </div>
                        <div className="alert-ui danger">
                            <AlertCircle size={18} />
                            <span>{tLocal('dangerAlert')}</span>
                        </div>
                    </div>
                </section>

                <section className="ui-card-group">
                    <h2 className="group-title">{tLocal('avatarsIcons')}</h2>
                    <div className="elements-stack horizontal align-center">
                        <div className="avatar-ui sm"><img src="https://ui-avatars.com/api/?name=JD&background=2b7fff&color=fff" alt="" /></div>
                        <div className="avatar-ui md"><img src="https://ui-avatars.com/api/?name=Admin&background=10b981&color=fff" alt="" /></div>
                        <div className="avatar-ui lg"><img src="https://ui-avatars.com/api/?name=Super+User&background=f97316&color=fff" alt="" /></div>
                        <div className="avatar-ui xl"><img src="https://ui-avatars.com/api/?name=UX&background=d946ef&color=fff" alt="" /></div>
                    </div>
                    <div className="elements-stack horizontal mt-30 gap-20">
                        <div className="icon-box-ui blue"><Monitor size={20} /></div>
                        <div className="icon-box-ui green"><Smartphone size={20} /></div>
                        <div className="icon-box-ui purple"><Tablet size={20} /></div>
                        <div className="icon-box-ui dark"><Globe size={20} /></div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UIElements;