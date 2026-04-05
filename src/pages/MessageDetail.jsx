import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Reply, Forward, Archive, Trash2, Mail, Phone, 
    Building2, Globe, Calendar, Info, Tag, Users, 
    Paperclip, Download, FileText, FileSpreadsheet, Image as ImageIcon, ArrowLeft
} from 'lucide-react';
import './MessageDetail.css';

const MessageDetail = ({ isCollapsed }) => {
    const navigate = useNavigate();

    return (
        <div className={`message-detail-page ${isCollapsed ? 'is-collapsed' : ''}`}>
            <div className="action-toolbar">
                <button className="tool-btn" onClick={() => navigate(-1)}><ArrowLeft size={18} /> Back</button>
                <button className="tool-btn"><Reply size={18} /> Reply</button>
                <button className="tool-btn"><Forward size={18} /> Forward</button>
                <button className="tool-btn"><Archive size={18} /> Archive</button>
                <button className="tool-btn delete"><Trash2 size={18} /> Delete</button>
            </div>

            <section className="detail-card sender-info-card">
                <h2 className="detail-section-title">Sender Information</h2>
                <div className="sender-profile">
                    <h3>Sarah Johnson</h3>
                    <p className="company-text">TechCorp Solutions</p>
                </div>
                <div className="info-grid">
                    <div className="info-item">
                        <Mail size={16} /> <span>sarah.johnson@techcorp.com</span>
                    </div>
                    <div className="info-item">
                        <Phone size={16} /> <span>012 758 43440</span>
                    </div>
                    <div className="info-item">
                        <Building2 size={16} /> <span>TechCorp Solutions</span>
                    </div>
                    <div className="info-item">
                        <Globe size={16} /> <span>www.techcorp.com</span>
                    </div>
                </div>
            </section>

            <div className="dual-info-row">
                <section className="detail-card">
                    <div className="card-flex-head">
                        <div className="icon-wrap-circle"><Calendar size={18} /></div>
                        <div className="txt-wrap">
                            <label>Date & Time</label>
                            <p>Tuesday, November 25, 2025</p>
                            <p className="sub">at 9:30 AM</p>
                        </div>
                    </div>
                </section>
                <section className="detail-card">
                    <div className="card-flex-head">
                        <div className="icon-wrap-circle"><Info size={18} /></div>
                        <div className="txt-wrap">
                            <label>Priority Level</label>
                            <span className="priority-badge high">High Priority</span>
                        </div>
                    </div>
                </section>
            </div>

            <section className="detail-card label-section">
                <div className="card-flex-head">
                    <Tag size={18} />
                    <div className="label-content">
                        <label>Labels & Tags</label>
                        <div className="pill-group">
                            <span className="pill">Important</span>
                            <span className="pill">Project</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="detail-card cc-section">
                <div className="card-flex-head">
                    <Users size={18} />
                    <div className="cc-content">
                        <label>CC Recipients</label>
                        <p>john.doe@techcorp.com</p>
                        <p>mike.smith@techcorp.com</p>
                    </div>
                </div>
            </section>

            <section className="detail-card message-body-card">
                <h2 className="detail-section-title">Message Content</h2>
                <div className="message-text">
                    <p>Hi there,</p>
                    <p>I hope this email finds you well. I wanted to follow up on the Q4 project proposal we discussed last week. I've attached the updated documents with the revisions we talked about.</p>
                    <p>The main changes include:</p>
                    <ul>
                        <li>Updated timeline for Phase 2</li>
                        <li>Revised budget allocation</li>
                        <li>New team member assignments</li>
                    </ul>
                    <p>Please review at your earliest convenience and let me know if you have any questions or concerns.</p>
                    <p>Best regards,<br/>Sarah</p>
                </div>
            </section>

            <section className="detail-card attachments-card">
                <div className="attach-head">
                    <Paperclip size={20} />
                    <h2 className="detail-section-title">Attachments (3)</h2>
                </div>
                <div className="attachments-grid">
                    <div className="file-card">
                        <div className="file-icon pdf"><FileText size={20} /></div>
                        <div className="file-info">
                            <strong>Q4_Proposal_Final.pdf</strong>
                            <span>2.4 MB</span>
                        </div>
                        <button className="download-btn"><Download size={16} /></button>
                    </div>
                    <div className="file-card">
                        <div className="file-icon excel"><FileSpreadsheet size={20} /></div>
                        <div className="file-info">
                            <strong>Budget_Breakdown.xlsx</strong>
                            <span>1.1 MB</span>
                        </div>
                        <button className="download-btn"><Download size={16} /></button>
                    </div>
                    <div className="file-card">
                        <div className="file-icon img"><ImageIcon size={20} /></div>
                        <div className="file-info">
                            <strong>Timeline_Chart.png</strong>
                            <span>856 KB</span>
                        </div>
                        <button className="download-btn"><Download size={16} /></button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MessageDetail;