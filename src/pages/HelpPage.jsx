import React, { useState } from 'react';
import { 
    Search, BookOpen, Zap, BarChart3, Mail, 
    Layers, Settings, ChevronRight, HelpCircle,
    MessageCircle, PlayCircle, FileText, ChevronDown
} from 'lucide-react';
import './HelpPage.css';

const Highlight = ({ text, query }) => {
    if (!query || !query.trim()) return <span>{text}</span>;
    try {
        const escapedQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedQuery})`, 'gi');
        const parts = String(text).split(regex);
        return (
            <span>
                {parts.map((part, i) => 
                    part.toLowerCase() === query.trim().toLowerCase() 
                        ? <mark key={i} className="search-highlight">{part}</mark> 
                        : part
                )}
            </span>
        );
    } catch (e) {
        return <span>{text}</span>;
    }
};

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

    const steps = [
        {
            num: '01',
            title: 'Configure Features',
            desc: 'Start by defining the core modules of your app in the Features section. Set permissions for users or admins.'
        },
        {
            num: '02',
            title: 'Build Pages',
            desc: 'Use the Page Builder to create static content. Define URL paths and link them to your navigation menu.'
        },
        {
            num: '03',
            title: 'Analyze Traffic',
            desc: 'Monitor the Analytics dashboard daily to see which sections of your app perform best with real-time data.'
        }
    ];

    const filteredCategories = categories.filter(cat => {
        const query = searchQuery.toLowerCase().trim();
        return (cat.title || "").toLowerCase().includes(query) || 
               (cat.desc || "").toLowerCase().includes(query) ||
               (cat.explanation || "").toLowerCase().includes(query);
    });

    const filteredFaqs = faqs.filter(faq => {
        const query = searchQuery.toLowerCase().trim();
        return (faq.q || "").toLowerCase().includes(query) || 
               (faq.a || "").toLowerCase().includes(query);
    });

    const filteredSteps = steps.filter(step => {
        const query = searchQuery.toLowerCase().trim();
        return (step.title || "").toLowerCase().includes(query) || 
               (step.desc || "").toLowerCase().includes(query);
    });

    const hasResults = searchQuery.trim() === '' || (filteredCategories.length > 0 || filteredFaqs.length > 0 || filteredSteps.length > 0);

    return (
        <div className={`helppage-help-center-page ${isCollapsed ? 'is-collapsed' : ''}`}>
            <header className="helppage-help-hero">
                <div className="helppage-helppage-help-hero-content">
                    <h1>How can we help you?</h1>
                    <p>Search our knowledge base or browse categories below</p>
                    <div className="helppage-help-search-wrapper">
                        <Search className="helppage-search-icon" size={20} />
                        <input 
                            id="help-center-search"
                            name="help-search"
                            type="text" 
                            placeholder="Search for articles, guides, or keywords..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => { if(e.key === 'Enter') e.target.blur(); }}
                            autoFocus
                        />
                        <button className="helppage-search-submit-btn">
                            Search
                        </button>

                    </div>
                </div>
            </header>

            <div className="helppage-help-content-body">
                {hasResults ? (
                    <>
                        {filteredCategories.length > 0 && (
                            <div className="helppage-category-grid">
                                {filteredCategories.map((cat, idx) => (
                                    <div 
                                        key={idx} 
                                        className={`helppage-category-card ${selectedCategory?.title === cat.title ? 'is-active' : ''}`}
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        <div className="helppage-cat-icon-box">{cat.icon}</div>
                                        <h3><Highlight text={cat.title} query={searchQuery} /></h3>
                                        <p><Highlight text={cat.desc} query={searchQuery} /></p>
                                        <button className="helppage-cat-link-btn">
                                            Explore <ChevronRight size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}


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

                        {filteredSteps.length > 0 && (
                            <section className="helppage-instructions-section">
                                <div className="helppage-section-header">
                                    <h2>Quick Start Guide</h2>
                                    <span className="helppage-badge">Updated</span>
                                </div>
                                
                                <div className="helppage-guide-steps-grid">
                                    {filteredSteps.map((step, idx) => (
                                        <div className="step-item" key={idx}>
                                            <div className="helppage-step-num">{step.num}</div>
                                            <div className="helppage-step-info">
                                                <h4><Highlight text={step.title} query={searchQuery} /></h4>
                                                <p><Highlight text={step.desc} query={searchQuery} /></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <div className="helppage-help-dual-row">
                            {filteredFaqs.length > 0 && (
                                <section className="helppage-faq-section">
                                    <h2>Frequently Asked Questions</h2>
                                    <div className="helppage-faq-list">
                                        {filteredFaqs.map((faq, idx) => (
                                            <div 
                                                key={idx} 
                                                className={`helppage-faq-item ${activeFaq === idx ? 'open' : ''}`}
                                                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                                            >
                                                <div className="helppage-faq-question">
                                                    <span><Highlight text={faq.q} query={searchQuery} /></span>
                                                    <ChevronDown size={18} className="helppage-arrow" />
                                                </div>
                                                {activeFaq === idx && <div className="helppage-faq-answer"><Highlight text={faq.a} query={searchQuery} /></div>}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}


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
                    </>
                ) : (
                    <div className="helppage-no-results">
                        <div className="helppage-no-results-icon">
                            <Search size={64} />
                        </div>
                        <h2>No results found</h2>
                        <p>We couldn't find any articles matching "<strong>{searchQuery}</strong>".</p>
                        <button className="helppage-clear-search-btn" onClick={() => setSearchQuery('')}>
                            Clear search
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default HelpPage;