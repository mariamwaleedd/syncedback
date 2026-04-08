import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, Filter, Plus, Search, Eye, Users, 
    TrendingUp, MousePointer2, Mail, MoreVertical, Check, Trash2, Archive, AlertCircle, X
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
                        <h3>Are you sure?</h3>
                        <p>Do you really want to {confirmModal.action} this {confirmModal.category}? This action might be permanent.</p>
                        <div className="confirm-modal-btns">
                            <button className="cancel-confirm" onClick={() => setConfirmModal({ show: false })}>Cancel</button>
                            <button className="execute-confirm" onClick={executeAction}>Confirm {confirmModal.action}</button>
                        </div>
                    </div>
                </div>
            )}

            <header className="messages-msg-header">
                <div className="messages-messages-msg-header-left">
                    <button className="messages-msg-back-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={20} />
                    </button>
                    <div className="messages-msg-titles">
                        <h1>Management Center</h1>
                        <p>Handle your website reviews and inquiries</p>
                    </div>
                </div>
            </header>

            <div className="messages-msg-stats-grid">
                <div className="messages-msg-stat-card">
                    <div className="messages-msg-icon-box blue"><Users size={20} /></div>
                    <h3>Pending Reviews</h3>
                    <div className="messages-msg-stat-val">{pendingReviews.length}</div>
                </div>
                <div className="messages-msg-stat-card">
                    <div className="messages-msg-icon-box light-blue"><Mail size={20} /></div>
                    <h3>Inbox Messages</h3>
                    <div className="messages-msg-stat-val">{contactMessages.filter(m => m.status_en !== 'Archived').length}</div>
                </div>
            </div>

            <section className="messages-inbox-container review-section-box">
                <div className="messages-inbox-header-row">
                    <h2 className="section-title pending-title">Pending Reviews</h2>
                </div>
                <div className="messages-messages-inbox-table-wrapper">
                    <table className="messages-inbox-table">
                        <thead>
                            <tr>
                                <th>Sender</th>
                                <th>Role</th>
                                <th>Content</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingReviews.length === 0 ? (
                                <tr><td colSpan="4" className="empty-row">No reviews waiting</td></tr>
                            ) : (
                                pendingReviews.map((review) => (
                                    <tr key={review.id} onClick={() => goToDetails(review, true)}>
                                        <td>{review.name_en}</td>
                                        <td>{review.role_en}</td>
                                        <td className="msg-subject">{review.content_en?.substring(0, 40)}...</td>
                                        <td>
                                            <div className="action-btn-group">
                                                <button className="btn-approve" onClick={(e) => triggerConfirm(e, review.id, 'review', 'approve')}><Check size={16} /></button>
                                                <button className="btn-delete" onClick={(e) => triggerConfirm(e, review.id, 'review', 'delete')}><Trash2 size={16} /></button>
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
                <div className="messages-inbox-header-row">
                    <h2 className="section-title live-title">Website Messages</h2>
                </div>
                <div className="messages-messages-inbox-table-wrapper">
                    <table className="messages-inbox-table">
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Sender</th>
                                <th>Subject</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactMessages.map((msg) => (
                                <tr key={msg.id} onClick={() => goToDetails(msg, false, true)}>
                                    <td><span className={`messages-status-badge ${msg.status_en?.toLowerCase()}`}>{msg.status_en}</span></td>
                                    <td>{msg.sender_name_en}</td>
                                    <td className="msg-subject">{msg.subject_en}</td>
                                    <td>{new Date(msg.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <div className="action-btn-group">
                                            <button className="btn-archive" onClick={(e) => triggerConfirm(e, msg.id, 'message', 'archive')}><Archive size={16} /></button>
                                            <button className="btn-delete" onClick={(e) => triggerConfirm(e, msg.id, 'message', 'delete')}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="messages-inbox-container review-section-box">
                <div className="messages-inbox-header-row">
                    <h2 className="section-title live-title">Live Website Reviews</h2>
                </div>
                <div className="messages-messages-inbox-table-wrapper">
                    <table className="messages-inbox-table">
                        <thead>
                            <tr>
                                <th>Sender</th>
                                <th>Role</th>
                                <th>Content</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {approvedReviews.map((review) => (
                                <tr key={review.id} onClick={() => goToDetails(review, true)}>
                                    <td>{review.name_en}</td>
                                    <td>{review.role_en}</td>
                                    <td className="msg-subject">{review.content_en?.substring(0, 40)}...</td>
                                    <td>
                                        <div className="action-btn-group">
                                            <button className="btn-archive" onClick={(e) => triggerConfirm(e, review.id, 'review', 'archive')}><Archive size={16} /></button>
                                            <button className="btn-delete" onClick={(e) => triggerConfirm(e, review.id, 'review', 'delete')}><Trash2 size={16} /></button>
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