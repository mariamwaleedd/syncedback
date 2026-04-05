import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Zap, Users, Eye, BarChart3, Save, X } from 'lucide-react';
import './AddFeature.css';

const AddFeature = ({ isCollapsed }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nameEn: '',
        categoryEn: '',
        descEn: '',
        nameAr: '',
        categoryAr: '',
        descAr: '',
        status: 'enabled',
        accessLevel: '',
        dependencies: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className={`addfeature-add-feature-container ${isCollapsed ? 'collapsed' : ''}`}>
            <header className="addfeature-add-feature-header">
                <button className="addfeature-back-circle-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} />
                </button>
                <div className="addfeature-header-titles">
                    <h1>Add New Feature</h1>
                    <p>Create and configure a new feature for your application</p>
                </div>
            </header>

            <div className="addfeature-feature-grid">
                <div className="form-column">
                    <section className="addfeature-form-section-card">
                        <h2 className="addfeature-section-title">Basic Information</h2>
                        
                        <div className="addfeature-input-field">
                            <label>Feature Name EN</label>
                            <input 
                                type="text" 
                                name="nameEn"
                                placeholder="e.g., Smart Health Predictions"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="addfeature-input-field">
                            <label>Category EN</label>
                            <input type="text" name="categoryEn" onChange={handleChange} />
                        </div>

                        <div className="addfeature-input-field">
                            <label>Description EN</label>
                            <textarea 
                                name="descEn"
                                placeholder="Describe what this feature does and how it benefits users..."
                                onChange={handleChange}
                            />
                        </div>

                        <div className="addfeature-input-field addfeature-rtl-field">
                            <label>Feature Name AR</label>
                            <input 
                                type="text" 
                                name="nameAr"
                                placeholder="على سبيل المثال، توقعات الصحة الذكية"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="addfeature-input-field addfeature-rtl-field">
                            <label>Category AR</label>
                            <input type="text" name="categoryAr" onChange={handleChange} />
                        </div>

                        <div className="addfeature-input-field addfeature-rtl-field">
                            <label>Description AR</label>
                            <textarea 
                                name="descAr"
                                placeholder="صف ما تفعله هذه الميزة وكيف تعود بالفائدة على المستخدمين..."
                                onChange={handleChange}
                            />
                        </div>
                    </section>

                    <section className="addfeature-form-section-card">
                        <h2 className="addfeature-section-title">Configuration</h2>
                        <div className="addfeature-config-split">
                            <div className="addfeature-input-field">
                                <label>Initial Status</label>
                                <div className="addfeature-status-radio-group">
                                    <label className="addfeature-radio-item">
                                        <input type="radio" name="status" value="enabled" defaultChecked />
                                        <span className="addfeature-dot addfeature-addfeature-dot-enabled"></span> Enabled
                                    </label>
                                    <label className="addfeature-radio-item">
                                        <input type="radio" name="status" value="disabled" />
                                        <span className="addfeature-dot addfeature-addfeature-dot-disabled"></span> Disabled
                                    </label>
                                </div>
                            </div>
                            <div className="addfeature-input-field">
                                <label>Access Level</label>
                                <select name="accessLevel">
                                    <option value="">Select Level</option>
                                    <option value="public">Public</option>
                                    <option value="premium">Premium</option>
                                    <option value="admin">Admin Only</option>
                                </select>
                            </div>
                        </div>

                        <div className="addfeature-input-field">
                            <label>Dependencies (Optional)</label>
                            <div className="addfeature-input-with-btn">
                                <input type="text" placeholder="e.g., Health Questionnaire" />
                                <button className="addfeature-add-input-btn"><Plus size={20} /></button>
                            </div>
                        </div>
                    </section>

                    <section className="addfeature-form-section-card">
                        <h2 className="addfeature-section-title">Meta Tags (Optional)</h2>
                        <div className="addfeature-meta-row">
                            <input type="text" placeholder="Property (e.g., og:image)" />
                            <input type="text" placeholder="Content value" />
                            <button className="addfeature-add-input-btn"><Plus size={20} /></button>
                        </div>
                    </section>
                </div>

                <aside className="addfeature-preview-column">
                    <div className="addfeature-preview-sticky">
                        <div className="addfeature-preview-block">
                            <h3 className="addfeature-preview-label">Preview</h3>
                            <div className="addfeature-feature-card-mock">
                                <div className="addfeature-mock-top">
                                    <div className="addfeature-mock-icon"><Zap size={20} fill="#fff" /></div>
                                    <div className="addfeature-mock-switch"></div>
                                </div>
                                <h4 className="addfeature-mock-title">{formData.nameEn || 'Feature Name'}</h4>
                                <div className="addfeature-mock-bottom">
                                    <span className="mock-cat">{formData.categoryEn || 'Category'}</span>
                                    <span className="mock-users">0 users</span>
                                </div>
                            </div>
                        </div>

                        <div className="addfeature-stats-block">
                            <h3 className="addfeature-preview-label">Feature Stats</h3>
                            <div className="addfeature-stat-row">
                                <Users size={16} /> <span>Users</span> <strong>0</strong>
                            </div>
                            <div className="addfeature-stat-row">
                                <Eye size={16} /> <span>Views</span> <strong>0</strong>
                            </div>
                            <div className="addfeature-stat-row">
                                <BarChart3 size={16} /> <span>Engagement</span> <strong>0%</strong>
                            </div>
                        </div>

                        <div className="addfeature-action-stack">
                            <button className="addfeature-submit-btn">
                                <Save size={18} /> Create Feature
                            </button>
                            <button className="addfeature-cancel-btn" onClick={() => navigate(-1)}>
                                <X size={18} /> Cancel
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default AddFeature;