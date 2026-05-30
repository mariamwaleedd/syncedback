import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Zap, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../Supabase';
import { useTranslation } from '../common/LanguageContext';
import './AddFeature.css';

const localTranslations = {
  en: {
    editFeature: "Edit Feature",
    addNewFeature: "Add New Feature",
    detailsEn: "Details (English)",
    detailsAr: "Details (Arabic)",
    configuration: "Configuration",
    titleEn: "Title EN",
    categoryEn: "Category EN",
    descEn: "Description EN",
    btnTextEn: "Button Text EN",
    btnTextEnPlaceholder: "e.g. Explore Now",
    titleAr: "Title AR",
    categoryAr: "Category AR",
    descAr: "Description AR",
    btnTextAr: "Button Text AR",
    btnTextArPlaceholder: "e.g. Explore Now (AR)",
    orderIndex: "Order Index",
    automatic: "Automatic",
    imageUrl: "Image URL",
    saving: "Saving...",
    saveFeature: "Save Feature",
    cancel: "Cancel",
    success: "Success",
    attention: "Attention",
    perfect: "Perfect",
    understand: "I Understand",
    featureUpdatedSuccess: "Feature updated successfully!",
    newFeatureCreatedSuccess: "New feature created successfully!",
    failedSaveFeature: "Operation failed. Check your connection or database permissions."
  },
  ar: {
    editFeature: "تعديل الميزة",
    addNewFeature: "إضافة ميزة جديدة",
    detailsEn: "التفاصيل (الإنجليزية)",
    detailsAr: "التفاصيل (العربية)",
    configuration: "الإعدادات",
    titleEn: "العنوان بالإنجليزية",
    categoryEn: "الفئة بالإنجليزية",
    descEn: "الوصف بالإنجليزية",
    btnTextEn: "نص الزر بالإنجليزية",
    btnTextEnPlaceholder: "مثال: استكشف الآن",
    titleAr: "العنوان بالعربية",
    categoryAr: "الفئة بالعربية",
    descAr: "الوصف بالعربية",
    btnTextAr: "نص الزر بالعربية",
    btnTextArPlaceholder: "مثال: اكتشف الآن",
    orderIndex: "ترتيب العرض",
    automatic: "تلقائي",
    imageUrl: "رابط الصورة",
    saving: "جاري الحفظ...",
    saveFeature: "حفظ الميزة",
    cancel: "إلغاء",
    success: "تم بنجاح",
    attention: "انتباه",
    perfect: "ممتاز",
    understand: "حسناً، فهمت",
    featureUpdatedSuccess: "تم تحديث الميزة بنجاح!",
    newFeatureCreatedSuccess: "تم إنشاء الميزة الجديدة بنجاح!",
    failedSaveFeature: "فشلت العملية. تحقق من الاتصال أو صلاحيات قاعدة البيانات."
  }
};

const AddFeature = ({ isCollapsed }) => {
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

    const [formData, setFormData] = useState({
        category_en: '',
        category_ar: '',
        title_en: '',
        title_ar: '',
        desc_en: '',
        desc_ar: '',
        btn_text_en: '',
        btn_text_ar: '',
        order_index: '',
        img_url: ''
    });

    const tLocal = (key) => {
        return localTranslations[language]?.[key] || localTranslations['en'][key] || key;
    };

    useEffect(() => {
        if (editData) {
            setFormData(editData);
        } else {
            fetchNextIndex();
        }
    }, [editData]);

    const fetchNextIndex = async () => {
        const { data, error } = await supabase
            .from('features')
            .select('order_index')
            .order('order_index', { ascending: false })
            .limit(1);

        if (error) {
            console.error('Error fetching max index:', error);
            setFormData(prev => ({ ...prev, order_index: 1 }));
        } else {
            const nextIndex = data.length > 0 ? (Number(data[0].order_index) || 0) + 1 : 1;
            setFormData(prev => ({ ...prev, order_index: nextIndex }));
        }
    };

    const closeStatusModal = () => {
        setStatusModal({ ...statusModal, isOpen: false });
        if (statusModal.type === 'success') navigate('/services');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const processedValue = name === 'order_index' ? (value === '' ? null : Number(value)) : value;
        setFormData({ ...formData, [name]: processedValue });
    };

    const handleSave = async () => {
        setLoading(true);
        console.log('Attempting to save feature:', formData);

        const { id, ...savePayload } = formData;
        
        try {
            if (editData) {
                const { data, error } = await supabase
                    .from('features')
                    .update(savePayload)
                    .eq('id', editData.id)
                    .select();
                
                if (error) throw error;
                console.log('Update successful:', data);
                setStatusModal({
                    isOpen: true,
                    type: 'success',
                    message: tLocal('featureUpdatedSuccess')
                });
            } else {
                const { data, error } = await supabase
                    .from('features')
                    .insert([savePayload])
                    .select();
                
                if (error) throw error;
                console.log('Insert successful:', data);
                setStatusModal({
                    isOpen: true,
                    type: 'success',
                    message: tLocal('newFeatureCreatedSuccess')
                });
            }
        } catch (err) {
            console.error('Supabase operation failed:', err);
            setStatusModal({
                isOpen: true,
                type: 'warning',
                message: err.message || tLocal('failedSaveFeature')
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`add-feature-container ${isCollapsed ? 'collapsed' : ''}`}>
            <header className="page-header">
                <button className="back-btn" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
                <div className="header-text">
                    <h1>{editData ? tLocal('editFeature') : tLocal('addNewFeature')}</h1>
                </div>
            </header>

            <div className="content-grid">
                <div className="form-sections">
                    <section className="form-card">
                        <h2>{tLocal('detailsEn')}</h2>
                        <div className="input-group">
                            <label>{tLocal('titleEn')}</label>
                            <input name="title_en" value={formData.title_en} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label>{tLocal('categoryEn')}</label>
                            <input name="category_en" value={formData.category_en} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label>{tLocal('descEn')}</label>
                            <textarea name="desc_en" value={formData.desc_en} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label>{tLocal('btnTextEn')}</label>
                            <input name="btn_text_en" value={formData.btn_text_en} onChange={handleChange} placeholder={tLocal('btnTextEnPlaceholder')} />
                        </div>
                    </section>

                    <section className="form-card">
                        <h2 style={{textAlign: language === 'ar' ? 'right' : 'left'}}>{tLocal('detailsAr')}</h2>
                        <div className="input-group is-rtl">
                            <label style={{textAlign: language === 'ar' ? 'right' : 'left'}}>{tLocal('titleAr')}</label>
                            <input name="title_ar" value={formData.title_ar} onChange={handleChange} style={{textAlign: language === 'ar' ? 'right' : 'left'}} />
                        </div>
                        <div className="input-group is-rtl">
                            <label style={{textAlign: language === 'ar' ? 'right' : 'left'}}>{tLocal('categoryAr')}</label>
                            <input name="category_ar" value={formData.category_ar} onChange={handleChange} style={{textAlign: language === 'ar' ? 'right' : 'left'}} />
                        </div>
                        <div className="input-group is-rtl">
                            <label style={{textAlign: language === 'ar' ? 'right' : 'left'}}>{tLocal('descAr')}</label>
                            <textarea name="desc_ar" value={formData.desc_ar} onChange={handleChange} style={{textAlign: language === 'ar' ? 'right' : 'left'}} />
                        </div>
                        <div className="input-group is-rtl">
                            <label style={{textAlign: language === 'ar' ? 'right' : 'left'}}>{tLocal('btnTextAr')}</label>
                            <input name="btn_text_ar" value={formData.btn_text_ar} onChange={handleChange} placeholder={tLocal('btnTextArPlaceholder')} style={{textAlign: language === 'ar' ? 'right' : 'left'}} />
                        </div>
                    </section>
                </div>

                <aside className="preview-sidebar">
                    <div className="stats-card">
                        <h3>{tLocal('configuration')}</h3>
                        <div className="input-group">
                            <label>{tLocal('orderIndex')}</label>
                            <div className="readonly-index-chip">
                                <Zap size={14} />
                                <span>{formData.order_index}</span>
                                <small>({tLocal('automatic')})</small>
                            </div>
                        </div>
                        <div className="input-group">
                            <label>{tLocal('imageUrl')}</label>
                            <input name="img_url" value={formData.img_url} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="action-buttons">
                        <button className="btn-primary" onClick={handleSave} disabled={loading}>
                            {loading ? tLocal('saving') : tLocal('saveFeature')}
                        </button>
                        <button className="btn-secondary" onClick={() => navigate(-1)} disabled={loading}>
                            {tLocal('cancel')}
                        </button>
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

export default AddFeature;