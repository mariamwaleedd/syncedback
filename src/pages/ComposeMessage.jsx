import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Paperclip, X } from 'lucide-react';
import RichTextToolbar from '../common/RichTextToolbar';
import './ComposeMessage.css';

const ComposeMessage = ({ isCollapsed }) => {
    const navigate = useNavigate();

    return (
        <div className={`compose-message-page ${isCollapsed ? 'is-collapsed' : ''}`}>
            <header className="compose-page-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} />
                </button>
                <h1>Compose Message</h1>
            </header>

            <div className="compose-main-card">
                <div className="compose-form-section">
                    <div className="form-row">
                        <label>To:</label>
                        <input type="email" placeholder="Recipient's email address" />
                    </div>
                    <div className="form-row">
                        <label>Cc/Bcc:</label>
                        <input type="text" placeholder="Additional recipients" />
                    </div>
                    <div className="form-row">
                        <label>Subject:</label>
                        <input type="text" placeholder="Message subject" />
                    </div>
                    
                    <div className="editor-container">
                        <RichTextToolbar />
                        <textarea className="message-textarea" placeholder="Type your message here..."></textarea>
                    </div>

                    <div className="compose-actions">
                        <button className="action-btn discard" onClick={() => navigate(-1)}>
                            <X size={18} /> Discard
                        </button>
                        <div className="right-actions">
                            <button className="action-btn attach">
                                <Paperclip size={18} /> Attach
                            </button>
                            <button className="action-btn send">
                                <Send size={18} /> Send Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComposeMessage;
