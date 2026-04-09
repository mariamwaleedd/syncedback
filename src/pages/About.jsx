import React from 'react';
import { 
    Mail, 
    ExternalLink, 
    Users, 
    Award, 
    Briefcase, 
    Globe, 
    ShieldCheck, 
    Heart, 
    Sparkles, 
    Share2, 
    UserRound,
    Info,
    CheckCircle,
    AlertCircle,
    X,
    Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './About.css';

const teamMembers = [
    {
        id: 1,
        name: 'Admin User',
        role: 'Founder & CEO',
        image: 'https://ui-avatars.com/api/?name=Admin+User&background=2b7fff&color=fff&size=128',
        bio: 'Visionary behind HealthHub with over 10 years of experience in healthcare technology.',
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        role: 'Product Designer',
        image: 'https://ui-avatars.com/api/?name=Sarah+J&background=d946ef&color=fff&size=128',
        bio: 'Creating seamless user experiences that prioritize patient well-being and accessibility.',
    },
    {
        id: 3,
        name: 'Michael Chen',
        role: 'Lead Developer',
        image: 'https://ui-avatars.com/api/?name=Michael+C&background=10b981&color=fff&size=128',
        bio: 'Full-stack expert focusing on high-performance architecture and secure data management.',
    },
    {
        id: 4,
        name: 'Emma Rodriguez',
        role: 'Medical Advisor',
        image: 'https://ui-avatars.com/api/?name=Emma+R&background=f97316&color=fff&size=128',
        bio: 'Board-certified physician ensuring all digital health features meet clinical standards.',
    }
];

const AboutPage = ({ isCollapsed }) => {
    const navigate = useNavigate();
    const [statusModal, setStatusModal] = React.useState({ isOpen: false, type: 'success', message: '' });

    const handleAction = (message, type = 'success') => {
        setStatusModal({ isOpen: true, type, message });
    };

    return (
        <div className={`about-page-container ${isCollapsed ? 'is-collapsed' : ''}`}>
            <header className="about-hero">
                <div className="profile-mini-card">
                    <div className="profile-main">
                        <div className="profile-img-wrap">
                            <img src="https://ui-avatars.com/api/?name=Health+Hub&background=2b7fff&color=fff&size=200" alt="Platform" />
                            <div className="verified-badge"><ShieldCheck size={20} /></div>
                        </div>
                        <div className="profile-details">
                            <div className="name-row">
                                <h1>HealthHub Platform</h1>
                                <span className="platform-tag">v2.4.0 Official</span>
                            </div>
                            <p className="subtitle">Next-Generation Healthcare Management System</p>
                            <div className="profile-stats-row">
                                <div className="stat"><strong>50k+</strong> <span>Active Users</span></div>
                                <div className="stat"><strong>120+</strong> <span>Hospitals</span></div>
                                <div className="stat"><strong>99.9%</strong> <span>Uptime</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-actions">
                        <button className="btn-follow" onClick={() => handleAction('You are now following HealthHub updates!', 'success')}>Follow Updates</button>
                        <button className="btn-msg" onClick={() => navigate('/messages')}><Mail size={18} /></button>
                    </div>
                </div>
            </header>

            <div className="about-content-wrapper">
                <section className="vision-mission-grid">
                    <div className="vision-card">
                        <div className="icon-box-circle purple"><Sparkles size={24} /></div>
                        <h2>Our Vision</h2>
                        <p>To democratize healthcare access through intuitive technology, making professional medical management available to everyone, everywhere.</p>
                    </div>
                    <div className="vision-card">
                        <div className="icon-box-circle blue"><Heart size={24} /></div>
                        <h2>Our Mission</h2>
                        <p>Building secure, fast, and reliable digital tools for medical professionals and patients to collaborate effectively in a modern environment.</p>
                    </div>
                </section>

                <section className="about-stats-grid">
                    <div className="metric-box">
                        <Users size={20} />
                        <div className="m-info"><h3>12</h3><p>Countries</p></div>
                    </div>
                    <div className="metric-box">
                        <Award size={20} />
                        <div className="m-info"><h3>25</h3><p>Awards</p></div>
                    </div>
                    <div className="metric-box">
                        <Briefcase size={20} />
                        <div className="m-info"><h3>8</h3><p>Years</p></div>
                    </div>
                    <div className="metric-box">
                        <Globe size={20} />
                        <div className="m-info"><h3>24/7</h3><p>Support</p></div>
                    </div>
                </section>

                <section className="team-section">
                    <div className="team-header">
                        <h2>Meet the Team</h2>
                        <p>The talented individuals driving the healthcare revolution.</p>
                    </div>
                    <div className="team-grid">
                        {teamMembers.map(member => (
                            <div key={member.id} className="member-card">
                                <div className="member-top">
                                    <img src={member.image} alt={member.name} />
                                    <div className="member-socials">
                                        <button className="s-btn" onClick={() => handleAction('Sharing profile...') }><Share2 size={14} /></button>
                                        <button className="s-btn" onClick={() => handleAction('Opening website...') }><Globe size={14} /></button>
                                        <button className="s-btn" onClick={() => navigate('/profile')}><UserRound size={14} /></button>
                                    </div>
                                </div>
                                <div className="member-info">
                                    <h3>{member.name}</h3>
                                    <span className="role">{member.role}</span>
                                    <p>{member.bio}</p>
                                    <button className="view-profile-btn" onClick={() => navigate('/profile')}>
                                        View Profile <ExternalLink size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="about-footer-cta">
                    <div className="cta-content">
                        <h2>Want to join our journey?</h2>
                        <p>We're always looking for talented developers and medical experts to join our team.</p>
                        <div className="cta-btns">
                            <button className="primary-cta" onClick={() => handleAction('Opening careers portal...', 'info')}>View Careers</button>
                            <button className="secondary-cta" onClick={() => navigate('/messages')}>Contact Us</button>
                        </div>
                    </div>
                </footer>
            </div>

            {statusModal.isOpen && (
                <div className="about-modal-overlay">
                    <div className="about-modal-card">
                        <div className={`about-modal-icon ${statusModal.type}`}>
                            {statusModal.type === 'success' ? <CheckCircle size={32} /> : 
                             statusModal.type === 'info' ? <Zap size={32} /> : <AlertCircle size={32} />}
                        </div>
                        <h2>{statusModal.type === 'success' ? 'Confirmed' : 'System Action'}</h2>
                        <p>{statusModal.message}</p>
                        <button className="about-modal-btn" onClick={() => setStatusModal({ ...statusModal, isOpen: false })}>
                            {statusModal.type === 'success' ? 'Excellent' : 'Okay'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AboutPage;