import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Paperclip, X } from 'lucide-react';
import RichTextToolbar from '../common/RichTextToolbar';
import './ComposeMessage.css';

const ComposeMessage = ({ isCollapsed }) => {
    const navigate = useNavigate();

    return (
        <div className={`composemessage-compose-message-page ${isCollapsed ? 'is-collapsed' : ''}`}>
            <header className="composemessage-compose-page-header">
                <button className="composemessage-back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={20} />
                </button>
                <h1>Compose Message</h1>
            </header>

            <div className="composemessage-compose-main-card">
                <div className="composemessage-compose-form-section">
                    <div className="composemessage-form-row">
                        <label>To:</label>
                        <input type="email" placeholder="Recipient's email address" />
                    </div>
                    <div className="composemessage-form-row">
                        <label>Cc/Bcc:</label>
                        <input type="text" placeholder="Additional recipients" />
                    </div>
                    <div className="composemessage-form-row">
                        <label>Subject:</label>
                        <input type="text" placeholder="Message subject" />
                    </div>
                    
                    <div className="composemessage-editor-container">
                        <RichTextToolbar />
                        <textarea className="composemessage-message-textarea" placeholder="Type your message here..."></textarea>
                    </div>

                    <div className="composemessage-compose-actions">
                        <button className="composemessage-action-btn composemessage-discard" onClick={() => navigate(-1)}>
                            <X size={18} /> Discard
                        </button>
                        <div className="composemessage-right-actions">
                            <button className="composemessage-action-btn composemessage-attach">
                                <Paperclip size={18} /> Attach
                            </button>
                            <button className="composemessage-action-btn composemessage-send">
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
