import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, Filter, Plus, Search, Eye, Users, 
    TrendingUp, MousePointer2, Mail, MoreVertical, Check, Trash2, Archive, AlertCircle, X, RotateCcw
} from 'lucide-react';
import { supabase } from '../Supabase';
import './Messages.css';

const Messages = ({ isCollapsed }) => {
    const navigate = useNavigate();
    const [pendingReviews, setPendingReviews] = useState([]);
    const [approvedReviews, setApprovedReviews] = useState([]);
    const [contactMessages, setContactMessages] = useState([]);
    const [notification, setNotification] = useState({ show: false, message: "", type: "" });
    const [confirmModal, setConfirmModal] = useState({ show: false, id: null, category: null, action: null });
    const [isRefreshing, setIsRefreshing] = useState(false);

    const showNotify = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
    };

    const fetchData = async () => {
        const { data: pending } = await supabase.from('testimonials').select('*').eq('type', 'pending');
        const { data: approved } = await supabase.from('testimonials').select('*').eq('type', 'card');
        const { data: contacts } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
        
        setPendingReviews(pending || []);
        setApprovedReviews(approved || []);
        setContactMessages(contacts || []);
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await fetchData();
        setTimeout(() => setIsRefreshing(false), 600);
        showNotify("Inbox updated", "success");
    };

    useEffect(() => {
        fetchData();
    }, []);

    const triggerConfirm = (e, id, category, action) => {
        e.stopPropagation();
        setConfirmModal({ show: true, id, category, action });
    };

    const executeAction = async () => {
        const { id, category, action } = confirmModal;
        let table = category === 'review' ? 'testimonials' : 'contact_messages';
        let error;

        if (action === 'delete') {
            const result = await supabase.from(table).delete().eq('id', id);
            error = result.error;
        } else if (action === 'archive') {
            const updateData = category === 'review' 
                ? { type: 'archive' } 
                : { status_en: 'Archived', status_ar: 'مؤرشف' };
            const result = await supabase.from(table).update(updateData).eq('id', id);
            error = result.error;
        } else if (action === 'approve') {
            const result = await supabase.from('testimonials').update({ type: 'card' }).eq('id', id);
            error = result.error;
        }

        if (!error) {
            showNotify(`${category === 'review' ? 'Review' : 'Message'} ${action}d successfully`, 'success');
            fetchData();
        } else {
            showNotify("Action failed", "error");
        }
        setConfirmModal({ show: false, id: null, category: null, action: null });
    };

    const goToDetails = (item, isReview = false, isContact = false) => {
        navigate(`/messages/${item.id}`, { state: { data: item, isReview, isContact } });
    };

    return (
        <div className={`messages-page ${isCollapsed ? 'is-collapsed' : ''}`}>
            
            {notification.show && (
                <div className={`action-notification ${notification.type}`}>
                    {notification.type === 'success' ? <Check size={18}/> : <AlertCircle size={18}/>}
                    {notification.message}
                    <button onClick={() => setNotification({ ...notification, show: false })}><X size={14}/></button>
                </div>
            )}

            {confirmModal.show && (
                <div className="confirm-modal-overlay">
                    <div className="confirm-modal-content">
                        <AlertCircle size={40} color="#f87171" />
                        <h3>Confirm Action</h3>
                        <p>Are you sure you want to {confirmModal.action} this {confirmModal.category}?</p>
                        <div className="confirm-modal-btns">
                            <button className="cancel-confirm" onClick={() => setConfirmModal({ show: false })}>Cancel</button>
                            <button className="execute-confirm" onClick={executeAction}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}

            <header className="messages-msg-header">
                <div className="messages-msg-titles">
                    <h1>Management Center</h1>
                    <p>Manage all reviews and contact form submissions</p>
                </div>
                <button 
                    className={`messages-refresh-btn ${isRefreshing ? 'spinning' : ''}`} 
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                >
                    <RotateCcw size={20} />
                </button>
            </header>

            <div className="messages-msg-stats-grid">
                <div className="messages-msg-stat-card">
                    <div className="messages-msg-icon-box blue"><Users size={20} /></div>
                    <h3>Pending Reviews</h3>
                    <div className="messages-msg-stat-val">{pendingReviews.length}</div>
                </div>
                <div className="messages-msg-stat-card">
                    <div className="messages-msg-icon-box light-blue"><Mail size={20} /></div>
                    <h3>Contact Messages</h3>
                    <div className="messages-msg-stat-val">{contactMessages.length}</div>
                </div>
                <div className="messages-msg-stat-card">
                    <div className="messages-msg-icon-box messages-blue-grad"><Check size={20} /></div>
                    <h3>Live Reviews</h3>
                    <div className="messages-msg-stat-val">{approvedReviews.length}</div>
                </div>
            </div>

            <section className="messages-inbox-container review-section-box">
                <h2 className="section-title pending-title">Pending Reviews (Approval Required)</h2>
                <div className="messages-inbox-table-wrapper">
                    <table className="messages-inbox-table">
                        <thead>
                            <tr><th>Sender</th><th>Role</th><th>Content</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {pendingReviews.length === 0 ? (
                                <tr><td colSpan="4" className="empty-row">No pending reviews found.</td></tr>
                            ) : (
                                pendingReviews.map((r) => (
                                    <tr key={r.id} onClick={() => goToDetails(r, true)}>
                                        <td>{r.name_en}</td>
                                        <td>{r.role_en}</td>
                                        <td>{r.content_en?.substring(0, 40)}...</td>
                                        <td>
                                            <div className="action-btn-group">
                                                <button className="btn-approve" onClick={(e) => triggerConfirm(e, r.id, 'review', 'approve')}><Check size={16} /></button>
                                                <button className="btn-delete" onClick={(e) => triggerConfirm(e, r.id, 'review', 'delete')}><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="messages-inbox-container review-section-box">
                <h2 className="section-title live-title">Website Contact Inquiries</h2>
                <div className="messages-inbox-table-wrapper">
                    <table className="messages-inbox-table">
                        <thead>
                            <tr><th>Status</th><th>Sender</th><th>Subject</th><th>Date</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {contactMessages.length === 0 ? (
                                <tr><td colSpan="5" className="empty-row">No contact messages found.</td></tr>
                            ) : (
                                contactMessages.map((msg) => (
                                    <tr key={msg.id} onClick={() => goToDetails(msg, false, true)}>
                                        <td><span className={`messages-status-badge ${(msg.status_en || 'New').toLowerCase()}`}>{msg.status_en || 'New'}</span></td>
                                        <td>{msg.sender_name_en}</td>
                                        <td>{msg.subject_en}</td>
                                        <td>{new Date(msg.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <div className="action-btn-group">
                                                <button className="btn-archive" onClick={(e) => triggerConfirm(e, msg.id, 'message', 'archive')}><Archive size={16} /></button>
                                                <button className="btn-delete" onClick={(e) => triggerConfirm(e, msg.id, 'message', 'delete')}><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="messages-inbox-container review-section-box">
                <h2 className="section-title live-title">Approved Live Reviews</h2>
                <div className="messages-inbox-table-wrapper">
                    <table className="messages-inbox-table">
                        <thead>
                            <tr><th>Sender</th><th>Role</th><th>Content</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {approvedReviews.map((r) => (
                                <tr key={r.id} onClick={() => goToDetails(r, true)}>
                                    <td>{r.name_en}</td>
                                    <td>{r.role_en}</td>
                                    <td>{r.content_en?.substring(0, 40)}...</td>
                                    <td>
                                        <div className="action-btn-group">
                                            <button className="btn-archive" onClick={(e) => triggerConfirm(e, r.id, 'review', 'archive')}><Archive size={16} /></button>
                                            <button className="btn-delete" onClick={(e) => triggerConfirm(e, r.id, 'review', 'delete')}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
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