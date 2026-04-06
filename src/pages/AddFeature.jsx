import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Save, X, Zap, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../Supabase';
import './AddFeature.css';

const AddFeature = ({ isCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const editData = location.state?.editData;
    const [loading, setLoading] = useState(false);
    
    // Status Modal State
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
                    message: 'Feature updated successfully!'
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
                    message: 'New feature created successfully!'
                });
            }
        } catch (err) {
            console.error('Supabase operation failed:', err);
            setStatusModal({
                isOpen: true,
                type: 'warning',
                message: err.message || 'Operation failed. Check your connection or database permissions.'
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
                    <h1>{editData ? 'Edit Feature' : 'Add New Feature'}</h1>
                </div>
            </header>

            <div className="content-grid">
                <div className="form-sections">
                    <section className="form-card">
                        <h2>Details (English)</h2>
                        <div className="input-group">
                            <label>Title EN</label>
                            <input name="title_en" value={formData.title_en} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label>Category EN</label>
                            <input name="category_en" value={formData.category_en} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label>Description EN</label>
                            <textarea name="desc_en" value={formData.desc_en} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label>Button Text EN</label>
                            <input name="btn_text_en" value={formData.btn_text_en} onChange={handleChange} placeholder="e.g. Explore Now" />
                        </div>
                    </section>

                    <section className="form-card">
                        <h2 style={{textAlign:'right'}}>التفاصيل (العربية)</h2>
                        <div className="input-group is-rtl">
                            <label>العنوان</label>
                            <input name="title_ar" value={formData.title_ar} onChange={handleChange} />
                        </div>
                        <div className="input-group is-rtl">
                            <label>الفئة</label>
                            <input name="category_ar" value={formData.category_ar} onChange={handleChange} />
                        </div>
                        <div className="input-group is-rtl">
                            <label>الوصف</label>
                            <textarea name="desc_ar" value={formData.desc_ar} onChange={handleChange} />
                        </div>
                        <div className="input-group is-rtl">
                            <label>نص الزر</label>
                            <input name="btn_text_ar" value={formData.btn_text_ar} onChange={handleChange} placeholder="مثال: اكتشف الآن" />
                        </div>
                    </section>
                </div>

                <aside className="preview-sidebar">
                    <div className="stats-card">
                        <h3>Configuration</h3>
                        <div className="input-group">
                            <label>Order Index</label>
                            <div className="readonly-index-chip">
                                <Zap size={14} />
                                <span>{formData.order_index}</span>
                                <small>(Automatic)</small>
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Image URL</label>
                            <input name="img_url" value={formData.img_url} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="action-buttons">
                        <button className="btn-primary" onClick={handleSave} disabled={loading}>
                            {loading ? 'Saving...' : 'Save Feature'}
                        </button>
                        <button className="btn-secondary" onClick={() => navigate(-1)} disabled={loading}>
                            Cancel
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
                        <h2>{statusModal.type === 'success' ? 'Success' : 'Attention'}</h2>
                        <p>{statusModal.message}</p>
                        <button className="status-modal-btn" onClick={closeStatusModal}>
                            {statusModal.type === 'success' ? 'Perfect' : 'I Understand'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddFeature;