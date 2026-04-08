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
    const [searchTerm, setSearchTerm] = useState("");
    
    const [notification, setNotification] = useState({ show: false, message: "", type: "" });

    const showNotify = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
    };

    const fetchAllReviews = async () => {
        const { data: pending } = await supabase.from('testimonials').select('*').eq('type', 'pending');
        const { data: approved } = await supabase.from('testimonials').select('*').eq('type', 'card');
        setPendingReviews(pending || []);
        setApprovedReviews(approved || []);
    };

    useEffect(() => {
        fetchAllReviews();
    }, []);

    const handleAction = async (id, newType, actionName) => {
        let error;
        if (newType === 'delete') {
            const result = await supabase.from('testimonials').delete().eq('id', id);
            error = result.error;
        } else {
            const result = await supabase.from('testimonials').update({ type: newType }).eq('id', id);
            error = result.error;
        }

        if (!error) {
            showNotify(`Review ${actionName} Successfully!`, newType === 'card' ? 'success' : 'warning');
            fetchAllReviews();
        } else {
            showNotify("Error performing action", "error");
        }
    };

    const goToDetails = (item, isReview = false) => {
        navigate(`/messages/${item.id}`, { state: { data: item, isReview } });
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

            <header className="messages-msg-header">
                <div className="messages-messages-msg-header-left">
                    <button className="messages-msg-back-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={20} />
                    </button>
                    <div className="messages-msg-titles">
                        <h1>Reviews & Messages</h1>
                        <p>Manage your website feedback</p>
                    </div>
                </div>
            </header>

            <div className="messages-msg-stats-grid">
                <div className="messages-msg-stat-card">
                    <div className="messages-msg-icon-box blue"><Users size={20} /></div>
                    <h3>Pending</h3>
                    <div className="messages-msg-stat-val">{pendingReviews.length}</div>
                </div>
                <div className="messages-msg-stat-card">
                    <div className="messages-msg-icon-box messages-blue-grad"><Check size={20} /></div>
                    <h3>Live on Site</h3>
                    <div className="messages-msg-stat-val">{approvedReviews.length}</div>
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
                                <tr><td colSpan="4" className="empty-row">No reviews waiting for approval</td></tr>
                            ) : (
                                pendingReviews.map((review) => (
                                    <tr key={review.id} onClick={() => goToDetails(review, true)}>
                                        <td>{review.name_en}</td>
                                        <td>{review.role_en}</td>
                                        <td className="msg-subject">{review.content_en?.substring(0, 40)}...</td>
                                        <td>
                                            <div className="action-btn-group">
                                                <button title="Approve" className="btn-approve" onClick={(e) => { e.stopPropagation(); handleAction(review.id, 'card', 'Accepted'); }}>
                                                    <Check size={16} />
                                                </button>
                                                <button title="Decline" className="btn-delete" onClick={(e) => { e.stopPropagation(); handleAction(review.id, 'delete', 'Declined'); }}>
                                                    <Trash2 size={16} />
                                                </button>
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
                                            <button title="Archive (Hide from site)" className="btn-archive" onClick={(e) => { e.stopPropagation(); handleAction(review.id, 'archive', 'Archived'); }}>
                                                <Archive size={16} />
                                            </button>
                                            <button title="Permanent Delete" className="btn-delete" onClick={(e) => { e.stopPropagation(); handleAction(review.id, 'delete', 'Deleted Permanently'); }}>
                                                <Trash2 size={16} />
                                            </button>
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