import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, Plus, Save, Trash2, Edit2, 
    Check, X, AlertCircle, Info, Bell, 
    Search, Mail, Lock, User, Globe, 
    MoreVertical, Download, ExternalLink,
    ChevronRight, ChevronDown, Monitor, Smartphone, Tablet
} from 'lucide-react';
import './UIElements.css';

const UIElements = ({ isCollapsed }) => {
    const navigate = useNavigate();
    const [toggleStates, setToggleStates] = useState({
        switch1: true,
        switch2: false,
        check1: true,
        check2: false
    });

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
                        <h1>UI Elements</h1>
                        <p>Reusable components and design system patterns</p>
                    </div>
                </div>
            </header>

            <div className="ui-grid">
                <section className="ui-card-group">
                    <h2 className="group-title">Buttons</h2>
                    <div className="elements-stack horizontal">
                        <button className="btn-solid-primary"><Plus size={18} /> Primary</button>
                        <button className="btn-solid-secondary">Secondary</button>
                        <button className="btn-outline">Outline</button>
                        <button className="btn-danger"><Trash2 size={18} /> Danger</button>
                        <button className="btn-icon-square"><Edit2 size={18} /></button>
                    </div>
                    <div className="elements-stack horizontal mt-20">
                        <button className="btn-glass">Glass Button</button>
                        <button className="btn-link">Text Link <ExternalLink size={14} /></button>
                    </div>
                </section>

                <section className="ui-card-group">
                    <h2 className="group-title">Badges & Status</h2>
                    <div className="elements-stack horizontal">
                        <span className="badge-ui success">Active</span>
                        <span className="badge-ui warning">Pending</span>
                        <span className="badge-ui danger">Rejected</span>
                        <span className="badge-ui info">Processing</span>
                        <span className="badge-ui default">Draft</span>
                    </div>
                    <div className="elements-stack horizontal mt-20">
                        <div className="status-indicator active"><span className="dot"></span> Online</div>
                        <div className="status-indicator inactive"><span className="dot"></span> Offline</div>
                        <div className="status-indicator busy"><span className="dot"></span> Busy</div>
                    </div>
                </section>

                <section className="ui-card-group">
                    <h2 className="group-title">Form Controls</h2>
                    <div className="elements-stack">
                        <div className="input-wrap-ui">
                            <label>Standard Input</label>
                            <input type="text" placeholder="Enter text..." />
                        </div>
                        <div className="input-wrap-ui">
                            <label>Input with Icon</label>
                            <div className="icon-field">
                                <Search size={18} />
                                <input type="text" placeholder="Search resources..." />
                            </div>
                        </div>
                        <div className="input-wrap-ui">
                            <label>Select Menu</label>
                            <select className="select-ui">
                                <option>Option One</option>
                                <option>Option Two</option>
                                <option>Option Three</option>
                            </select>
                        </div>
                    </div>
                </section>

                <section className="ui-card-group">
                    <h2 className="group-title">Toggles & Checkboxes</h2>
                    <div className="elements-stack horizontal space-between align-center mb-20">
                        <span>Push Notifications</span>
                        <div 
                            className={`ui-switch ${toggleStates.switch1 ? 'active' : ''}`}
                            onClick={() => toggle('switch1')}
                        >
                            <div className="handle"></div>
                        </div>
                    </div>
                    <div className="elements-stack horizontal space-between align-center mb-20">
                        <span>Maintenance Mode</span>
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
                            Accept Terms
                        </label>
                        <label className="checkbox-ui">
                            <input type="checkbox" checked={toggleStates.check2} onChange={() => toggle('check2')} />
                            <span className="checkmark"></span>
                            Newsletter
                        </label>
                    </div>
                </section>

                <section className="ui-card-group wide">
                    <h2 className="group-title">Progress Indicators</h2>
                    <div className="elements-stack">
                        <div className="progress-item">
                            <div className="progress-label"><span>System Storage</span> <span>75%</span></div>
                            <div className="progress-bg"><div className="progress-fill blue" style={{width: '75%'}}></div></div>
                        </div>
                        <div className="progress-item">
                            <div className="progress-label"><span>Upload Status</span> <span>42%</span></div>
                            <div className="progress-bg"><div className="progress-fill green" style={{width: '42%'}}></div></div>
                        </div>
                        <div className="progress-item">
                            <div className="progress-label"><span>CPU Usage</span> <span>90%</span></div>
                            <div className="progress-bg"><div className="progress-fill danger" style={{width: '90%'}}></div></div>
                        </div>
                    </div>
                </section>

                <section className="ui-card-group">
                    <h2 className="group-title">Alerts & Toasts</h2>
                    <div className="elements-stack">
                        <div className="alert-ui success">
                            <Check size={18} />
                            <span>Changes saved successfully!</span>
                        </div>
                        <div className="alert-ui info">
                            <Info size={18} />
                            <span>New system update available.</span>
                        </div>
                        <div className="alert-ui danger">
                            <AlertCircle size={18} />
                            <span>Error: Invalid credentials provided.</span>
                        </div>
                    </div>
                </section>

                <section className="ui-card-group">
                    <h2 className="group-title">Avatars & Icons</h2>
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