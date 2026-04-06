import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Layout, Layers, Monitor, Smartphone, Tablet, Save, X, Plus, Info, FileText, Globe } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './AddPage.css';

const AddPage = ({ isCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const editData = location.state?.editData;

    const [selectedLayout, setSelectedLayout] = useState('default');
    const [devices, setDevices] = useState({ mobile: true, tablet: true, desktop: true });
    const [formData, setFormData] = useState({
        name_en: '', path_en: '', title_en: '', accessibility_en: '', desc_en: '',
        name_ar: '', title_ar: '', accessibility_ar: '', desc_ar: ''
    });

    useEffect(() => {
        if (editData) {
            setFormData(editData);
            setSelectedLayout(editData.layout);
            setDevices({ 
                mobile: editData.device_mobile, 
                tablet: editData.device_tablet, 
                desktop: editData.device_desktop 
            });
        }
    }, [editData]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSave = async () => {
        const payload = {
            ...formData,
            layout: selectedLayout,
            device_mobile: devices.mobile,
            device_tablet: devices.tablet,
            device_desktop: devices.desktop
        };

        if (editData) {
            const { error } = await supabase.from('pages').update(payload).eq('id', editData.id);
            if (error) alert("Update failed"); else navigate('/manage-pages');
        } else {
            const { error } = await supabase.from('pages').insert([payload]);
            if (error) alert("Creation failed"); else navigate('/manage-pages');
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
                        <h2 className="addpage-section-heading">Page Details</h2>
                        <div className="addpage-ui-input-group">
                            <label>Page Name EN</label>
                            <input type="text" name="name_en" value={formData.name_en} onChange={handleChange} />
                        </div>
                        <div className="addpage-ui-input-group">
                            <label>URL Path EN</label>
                            <input type="text" name="path_en" value={formData.path_en} onChange={handleChange} />
                        </div>
                        <div className="addpage-ui-input-group addpage-is-rtl">
                            <label>اسم الصفحة</label>
                            <input type="text" name="name_ar" value={formData.name_ar} onChange={handleChange} />
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
                </div>

                <aside className="addpage-page-preview-aside">
                    <div className="addpage-page-footer-actions">
                        <button className="addpage-primary-submit-btn" onClick={handleSave}><Save size={18} /> Save Page</button>
                        <button className="addpage-secondary-cancel-btn" onClick={() => navigate(-1)}><X size={18} /> Cancel</button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default AddPage;