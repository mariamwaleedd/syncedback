import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, Layout, Layers, Monitor, 
    Smartphone, Tablet, Save, X, Plus, 
    Info, FileText, Globe 
} from 'lucide-react';
import './AddPage.css';

const AddPage = ({ isCollapsed }) => {
    const navigate = useNavigate();
    const [selectedLayout, setSelectedLayout] = useState('default');
    const [devices, setDevices] = useState({ mobile: true, tablet: true, desktop: true });
    const [formData, setFormData] = useState({
        nameEn: '',
        pathEn: '',
        titleEn: '',
        accessibilityEn: '',
        descEn: '',
        nameAr: '',
        titleAr: '',
        accessibilityAr: '',
        descAr: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleDevice = (device) => {
        setDevices(prev => ({ ...prev, [device]: !prev[device] }));
    };

    return (
        <div className={`add-page-container ${isCollapsed ? 'is-collapsed' : ''}`}>
            <header className="page-view-header">
                <button className="round-back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} />
                </button>
                <div className="header-meta">
                    <h1>Add New Page</h1>
                    <p>Create a new page for your application</p>
                </div>
            </header>

            <div className="add-page-content-grid">
                <div className="form-sections-stack">
                    <section className="ui-card-section">
                        <h2 className="section-heading">Page Details</h2>
                        
                        <div className="ui-input-group">
                            <label>Page Name EN</label>
                            <input type="text" name="nameEn" placeholder="e.g., User Dashboard" onChange={handleChange} />
                        </div>

                        <div className="ui-input-group">
                            <label>URL Path EN</label>
                            <div className="url-input-wrapper">
                                <span className="url-prefix">https://yourapp.com</span>
                                <input type="text" name="pathEn" placeholder="/user-dashboard" onChange={handleChange} />
                            </div>
                            <small className="input-hint">Use lowercase letters and hyphens only</small>
                        </div>

                        <div className="input-row-flex">
                            <div className="ui-input-group">
                                <label>Page Title (SEO) EN</label>
                                <input type="text" name="titleEn" placeholder="User Dashboard | HealthHub" onChange={handleChange} />
                            </div>
                            <div className="ui-input-group">
                                <label>Accessibility EN</label>
                                <input type="text" name="accessibilityEn" onChange={handleChange} />
                            </div>
                        </div>

                        <div className="ui-input-group">
                            <label>Meta Description (SEO) EN</label>
                            <textarea 
                                name="descEn" 
                                placeholder="Brief description of this page for search engines..."
                                onChange={handleChange}
                            />
                            <div className="char-counter">{formData.descEn.length}/160 characters</div>
                        </div>

                        <div className="horizontal-divider" />

                        <div className="ui-input-group is-rtl">
                            <label>Page Name AR</label>
                            <input type="text" name="nameAr" placeholder="لوحة تحكم المستخدم" onChange={handleChange} />
                        </div>

                        <div className="input-row-flex is-rtl">
                            <div className="ui-input-group">
                                <label>Page Title (SEO) AR</label>
                                <input type="text" name="titleAr" placeholder="لوحة تحكم المستخدم | HealthHub" onChange={handleChange} />
                            </div>
                            <div className="ui-input-group">
                                <label>Accessibility AR</label>
                                <input type="text" name="accessibilityAr" onChange={handleChange} />
                            </div>
                        </div>

                        <div className="ui-input-group is-rtl">
                            <label>Meta Description (SEO) AR</label>
                            <textarea 
                                name="descAr" 
                                placeholder="وصف موجز لهذه الصفحة لمحركات البحث..."
                                onChange={handleChange}
                            />
                            <div className="char-counter">{formData.descAr.length}/160 characters</div>
                        </div>
                    </section>

                    <section className="ui-card-section">
                        <h2 className="section-heading">Page Layout</h2>
                        <div className="layout-selection-grid">
                            {[
                                { id: 'default', label: 'Default Layout', icon: <Layout size={24} /> },
                                { id: 'full', label: 'Full Width', icon: <Monitor size={24} /> },
                                { id: 'sidebar', label: 'With Sidebar', icon: <Layers size={24} /> },
                                { id: 'blank', label: 'Blank (No Layout)', icon: <FileText size={24} /> }
                            ].map((item) => (
                                <div 
                                    key={item.id}
                                    className={`layout-option-card ${selectedLayout === item.id ? 'active' : ''}`}
                                    onClick={() => setSelectedLayout(item.id)}
                                >
                                    <div className="option-icon">{item.icon}</div>
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="ui-card-section">
                        <h2 className="section-heading">Device Support</h2>
                        <div className="device-toggle-grid">
                            <div className={`device-card ${devices.mobile ? 'active' : ''}`} onClick={() => toggleDevice('mobile')}>
                                <Smartphone size={24} />
                                <span>Mobile</span>
                            </div>
                            <div className={`device-card ${devices.tablet ? 'active' : ''}`} onClick={() => toggleDevice('tablet')}>
                                <Tablet size={24} />
                                <span>Tablet</span>
                            </div>
                            <div className={`device-card ${devices.desktop ? 'active' : ''}`} onClick={() => toggleDevice('desktop')}>
                                <Monitor size={24} />
                                <span>Desktop</span>
                            </div>
                        </div>
                    </section>

                    <section className="ui-card-section">
                        <h2 className="section-heading">Meta Tags (Optional)</h2>
                        <div className="meta-tag-row">
                            <input type="text" placeholder="Property (e.g., og:image)" />
                            <input type="text" placeholder="Content value" />
                            <button className="meta-add-btn"><Plus size={20} /></button>
                        </div>
                    </section>
                </div>

                <aside className="page-preview-aside">
                    <div className="aside-sticky-content">
                        <div className="aside-card-box">
                            <h3 className="aside-title">Preview</h3>
                            <div className="page-preview-widget">
                                <div className="widget-head">
                                    <div className="page-icon-box"><FileText size={22} fill="rgba(255,255,255,0.2)" /></div>
                                    <div className="page-main-info">
                                        <h4>{formData.nameEn || 'Page Name'}</h4>
                                        <span className="page-url-path">{formData.pathEn || '/page-path'}</span>
                                    </div>
                                </div>
                                <div className="status-badge-public">
                                    <Globe size={12} /> <span>public</span>
                                </div>
                                <p className="preview-desc-text">
                                    {formData.descEn || 'No description provided'}
                                </p>
                            </div>
                        </div>

                        <div className="seo-tip-card">
                            <div className="tip-icon"><Info size={18} /></div>
                            <div className="tip-content">
                                <h5>SEO Tip</h5>
                                <p>Keep your page title under 60 characters and meta description under 160 for best results.</p>
                            </div>
                        </div>

                        <div className="aside-card-box">
                            <h3 className="aside-title">Page Configuration</h3>
                            <div className="config-summary-item">
                                <span>Layout</span>
                                <strong>Default Layout</strong>
                            </div>
                            <div className="config-summary-item">
                                <span>Devices</span>
                                <strong>3 supported</strong>
                            </div>
                            <div className="config-summary-item">
                                <span>Meta Tags</span>
                                <strong>0 added</strong>
                            </div>
                        </div>

                        <div className="page-footer-actions">
                            <button className="primary-submit-btn">
                                <Save size={18} /> Create Page
                            </button>
                            <button className="secondary-cancel-btn" onClick={() => navigate(-1)}>
                                <X size={18} /> Cancel
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default AddPage;