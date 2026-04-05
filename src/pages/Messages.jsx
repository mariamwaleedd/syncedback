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
            <header className="msg-header">
                <div className="msg-header-left">
                    <button className="msg-back-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={20} />
                    </button>
                    <div className="msg-titles">
                        <h1>Messages Inbox</h1>
                        <p>Manage contact form submissions</p>
                    </div>
                </div>
                <div className="msg-header-actions">
                    <button className="msg-filter-btn"><Filter size={18} /> Filter</button>
                </div>
            </header>

            <div className="msg-search-bar">
                <Search className="search-icon" size={18} />
                <input type="text" placeholder="Search messages..." />
            </div>

            <div className="msg-stats-grid">
                <div className="msg-stat-card">
                    <div className="msg-icon-box blue"><Eye size={20} /></div>
                    <h3>Total Messages</h3>
                    <div className="msg-stat-val">5,500</div>
                </div>
                <div className="msg-stat-card">
                    <div className="msg-icon-box light-blue"><Users size={20} /></div>
                    <h3>Unread</h3>
                    <div className="msg-stat-val">1,200</div>
                </div>
                <div className="msg-stat-card">
                    <div className="msg-icon-box blue-grad"><TrendingUp size={20} /></div>
                    <h3>Emails</h3>
                    <div className="msg-stat-val">200</div>
                </div>
                <div className="msg-stat-card">
                    <div className="msg-icon-box sparkle"><MousePointer2 size={20} /></div>
                    <h3>Contact Forms</h3>
                    <div className="msg-stat-val">500</div>
                </div>
            </div>

            <section className="inbox-container">
                <div className="inbox-header-row">
                    <h2>Inbox</h2>
                    <button className="compose-btn"><Mail size={18} /> Compose Email <Plus size={14} /></button>
                </div>
                <div className="inbox-table-wrapper">
                    <table className="inbox-table">
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
                                <tr key={idx}>
                                    <td>
                                        <span className={`status-badge ${row.status.toLowerCase()}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="sender-name">{row.sender}</td>
                                    <td className="sender-email">{row.email}</td>
                                    <td className="msg-subject">{row.subject}</td>
                                    <td className="msg-date">{row.date}</td>
                                    <td><button className="action-dots"><MoreVertical size={16}/></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="compose-section">
                <div className="compose-header">
                    <h2>Compose Email</h2>
                    <X size={20} className="close-compose" />
                </div>
                <div className="compose-form">
                    <div className="compose-field">
                        <label>To</label>
                        <input type="text" defaultValue="youremail@gmail.com" />
                    </div>
                    <div className="compose-field">
                        <label>Subject</label>
                        <input type="text" placeholder="Write Subject" />
                    </div>
                    <RichTextToolbar />
                    <div className="compose-field">
                        <label>Message</label>
                        <textarea placeholder="Write you message"></textarea>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Messages;