import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Reply, Forward, Archive, Trash2, Mail, Phone,
    Building2, Globe, Calendar, Info, Tag, Users,
    Paperclip, Download, FileText, FileSpreadsheet, Image as ImageIcon
} from 'lucide-react';
import './MessageDetail.css';

const MessageDetail = ({ isCollapsed }) => {
    const navigate = useNavigate();

    return (
        <div className={`messagedetail-message-detail-page ${isCollapsed ? 'is-collapsed' : ''}`}>
            <div className="messagedetail-action-toolbar">
                <button className="messagedetail-tool-btn"><Reply size={18} /> Reply</button>
                <button className="messagedetail-tool-btn"><Forward size={18} /> Forward</button>
                <button className="messagedetail-tool-btn"><Archive size={18} /> Archive</button>
                <button className="messagedetail-tool-btn messagedetail-delete"><Trash2 size={18} /> Delete</button>
            </div>

            <section className="messagedetail-detail-card messagedetail-sender-info-card">
                <h2 className="messagedetail-detail-section-title">Sender Information</h2>
                <div className="messagedetail-sender-profile">
                    <h3>Sarah Johnson</h3>
                    <p className="messagedetail-company-text">TechCorp Solutions</p>
                </div>
                <div className="messagedetail-info-grid">
                    <div className="messagedetail-info-item">
                        <Mail size={16} /> <span>sarah.johnson@techcorp.com</span>
                    </div>
                    <div className="messagedetail-info-item">
                        <Phone size={16} /> <span>012 758 43440</span>
                    </div>
                    <div className="messagedetail-info-item">
                        <Building2 size={16} /> <span>TechCorp Solutions</span>
                    </div>
                    <div className="messagedetail-info-item">
                        <Globe size={16} /> <span>www.techcorp.com</span>
                    </div>
                </div>
            </section>

            <div className="messagedetail-dual-info-row">
                <section className="messagedetail-detail-card">
                    <div className="messagedetail-card-flex-head">
                        <div className="messagedetail-icon-wrap-circle"><Calendar size={18} /></div>
                        <div className="messagedetail-txt-wrap">
                            <label>Date & Time</label>
                            <p>Tuesday, November 25, 2025</p>
                            <p className="messagedetail-sub">at 9:30 AM</p>
                        </div>
                    </div>
                </section>
                <section className="messagedetail-detail-card">
                    <div className="messagedetail-card-flex-head">
                        <div className="messagedetail-icon-wrap-circle"><Info size={18} /></div>
                        <div className="messagedetail-txt-wrap">
                            <label>Priority Level</label>
                            <span className="messagedetail-priority-badge high">High Priority</span>
                        </div>
                    </div>
                </section>
            </div>

            <section className="messagedetail-detail-card messagedetail-label-section">
                <div className="messagedetail-card-flex-head">
                    <Tag size={18} />
                    <div className="messagedetail-label-content">
                        <label>Labels & Tags</label>
                        <div className="messagedetail-pill-group">
                            <span className="messagedetail-pill">Important</span>
                            <span className="messagedetail-pill">Project</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="messagedetail-detail-card messagedetail-cc-section">
                <div className="messagedetail-card-flex-head">
                    <Users size={18} />
                    <div className="messagedetail-cc-content">
                        <label>CC Recipients</label>
                        <p>john.doe@techcorp.com</p>
                        <p>mike.smith@techcorp.com</p>
                    </div>
                </div>
            </section>

            <section className="messagedetail-detail-card messagedetail-message-body-card">
                <h2 className="messagedetail-detail-section-title">Message Content</h2>
                <div className="messagedetail-message-text">
                    <p>Hi there,</p>
                    <p>I hope this email finds you well. I wanted to follow up on the Q4 project proposal we discussed last week. I've attached the updated documents with the revisions we talked about.</p>
                    <p>The main changes include:</p>
                    <ul>
                        <li>Updated timeline for Phase 2</li>
                        <li>Revised budget allocation</li>
                        <li>New team member assignments</li>
                    </ul>
                    <p>Please review at your earliest convenience and let me know if you have any questions or concerns.</p>
                    <p>Best regards,<br />Sarah</p>
                </div>
            </section>

            <section className="messagedetail-detail-card messagedetail-attachments-card">
                <div className="messagedetail-attach-head">
                    <Paperclip size={20} />
                    <h2 className="messagedetail-detail-section-title">Attachments (3)</h2>
                </div>
                <div className="messagedetail-attachments-grid">
                    <div className="messagedetail-file-card">
                        <div className="messagedetail-file-icon pdf"><FileText size={20} /></div>
                        <div className="messagedetail-file-info">
                            <strong>Q4_Proposal_Final.pdf</strong>
                            <span>2.4 MB</span>
                        </div>
                        <button className="messagedetail-download-btn"><Download size={16} /></button>
                    </div>
                    <div className="messagedetail-file-card">
                        <div className="messagedetail-file-icon excel"><FileSpreadsheet size={20} /></div>
                        <div className="messagedetail-file-info">
                            <strong>Budget_Breakdown.xlsx</strong>
                            <span>1.1 MB</span>
                        </div>
                        <button className="messagedetail-download-btn"><Download size={16} /></button>
                    </div>
                    <div className="messagedetail-file-card">
                        <div className="messagedetail-file-icon img"><ImageIcon size={20} /></div>
                        <div className="messagedetail-file-info">
                            <strong>Timeline_Chart.png</strong>
                            <span>856 KB</span>
                        </div>
                        <button className="messagedetail-download-btn"><Download size={16} /></button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MessageDetail;