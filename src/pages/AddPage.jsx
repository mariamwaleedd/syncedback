import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Layout, Layers, Monitor, Smartphone, Tablet, Save, X, Plus, Info, FileText, Globe, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../Supabase';
import './AddPage.css';

const AddPage = ({ isCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const editData = location.state?.editData;
    const [loading, setLoading] = useState(false);
    
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
                setStatusModal({ isOpen: true, type: 'success', message: 'Page updated successfully!' });
            } else {
                const { error } = await supabase.from('pages').insert([payload]);
                if (error) throw error;
                setStatusModal({ isOpen: true, type: 'success', message: 'New page created successfully!' });
            }
        } catch (err) {
            console.error(err);
            setStatusModal({ isOpen: true, type: 'warning', message: err.message || 'Failed to save page' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`addpage-add-page-container ${isCollapsed ? 'is-collapsed' : ''}`}>
            <header className="addpage-page-view-header">
                <button className="addpage-round-back-btn" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
                <div className="addpage-header-meta">
                    <h1>{editData ? 'Edit Page' : 'Add New Page'}</h1>
                </div>
            </header>

            <div className="addpage-add-page-content-grid">
                <div className="form-sections-stack">
                    <section className="addpage-ui-card-section">
                        <h2 className="addpage-section-heading">Identify Page</h2>
                        <div className="addpage-input-row-flex">
                            <div className="addpage-ui-input-group">
                                <label>Page Name EN</label>
                                <input type="text" name="name_en" value={formData.name_en} onChange={handleChange} placeholder="e.g. Dashboard" />
                            </div>
                            <div className="addpage-ui-input-group">
                                <label>URL Path EN</label>
                                <input type="text" name="path_en" value={formData.path_en} onChange={handleChange} placeholder="/dashboard" />
                            </div>
                        </div>
                        <div className="addpage-ui-input-group addpage-is-rtl">
                            <label>اسم الصفحة</label>
                            <input type="text" name="name_ar" value={formData.name_ar} onChange={handleChange} style={{textAlign:'right'}} />
                        </div>
                    </section>

                    <section className="addpage-ui-card-section">
                        <h2 className="addpage-section-heading">SEO & Metadata (English)</h2>
                        <div className="addpage-ui-input-group">
                            <label>SEO Title EN</label>
                            <input type="text" name="title_en" value={formData.title_en} onChange={handleChange} />
                        </div>
                        <div className="addpage-ui-input-group">
                            <label>SEO Description EN</label>
                            <textarea name="desc_en" value={formData.desc_en} onChange={handleChange} rows="3" />
                        </div>
                        <div className="addpage-ui-input-group">
                            <label>Accessibility (Alt Text) EN</label>
                            <input type="text" name="accessibility_en" value={formData.accessibility_en} onChange={handleChange} />
                        </div>
                    </section>

                    <section className="addpage-ui-card-section addpage-is-rtl">
                        <h2 className="addpage-section-heading">SEO والبيانات (العربية)</h2>
                        <div className="addpage-ui-input-group">
                            <label>عنوان SEO</label>
                            <input type="text" name="title_ar" value={formData.title_ar} onChange={handleChange} />
                        </div>
                        <div className="addpage-ui-input-group">
                            <label>وصف SEO</label>
                            <textarea name="desc_ar" value={formData.desc_ar} onChange={handleChange} rows="3" />
                        </div>
                        <div className="addpage-ui-input-group">
                            <label>ملاحظات الوصول</label>
                            <input type="text" name="accessibility_ar" value={formData.accessibility_ar} onChange={handleChange} />
                        </div>
                    </section>

                    <section className="addpage-ui-card-section">
                        <h2 className="addpage-section-heading">Page Layout</h2>
                        <div className="addpage-layout-selection-grid">
                            {['default', 'full', 'sidebar', 'blank'].map(id => (
                                <div key={id} className={`addpage-layout-option-card ${selectedLayout === id ? 'active' : ''}`} onClick={() => setSelectedLayout(id)}>
                                    <span>{id.toUpperCase()}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="addpage-ui-card-section">
                        <h2 className="addpage-section-heading">Device Support</h2>
                        <div className="addpage-device-toggle-grid">
                            {['mobile', 'tablet', 'desktop'].map(d => (
                                <div key={d} className={`addpage-device-card ${devices[d] ? 'active' : ''}`} onClick={() => setDevices({...devices, [d]: !devices[d]})}>
                                    <span>{d.toUpperCase()}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="addpage-ui-card-section">
                        <h2 className="addpage-section-heading">Classification & Status</h2>
                        <div className="addpage-input-row-flex">
                            <div className="addpage-ui-input-group">
                                <label>Page Status</label>
                                <select name="status" value={formData.status} onChange={handleChange} className="addpage-ui-select">
                                    <option value="active">Active</option>
                                    <option value="draft">Draft</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                            <div className="addpage-ui-input-group">
                                <label>Page Type</label>
                                <select name="type" value={formData.type} onChange={handleChange} className="addpage-ui-select">
                                    <option value="standard">Standard Page</option>
                                    <option value="dashboard">Dashboard Area</option>
                                    <option value="public">Public Landing</option>
                                    <option value="admin">Admin Tool</option>
                                </select>
                            </div>
                        </div>
                    </section>
                </div>

                <aside className="addpage-page-preview-aside">
                    <div className="addpage-aside-card-box">
                        <h3 className="addpage-aside-title">Custom Meta Tags (JSONB)</h3>
                        <div className="addpage-meta-tags-list">
                            {metaTags.map((tag, index) => (
                                <div key={index} className="addpage-meta-tag-pair">
                                    <input placeholder="Key" value={tag.key} onChange={(e) => handleMetaChange(index, 'key', e.target.value)} />
                                    <input placeholder="Value" value={tag.value} onChange={(e) => handleMetaChange(index, 'value', e.target.value)} />
                                    <button onClick={() => removeMetaTag(index)} className="addpage-meta-remove-btn"><X size={14} /></button>
                                </div>
                            ))}
                            <button className="addpage-meta-add-btn" onClick={addMetaTag}>
                                <Plus size={16} /> Add Meta Property
                            </button>
                        </div>
                    </div>

                    <div className="addpage-page-footer-actions">
                        <button className="addpage-primary-submit-btn" onClick={handleSave} disabled={loading}><Save size={18} /> {editData ? 'Update Page' : 'Save Page'}</button>
                        <button className="addpage-secondary-cancel-btn" onClick={() => navigate(-1)}><X size={18} /> Cancel</button>
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

export default AddPage;