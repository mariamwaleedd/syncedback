import React, { useState } from 'react';
import { 
    Search, BookOpen, Zap, BarChart3, Mail, 
    Layers, Settings, ChevronRight, HelpCircle,
    MessageCircle, PlayCircle, FileText, ChevronDown
} from 'lucide-react';
import './HelpPage.css';

const HelpPage = ({ isCollapsed }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFaq, setActiveFaq] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = [
        { 
            icon: <Zap size={24} />, 
            title: 'Features', 
            desc: 'Managing application features and toggles',
            explanation: 'System for managing core application modules, enabling/disabling functionalities, and setting user permissions across the platform.'
        },
        { 
            icon: <Layers size={24} />, 
            title: 'Pages', 
            desc: 'Creating and configuring SEO-friendly pages',
            explanation: 'Dynamic page creation tool for SEO optimization, allowing you to define URL paths, manage content, and control how pages appear in search results.'
        },
        { 
            icon: <BarChart3 size={24} />, 
            title: 'Analytics', 
            desc: 'Understanding traffic and user behavior',
            explanation: 'Real-time traffic monitoring and behavioral analysis dashboard to track user engagement, popular content, and session metrics.'
        },
        { 
            icon: <Mail size={24} />, 
            title: 'Messaging', 
            desc: 'Inbox management and email campaigns',
            explanation: 'Centralized communication hub for managing incoming user queries, automating email campaigns, and maintaining direct support channels.'
        },
        { 
            icon: <Settings size={24} />, 
            title: 'System', 
            desc: 'Platform settings and profile management',
            explanation: 'Core platform configuration area for managing security protocols, user profiles, administrative roles, and global application settings.'
        },
        { 
            icon: <BookOpen size={24} />, 
            title: 'Guides', 
            desc: 'Step-by-step video tutorials',
            explanation: 'Comprehensive library of walkthroughs and video tutorials designed to help you master every aspect of the Synced platform efficiently.'
        }
    ];

    const faqs = [
        {
            q: "How do I add a new feature to the platform?",
            a: "Navigate to the Home or Feature Management page and click '+ New Feature'. Fill in the English and Arabic details, set the initial status, and click 'Create'. You can preview the feature card live as you type."
        },
        {
            q: "What are SEO Meta Tags and why are they optional?",
            a: "Meta Tags help search engines understand your page content. While optional, filling out the SEO section in the Page Creator (Property and Content Value) improves your application's visibility on Google and social media shares."
        },
        {
            q: "How can I track specific page views?",
            a: "Go to the Analytics section. Under 'Top Pages', you will see a bar chart representing the most visited paths. Detailed timestamps are available in the 'Recent Activity' log on the same page."
        },
        {
            q: "Can I undo a message deletion?",
            a: "Currently, messages moved to the 'Archive' can be recovered. However, messages permanently deleted via the 'Delete' button in the Message Detail view cannot be restored."
        }
    ];

    return (
        <div className={`helppage-help-center-page ${isCollapsed ? 'is-collapsed' : ''}`}>
            <header className="helppage-help-hero">
                <div className="helppage-helppage-help-hero-content">
                    <h1>How can we help you?</h1>
                    <p>Search our knowledge base or browse categories below</p>
                    <div className="helppage-help-search-wrapper">
                        <Search className="helppage-search-icon" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search for articles, guides, or keywords..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <div className="helppage-help-content-body">
                <div className="helppage-category-grid">
                    {categories.map((cat, idx) => (
                        <div 
                            key={idx} 
                            className={`helppage-category-card ${selectedCategory?.title === cat.title ? 'is-active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            <div className="helppage-cat-icon-box">{cat.icon}</div>
                            <h3>{cat.title}</h3>
                            <p>{cat.desc}</p>
                            <button className="helppage-cat-link-btn">
                                Explore <ChevronRight size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                {selectedCategory && (
                    <div className="helppage-modal-overlay" onClick={() => setSelectedCategory(null)}>
                        <div className="helppage-modal-content" onClick={e => e.stopPropagation()}>
                            <button className="helppage-modal-close" onClick={() => setSelectedCategory(null)}>&times;</button>
                            <div className="helppage-modal-header">
                                <div className="helppage-modal-icon-box">{selectedCategory.icon}</div>
                                <h2>{selectedCategory.title} Overview</h2>
                            </div>
                            <div className="helppage-modal-body">
                                <p>{selectedCategory.explanation}</p>
                            </div>
                            <div className="helppage-modal-footer">
                                <button className="helppage-modal-btn" onClick={() => setSelectedCategory(null)}>Got it</button>
                            </div>
                        </div>
                    </div>
                )}

                <section className="helppage-instructions-section">
                    <div className="helppage-section-header">
                        <h2>Quick Start Guide</h2>
                        <span className="helppage-badge">Updated</span>
                    </div>
                    
                    <div className="helppage-guide-steps-grid">
                        <div className="step-item">
                            <div className="helppage-step-num">01</div>
                            <div className="helppage-step-info">
                                <h4>Configure Features</h4>
                                <p>Start by defining the core modules of your app in the Features section. Set permissions for users or admins.</p>
                            </div>
                        </div>
                        <div className="step-item">
                            <div className="helppage-step-num">02</div>
                            <div className="helppage-step-info">
                                <h4>Build Pages</h4>
                                <p>Use the Page Builder to create static content. Define URL paths and link them to your navigation menu.</p>
                            </div>
                        </div>
                        <div className="step-item">
                            <div className="helppage-step-num">03</div>
                            <div className="helppage-step-info">
                                <h4>Analyze Traffic</h4>
                                <p>Monitor the Analytics dashboard daily to see which sections of your app perform best with real-time data.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="helppage-help-dual-row">
                    <section className="helppage-faq-section">
                        <h2>Frequently Asked Questions</h2>
                        <div className="helppage-faq-list">
                            {faqs.map((faq, idx) => (
                                <div 
                                    key={idx} 
                                    className={`helppage-faq-item ${activeFaq === idx ? 'open' : ''}`}
                                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                >
                                    <div className="helppage-faq-question">
                                        <span>{faq.q}</span>
                                        <ChevronDown size={18} className="helppage-arrow" />
                                    </div>
                                    {activeFaq === idx && <div className="helppage-faq-answer">{faq.a}</div>}
                                </div>
                            ))}
                        </div>
                    </section>

                    <aside className="helppage-support-sidebar">
                        <div className="helppage-support-card-blue">
                            <HelpCircle size={32} />
                            <h3>Still need help?</h3>
                            <p>Our support team is available 24/7 to help you with technical issues.</p>
                            <button className="helppage-contact-btn">Contact Support</button>
                        </div>

                        <div className="helppage-resource-list">
                            <h3>Documentation</h3>
                            <div className="helppage-res-item">
                                <PlayCircle size={18} />
                                <span>Video Tutorials</span>
                            </div>
                            <div className="helppage-res-item">
                                <FileText size={18} />
                                <span>API References</span>
                            </div>
                            <div className="helppage-res-item">
                                <MessageCircle size={18} />
                                <span>Community Forum</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;