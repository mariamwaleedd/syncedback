import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, Filter, TrendingUp, Globe, BarChart2, 
    Activity, User, MessageSquare, ExternalLink, 
    Download, Share2, FileText, ChevronRight,
    Bold, Italic, Strikethrough, Heading1, Heading2, 
    Heading3, Pencil, Code, Link as LinkIcon, Image, Search
} from 'lucide-react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, 
    BarChart, Bar
} from 'recharts';
import './Analytics.css';

const trafficData = [
    { name: 'Mon', users: 3000, views: 4500 },
    { name: 'Tue', users: 3500, views: 5200 },
    { name: 'Wed', users: 3200, views: 4800 },
    { name: 'Thu', users: 4500, views: 6100 },
    { name: 'Fri', users: 6800, views: 7500 },
    { name: 'Sat', users: 5500, views: 6800 },
    { name: 'Sun', users: 5000, views: 6200 },
];

const sourceData = [
    { name: 'Organic Search', value: 34, color: '#1e3a8a' },
    { name: 'Direct', value: 25, color: '#3b82f6' },
    { name: 'Social Media', value: 17, color: '#001a3d' },
    { name: 'Referral', value: 13, color: '#2563eb' },
    { name: 'Email', value: 11, color: '#60a5fa' },
];

const pageData = [
    { name: '/home', value: 8500 },
    { name: '/projects', value: 6200 },
    { name: '/about', value: 4100 },
    { name: '/contact', value: 3800 },
    { name: '/resume', value: 5500 },
];

const Analytics = ({ isCollapsed }) => {
    const navigate = useNavigate();

    return (
        <div className={`analytics-page ${isCollapsed ? 'is-collapsed' : ''}`}>
            <header className="analytics-header">
                <div className="analytics-header-left">
                    <button className="analytics-back-btn-ui" onClick={() => navigate(-1)}>
                        <ArrowLeft size={20} />
                    </button>
                    <div className="analytics-titles">
                        <h1>Analytics</h1>
                        <p>Manage Activity</p>
                    </div>
                </div>
                <button className="analytics-filter-btn">
                    <Filter size={18} />
                    <span>Filter</span>
                </button>
            </header>

            <div className="analytics-grid">
                <div className="analytics-chart-card analytics-wide-chart">
                    <div className="analytics-card-header">
                        <TrendingUp size={18} />
                        <h3>Website Traffic (Last 7 Days)</h3>
                    </div>
                    <div className="analytics-chart-wrapper">
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={trafficData}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2b7fff" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#2b7fff" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                                <Tooltip 
                                    contentStyle={{ background: '#fff', borderRadius: '8px', border: 'none', color: '#000' }}
                                    itemStyle={{ color: '#000' }}
                                />
                                <Area type="monotone" dataKey="views" stroke="#2b7fff" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                                <Area type="monotone" dataKey="users" stroke="#60a5fa" strokeWidth={2} fill="transparent" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="analytics-chart-legend">
                        <span className="analytics-legend-item"><i className="analytics-dot analytics-users"></i> Users</span>
                        <span className="analytics-legend-item"><i className="analytics-dot analytics-views"></i> Views</span>
                    </div>
                </div>

                <div className="analytics-chart-card">
                    <div className="analytics-card-header">
                        <Globe size={18} />
                        <h3>Traffic Sources</h3>
                    </div>
                    <div className="analytics-chart-wrapper">
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={sourceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {sourceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="analytics-pie-legend">
                        {sourceData.map(item => (
                            <div key={item.name} className="analytics-pie-analytics-legend-item">
                                <span className="analytics-label">{item.name} {item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="analytics-chart-card analytics-wide-chart">
                    <div className="analytics-card-header">
                        <BarChart2 size={18} />
                        <h3>Top Pages</h3>
                    </div>
                    <div className="analytics-chart-wrapper">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={pageData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={11} axisLine={false} tickLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                                <Bar dataKey="value" fill="#2b7fff" radius={[4, 4, 0, 0]} barSize={60} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="analytics-activity-card">
                    <div className="analytics-card-header">
                        <Activity size={18} />
                        <h3>Recent Activity</h3>
                    </div>
                    <div className="analytics-activity-list">
                        <div className="analytics-activity-item">
                            <div className="analytics-icon-box"><User size={14} /></div>
                            <div className="analytics-info">
                                <p>New visitor from LinkedIn Profile viewed</p>
                                <span>2 minutes ago</span>
                            </div>
                        </div>
                        <div className="analytics-activity-item">
                            <div className="analytics-icon-box"><MessageSquare size={14} /></div>
                            <div className="analytics-info">
                                <p>Contact form submitted john.doe@example.com</p>
                                <span>15 minutes ago</span>
                            </div>
                        </div>
                        <div className="analytics-activity-item">
                            <div className="analytics-icon-box"><ExternalLink size={14} /></div>
                            <div className="analytics-info">
                                <p>Project page viewed /projects/web-app</p>
                                <span>23 minutes ago</span>
                            </div>
                        </div>
                        <div className="analytics-activity-item">
                            <div className="analytics-icon-box"><Download size={14} /></div>
                            <div className="analytics-info">
                                <p>Resume downloaded resume.pdf</p>
                                <span>1 hour ago</span>
                            </div>
                        </div>
                        <div className="analytics-activity-item">
                            <div className="analytics-icon-box"><Share2 size={14} /></div>
                            <div className="analytics-info">
                                <p>Portfolio shared Twitter referral</p>
                                <span>2 hours ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="analytics-stats-row-grid">
                <div className="analytics-stat-mini-card">
                    <div className="analytics-mini-head">
                        <span>Bounce Rate</span>
                        <TrendingUp size={14} className="analytics-rotate-down" />
                    </div>
                    <div className="analytics-val">42.3%</div>
                    <div className="analytics-progress-bar"><div className="analytics-fill" style={{width: '42%'}}></div></div>
                </div>
                <div className="analytics-stat-mini-card">
                    <div className="analytics-mini-head">
                        <span>Avg. Session Duration</span>
                        <TrendingUp size={14} />
                    </div>
                    <div className="analytics-val">3m 24s</div>
                    <div className="analytics-progress-bar"><div className="analytics-fill" style={{width: '65%'}}></div></div>
                </div>
                <div className="analytics-stat-mini-card">
                    <div className="analytics-mini-head">
                        <span>Pages per Session</span>
                        <TrendingUp size={14} />
                    </div>
                    <div className="analytics-val">4.8</div>
                    <div className="analytics-progress-bar"><div className="analytics-fill" style={{width: '80%'}}></div></div>
                </div>
            </div>

            <div className="analytics-dual-lists-grid">
                <div className="analytics-list-card-box">
                    <div className="analytics-box-head">
                        <h3>Recent Projects</h3>
                        <p>Latest projects added to the system</p>
                    </div>
                    <div className="analytics-list-items">
                        <div className="analytics-list-item-row">
                            <FileText size={16} /> <span>UX/UI</span>
                        </div>
                        <div className="analytics-list-item-row">
                            <FileText size={16} /> <span>Graphic Design</span>
                        </div>
                    </div>
                    <button className="analytics-view-all-link">View All Projects <ChevronRight size={14}/></button>
                </div>

                <div className="analytics-list-card-box">
                    <div className="analytics-box-head">
                        <h3>Recent Pages</h3>
                        <p>Latest static pages in the system</p>
                    </div>
                    <div className="analytics-list-items">
                        <div className="analytics-analytics-list-item-row-between">
                            <div className="analytics-left">
                                <FileText size={16} /> 
                                <div className="analytics-txt">
                                    <strong>Contact Us</strong>
                                    <span>/contact</span>
                                </div>
                            </div>
                            <span className="analytics-badge-complete">Complete</span>
                        </div>
                        <div className="analytics-analytics-list-item-row-between">
                            <div className="analytics-left">
                                <FileText size={16} /> 
                                <div className="analytics-txt">
                                    <strong>About Us</strong>
                                    <span>/about</span>
                                </div>
                            </div>
                            <span className="analytics-badge-complete">Complete</span>
                        </div>
                    </div>
                    <button className="analytics-view-all-link">View All Pages <ChevronRight size={14}/></button>
                </div>
            </div>

            <section className="analytics-seo-form-section">
                <h2 className="analytics-section-title">SEO</h2>
                <div className="analytics-seo-input-grid">
                    <div className="analytics-field">
                        <label>Slug Name</label>
                        <input type="text" placeholder="Enter Slug Name" />
                    </div>
                    <div className="analytics-field">
                        <label>Page Tag</label>
                        <input type="text" placeholder="Enter Tag" />
                    </div>
                </div>
                
                <div className="editor-container">
                    <div className="analytics-editor-toolbar">
                        <Bold size={16} /> <Italic size={16} /> <Strikethrough size={16} />
                        <div className="analytics-sep" />
                        <Heading1 size={16} /> <Heading2 size={16} /> <Heading3 size={16} />
                        <div className="analytics-sep" />
                        <Pencil size={16} /> <Code size={16} /> <LinkIcon size={16} /> 
                        <Image size={16} /> <Search size={16} />
                    </div>
                    <div className="analytics-field">
                        <label>Meta Description</label>
                        <textarea placeholder="Enter Meta Description"></textarea>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Analytics;