import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, Filter, Plus, Search, Eye, Users, 
    TrendingUp, MousePointer2, Mail, MoreVertical, X
} from 'lucide-react';
import './Messages.css';
import RichTextToolbar from '../common/RichTextToolbar';

const inboxData = [
    { status: 'Read', sender: 'Sarah Johnson', email: 'sarah.johnson@email.com', subject: 'Website Design Project Inquiry', date: 'Nov 22, 2025' },
    { status: 'New', sender: 'Michael Chen', email: 'm.chen@techcorp.com', subject: 'Collaboration Opportunity', date: 'Nov 21, 2025' },
    { status: 'Read', sender: 'Emma Rodriguez', email: 'emma.r@designstudio.com', subject: 'Speaking Engagement Request', date: 'Nov 20, 2025' },
    { status: 'Read', sender: 'David Park', email: 'david.park@startup.io', subject: 'Portfolio Review Request', date: 'Nov 19, 2025' },
    { status: 'Read', sender: 'Lisa Thompson', email: 'lisa.thompson@agency.com', subject: 'Job Opportunity - Senior Designer', date: 'Nov 18, 2025' },
    { status: 'New', sender: 'James Wilson', email: 'james.w@freelance.com', subject: 'Question About Your Services', date: 'Nov 17, 2025' }
];

const Messages = ({ isCollapsed }) => {
    const navigate = useNavigate();

    return (
        <div className={`messages-page ${isCollapsed ? 'is-collapsed' : ''}`}>
            <header className="messages-msg-header">
                <div className="messages-messages-msg-header-left">
                    <button className="messages-msg-back-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={20} />
                    </button>
                    <div className="messages-msg-titles">
                        <h1>Messages Inbox</h1>
                        <p>Manage contact form submissions</p>
                    </div>
                </div>
                <div className="messages-messages-msg-header-actions">
                    <button className="messages-msg-filter-btn"><Filter size={18} /> Filter</button>
                </div>
            </header>

            <div className="messages-msg-search-bar">
                <Search className="messages-search-icon" size={18} />
                <input type="text" placeholder="Search messages..." />
            </div>

            <div className="messages-msg-stats-grid">
                <div className="messages-msg-stat-card">
                    <div className="messages-msg-icon-box blue"><Eye size={20} /></div>
                    <h3>Total Messages</h3>
                    <div className="messages-msg-stat-val">5,500</div>
                </div>
                <div className="messages-msg-stat-card">
                    <div className="messages-msg-icon-box light-blue"><Users size={20} /></div>
                    <h3>Unread</h3>
                    <div className="messages-msg-stat-val">1,200</div>
                </div>
                <div className="messages-msg-stat-card">
                    <div className="messages-msg-icon-box messages-blue-grad"><TrendingUp size={20} /></div>
                    <h3>Emails</h3>
                    <div className="messages-msg-stat-val">200</div>
                </div>
                <div className="messages-msg-stat-card">
                    <div className="messages-msg-icon-box messages-sparkle"><MousePointer2 size={20} /></div>
                    <h3>Contact Forms</h3>
                    <div className="messages-msg-stat-val">500</div>
                </div>
            </div>

            <section className="messages-inbox-container">
                <div className="messages-inbox-header-row">
                    <h2>Inbox</h2>
                    <button className="messages-compose-btn" onClick={() => navigate('/compose-message')}><Mail size={18} /> Compose Email <Plus size={14} /></button>
                </div>
                <div className="messages-messages-inbox-table-wrapper">
                    <table className="messages-inbox-table">
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Sender</th>
                                <th>Email</th>
                                <th>Subject</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inboxData.map((row, idx) => (
                                <tr key={idx} onClick={() => navigate(`/messages/${idx}`)} style={{ cursor: 'pointer' }}>
                                    <td>
                                        <span className={`messages-status-badge ${row.status.toLowerCase()}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="messages-sender-name">{row.sender}</td>
                                    <td className="messages-sender-email">{row.email}</td>
                                    <td className="msg-subject">{row.subject}</td>
                                    <td className="messages-msg-date">{row.date}</td>
                                    <td><button className="messages-action-dots"><MoreVertical size={16}/></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

        </div>
    );
};

export default Messages;