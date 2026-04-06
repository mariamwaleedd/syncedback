import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Save, X, Zap } from 'lucide-react';
import { supabase } from '../Supabase';
import './AddFeature.css';

const AddFeature = ({ isCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const editData = location.state?.editData;
    const [loading, setLoading] = useState(false);

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
        }
    }, [editData]);

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
                navigate('/services');
            } else {
                const { data, error } = await supabase
                    .from('features')
                    .insert([savePayload])
                    .select();
                
                if (error) throw error;
                console.log('Insert successful:', data);
                navigate('/services');
            }
        } catch (err) {
            console.error('Supabase operation failed:', err);
            alert(`Error: ${err.message || 'Operation failed. Check console for details.'}`);
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
                    </section>
                </div>

                <aside className="preview-sidebar">
                    <div className="stats-card">
                        <h3>Configuration</h3>
                        <div className="input-group">
                            <label>Order Index</label>
                            <input type="number" name="order_index" value={formData.order_index} onChange={handleChange} />
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
        </div>
    );
};

export default AddFeature;