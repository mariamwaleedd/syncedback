import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Save, X, Plus, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../Supabase';
import { useTranslation } from '../common/LanguageContext';
import './AddPage.css';

const localTranslations = {
  en: {
    editPage: "Edit Page",
    addNewPage: "Add New Page",
    identifyPage: "Identify Page",
    seoMetaEn: "SEO & Metadata (English)",
    seoMetaAr: "SEO & Metadata (Arabic)",
    pageLayout: "Page Layout",
    deviceSupport: "Device Support",
    classificationStatus: "Classification & Status",
    customMetaTags: "Custom Meta Tags (JSONB)",
    pageNameEn: "Page Name EN",
    urlPathEn: "URL Path EN",
    pageNameAr: "Page Name AR",
    seoTitleEn: "SEO Title EN",
    seoDescEn: "SEO Description EN",
    accessibilityEn: "Accessibility (Alt Text) EN",
    seoTitleAr: "SEO Title AR",
    seoDescAr: "SEO Description AR",
    accessibilityAr: "Accessibility AR",
    pageStatus: "Page Status",
    pageType: "Page Type",
    key: "Key",
    value: "Value",
    addMetaProperty: "Add Meta Property",
    updatePage: "Update Page",
    savePage: "Save Page",
    cancel: "Cancel",
    active: "Active",
    draft: "Draft",
    archived: "Archived",
    standardPage: "Standard Page",
    dashboardArea: "Dashboard Area",
    publicLanding: "Public Landing",
    adminTool: "Admin Tool",
    success: "Success",
    attention: "Attention",
    perfect: "Perfect",
    understand: "I Understand",
    pageUpdatedSuccess: "Page updated successfully!",
    newPageCreatedSuccess: "New page created successfully!",
    failedSavePage: "Failed to save page",
    pageNameEnPlaceholder: "e.g. Dashboard",
    urlPathEnPlaceholder: "/dashboard"
  },
  ar: {
    editPage: "تعديل الصفحة",
    addNewPage: "إضافة صفحة جديدة",
    identifyPage: "تعريف الصفحة",
    seoMetaEn: "تهيئة محركات البحث والبيانات الميتا (الإنجليزية)",
    seoMetaAr: "تهيئة محركات البحث والبيانات الميتا (العربية)",
    pageLayout: "مخطط الصفحة",
    deviceSupport: "دعم الأجهزة",
    classificationStatus: "التصنيف والحالة",
    customMetaTags: "علامات الميتا المخصصة (JSONB)",
    pageNameEn: "اسم الصفحة بالإنجليزية",
    urlPathEn: "مسار الرابط بالإنجليزية",
    pageNameAr: "اسم الصفحة بالعربية",
    seoTitleEn: "عنوان SEO بالإنجليزية",
    seoDescEn: "وصف SEO بالإنجليزية",
    accessibilityEn: "ملاحظات الوصول بالإنجليزية",
    seoTitleAr: "عنوان SEO بالعربية",
    seoDescAr: "وصف SEO بالعربية",
    accessibilityAr: "ملاحظات الوصول بالعربية",
    pageStatus: "حالة الصفحة",
    pageType: "نوع الصفحة",
    key: "المفتاح",
    value: "القيمة",
    addMetaProperty: "إضافة علامة ميتا",
    updatePage: "تحديث الصفحة",
    savePage: "حفظ الصفحة",
    cancel: "إلغاء",
    active: "نشط",
    draft: "مسودة",
    archived: "مؤرشف",
    standardPage: "صفحة قياسية",
    dashboardArea: "منطقة لوحة التحكم",
    publicLanding: "صفحة هبوط عامة",
    adminTool: "أداة مدير النظام",
    success: "تم بنجاح",
    attention: "انتباه",
    perfect: "ممتاز",
    understand: "حسناً، فهمت",
    pageUpdatedSuccess: "تم تحديث الصفحة بنجاح!",
    newPageCreatedSuccess: "تم إنشاء الصفحة الجديدة بنجاح!",
    failedSavePage: "فشل حفظ الصفحة",
    pageNameEnPlaceholder: "مثال: لوحة التحكم",
    urlPathEnPlaceholder: "/dashboard"
  }
};

const AddPage = ({ isCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const editData = location.state?.editData;
    const [loading, setLoading] = useState(false);
    const { language } = useTranslation();
    
    const [statusModal, setStatusModal] = useState({
        isOpen: false,
        type: 'warning',
        message: ''
    });

    const [selectedLayout, setSelectedLayout] = useState('default');
    const [devices, setDevices] = useState({ mobile: true, tablet: true, desktop: true });
    const [formData, setFormData] = useState({
        name_en: '', 
        path_en: '', 
        title_en: '', 
        accessibility_en: '', 
        desc_en: '',
        name_ar: '', 
        title_ar: '', 
        accessibility_ar: '', 
        desc_ar: '',
        status: 'active',
        type: 'standard'
    });
    
    const [metaTags, setMetaTags] = useState([]); 

    const tLocal = (key) => {
        return localTranslations[language]?.[key] || localTranslations['en'][key] || key;
    };

    useEffect(() => {
        if (editData) {
            setFormData({
                name_en: editData.name_en || '',
                path_en: editData.path_en || '',
                title_en: editData.title_en || '',
                accessibility_en: editData.accessibility_en || '',
                desc_en: editData.desc_en || '',
                name_ar: editData.name_ar || '',
                title_ar: editData.title_ar || '',
                accessibility_ar: editData.accessibility_ar || '',
                desc_ar: editData.desc_ar || '',
                status: editData.status || 'active',
                type: editData.type || 'standard'
            });
            setSelectedLayout(editData.layout || 'default');
            setDevices({ 
                mobile: !!editData.device_mobile, 
                tablet: !!editData.device_tablet, 
                desktop: !!editData.device_desktop 
            });
            if (editData.meta_tags && typeof editData.meta_tags === 'object') {
                const tags = Object.entries(editData.meta_tags).map(([key, value]) => ({ key, value }));
                setMetaTags(tags);
            }
        }
    }, [editData]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const addMetaTag = () => setMetaTags([...metaTags, { key: '', value: '' }]);
    const removeMetaTag = (index) => setMetaTags(metaTags.filter((_, i) => i !== index));
    const handleMetaChange = (index, field, value) => {
        const updated = [...metaTags];
        updated[index][field] = value;
        setMetaTags(updated);
    };

    const closeStatusModal = () => {
        setStatusModal({ ...statusModal, isOpen: false });
        if (statusModal.type === 'success') {
            navigate('/manage-pages');
        }
    };

    const handleSave = async () => {
        const metaTagsObject = metaTags.reduce((acc, curr) => {
            if (curr.key) acc[curr.key] = curr.value;
            return acc;
        }, {});

        const payload = {
            ...formData,
            layout: selectedLayout,
            device_mobile: devices.mobile,
            device_tablet: devices.tablet,
            device_desktop: devices.desktop,
            meta_tags: metaTagsObject
        };

        try {
            setLoading(true);
            if (editData) {
                const { error } = await supabase.from('pages').update(payload).eq('id', editData.id);
                if (error) throw error;
                setStatusModal({ isOpen: true, type: 'success', message: tLocal('pageUpdatedSuccess') });
            } else {
                const { error } = await supabase.from('pages').insert([payload]);
                if (error) throw error;
                setStatusModal({ isOpen: true, type: 'success', message: tLocal('newPageCreatedSuccess') });
            }
        } catch (err) {
            console.error(err);
            setStatusModal({ isOpen: true, type: 'warning', message: err.message || tLocal('failedSavePage') });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`addpage-add-page-container ${isCollapsed ? 'is-collapsed' : ''}`}>
            <header className="addpage-page-view-header">
                <button className="addpage-round-back-btn" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
                <div className="addpage-header-meta">
                    <h1>{editData ? tLocal('editPage') : tLocal('addNewPage')}</h1>
                </div>
            </header>

            <div className="addpage-add-page-content-grid">
                <div className="form-sections-stack">
                    <section className="addpage-ui-card-section">
                        <h2 className="addpage-section-heading">{tLocal('identifyPage')}</h2>
                        <div className="addpage-input-row-flex">
                            <div className="addpage-ui-input-group">
                                <label>{tLocal('pageNameEn')}</label>
                                <input type="text" name="name_en" value={formData.name_en} onChange={handleChange} placeholder={tLocal('pageNameEnPlaceholder')} />
                            </div>
                            <div className="addpage-ui-input-group">
                                <label>{tLocal('urlPathEn')}</label>
                                <input type="text" name="path_en" value={formData.path_en} onChange={handleChange} placeholder={tLocal('urlPathEnPlaceholder')} />
                            </div>
                        </div>
                        <div className="addpage-ui-input-group addpage-is-rtl">
                            <label>{tLocal('pageNameAr')}</label>
                            <input type="text" name="name_ar" value={formData.name_ar} onChange={handleChange} style={{textAlign: language === 'ar' ? 'right' : 'left'}} />
                        </div>
                    </section>

                    <section className="addpage-ui-card-section">
                        <h2 className="addpage-section-heading">{tLocal('seoMetaEn')}</h2>
                        <div className="addpage-ui-input-group">
                            <label>{tLocal('seoTitleEn')}</label>
                            <input type="text" name="title_en" value={formData.title_en} onChange={handleChange} />
                        </div>
                        <div className="addpage-ui-input-group">
                            <label>{tLocal('seoDescEn')}</label>
                            <textarea name="desc_en" value={formData.desc_en} onChange={handleChange} rows="3" />
                        </div>
                        <div className="addpage-ui-input-group">
                            <label>{tLocal('accessibilityEn')}</label>
                            <input type="text" name="accessibility_en" value={formData.accessibility_en} onChange={handleChange} />
                        </div>
                    </section>

                    <section className="addpage-ui-card-section addpage-is-rtl">
                        <h2 className="addpage-section-heading" style={{textAlign: language === 'ar' ? 'right' : 'left'}}>{tLocal('seoMetaAr')}</h2>
                        <div className="addpage-ui-input-group">
                            <label style={{textAlign: language === 'ar' ? 'right' : 'left'}}>{tLocal('seoTitleAr')}</label>
                            <input type="text" name="title_ar" value={formData.title_ar} onChange={handleChange} style={{textAlign: language === 'ar' ? 'right' : 'left'}} />
                        </div>
                        <div className="addpage-ui-input-group">
                            <label style={{textAlign: language === 'ar' ? 'right' : 'left'}}>{tLocal('seoDescAr')}</label>
                            <textarea name="desc_ar" value={formData.desc_ar} onChange={handleChange} rows="3" style={{textAlign: language === 'ar' ? 'right' : 'left'}} />
                        </div>
                        <div className="addpage-ui-input-group">
                            <label style={{textAlign: language === 'ar' ? 'right' : 'left'}}>{tLocal('accessibilityAr')}</label>
                            <input type="text" name="accessibility_ar" value={formData.accessibility_ar} onChange={handleChange} style={{textAlign: language === 'ar' ? 'right' : 'left'}} />
                        </div>
                    </section>

                    <section className="addpage-ui-card-section">
                        <h2 className="addpage-section-heading">{tLocal('pageLayout')}</h2>
                        <div className="addpage-layout-selection-grid">
                            {['default', 'full', 'sidebar', 'blank'].map(id => (
                                <div key={id} className={`addpage-layout-option-card ${selectedLayout === id ? 'active' : ''}`} onClick={() => setSelectedLayout(id)}>
                                    <span>{id.toUpperCase()}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="addpage-ui-card-section">
                        <h2 className="addpage-section-heading">{tLocal('deviceSupport')}</h2>
                        <div className="addpage-device-toggle-grid">
                            {['mobile', 'tablet', 'desktop'].map(d => (
                                <div key={d} className={`addpage-device-card ${devices[d] ? 'active' : ''}`} onClick={() => setDevices({...devices, [d]: !devices[d]})}>
                                    <span>{d.toUpperCase()}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="addpage-ui-card-section">
                        <h2 className="addpage-section-heading">{tLocal('classificationStatus')}</h2>
                        <div className="addpage-input-row-flex">
                            <div className="addpage-ui-input-group">
                                <label>{tLocal('pageStatus')}</label>
                                <select name="status" value={formData.status} onChange={handleChange} className="addpage-ui-select">
                                    <option value="active">{tLocal('active')}</option>
                                    <option value="draft">{tLocal('draft')}</option>
                                    <option value="archived">{tLocal('archived')}</option>
                                </select>
                            </div>
                            <div className="addpage-ui-input-group">
                                <label>{tLocal('pageType')}</label>
                                <select name="type" value={formData.type} onChange={handleChange} className="addpage-ui-select">
                                    <option value="standard">{tLocal('standardPage')}</option>
                                    <option value="dashboard">{tLocal('dashboardArea')}</option>
                                    <option value="public">{tLocal('publicLanding')}</option>
                                    <option value="admin">{tLocal('adminTool')}</option>
                                </select>
                            </div>
                        </div>
                    </section>
                </div>

                <aside className="addpage-page-preview-aside">
                    <div className="addpage-aside-card-box">
                        <h3 className="addpage-aside-title">{tLocal('customMetaTags')}</h3>
                        <div className="addpage-meta-tags-list">
                            {metaTags.map((tag, index) => (
                                <div key={index} className="addpage-meta-tag-pair">
                                    <input placeholder={tLocal('key')} value={tag.key} onChange={(e) => handleMetaChange(index, 'key', e.target.value)} />
                                    <input placeholder={tLocal('value')} value={tag.value} onChange={(e) => handleMetaChange(index, 'value', e.target.value)} />
                                    <button onClick={() => removeMetaTag(index)} className="addpage-meta-remove-btn"><X size={14} /></button>
                                </div>
                            ))}
                            <button className="addpage-meta-add-btn" onClick={addMetaTag}>
                                <Plus size={16} /> {tLocal('addMetaProperty')}
                            </button>
                        </div>
                    </div>

                    <div className="addpage-page-footer-actions">
                        <button className="addpage-primary-submit-btn" onClick={handleSave} disabled={loading}><Save size={18} /> {editData ? tLocal('updatePage') : tLocal('savePage')}</button>
                        <button className="addpage-secondary-cancel-btn" onClick={() => navigate(-1)}><X size={18} /> {tLocal('cancel')}</button>
                    </div>
                </aside>
            </div>

            {statusModal.isOpen && (
                <div className="status-modal-overlay">
                    <div className="status-modal-card">
                        <div className={`status-modal-icon ${statusModal.type}`}>
                            {statusModal.type === 'success' ? <CheckCircle size={32} /> : <AlertCircle size={32} />}
                        </div>
                        <h2>{statusModal.type === 'success' ? tLocal('success') : tLocal('attention')}</h2>
                        <p>{statusModal.message}</p>
                        <button className="status-modal-btn" onClick={closeStatusModal}>
                            {statusModal.type === 'success' ? tLocal('perfect') : tLocal('understand')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddPage;