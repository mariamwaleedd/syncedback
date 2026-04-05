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
                <div className="header-left">
                    <button className="back-btn-ui" onClick={() => navigate(-1)}>
                        <ArrowLeft size={20} />
                    </button>
                    <div className="titles">
                        <h1>Analytics</h1>
                        <p>Manage Activity</p>
                    </div>
                </div>
                <button className="filter-btn">
                    <Filter size={18} />
                    <span>Filter</span>
                </button>
            </header>

            <div className="analytics-grid">
                <div className="chart-card wide-chart">
                    <div className="card-header">
                        <TrendingUp size={18} />
                        <h3>Website Traffic (Last 7 Days)</h3>
                    </div>
                    <div className="chart-wrapper">
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
                    <div className="chart-legend">
                        <span className="legend-item"><i className="dot users"></i> Users</span>
                        <span className="legend-item"><i className="dot views"></i> Views</span>
                    </div>
                </div>

                <div className="chart-card">
                    <div className="card-header">
                        <Globe size={18} />
                        <h3>Traffic Sources</h3>
                    </div>
                    <div className="chart-wrapper">
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
                    <div className="pie-legend">
                        {sourceData.map(item => (
                            <div key={item.name} className="pie-legend-item">
                                <span className="label">{item.name} {item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="chart-card wide-chart">
                    <div className="card-header">
                        <BarChart2 size={18} />
                        <h3>Top Pages</h3>
                    </div>
                    <div className="chart-wrapper">
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

                <div className="activity-card">
                    <div className="card-header">
                        <Activity size={18} />
                        <h3>Recent Activity</h3>
                    </div>
                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="icon-box"><User size={14} /></div>
                            <div className="info">
                                <p>New visitor from LinkedIn Profile viewed</p>
                                <span>2 minutes ago</span>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="icon-box"><MessageSquare size={14} /></div>
                            <div className="info">
                                <p>Contact form submitted john.doe@example.com</p>
                                <span>15 minutes ago</span>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="icon-box"><ExternalLink size={14} /></div>
                            <div className="info">
                                <p>Project page viewed /projects/web-app</p>
                                <span>23 minutes ago</span>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="icon-box"><Download size={14} /></div>
                            <div className="info">
                                <p>Resume downloaded resume.pdf</p>
                                <span>1 hour ago</span>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="icon-box"><Share2 size={14} /></div>
                            <div className="info">
                                <p>Portfolio shared Twitter referral</p>
                                <span>2 hours ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="stats-row-grid">
                <div className="stat-mini-card">
                    <div className="mini-head">
                        <span>Bounce Rate</span>
                        <TrendingUp size={14} className="rotate-down" />
                    </div>
                    <div className="val">42.3%</div>
                    <div className="progress-bar"><div className="fill" style={{width: '42%'}}></div></div>
                </div>
                <div className="stat-mini-card">
                    <div className="mini-head">
                        <span>Avg. Session Duration</span>
                        <TrendingUp size={14} />
                    </div>
                    <div className="val">3m 24s</div>
                    <div className="progress-bar"><div className="fill" style={{width: '65%'}}></div></div>
                </div>
                <div className="stat-mini-card">
                    <div className="mini-head">
                        <span>Pages per Session</span>
                        <TrendingUp size={14} />
                    </div>
                    <div className="val">4.8</div>
                    <div className="progress-bar"><div className="fill" style={{width: '80%'}}></div></div>
                </div>
            </div>

            <div className="dual-lists-grid">
                <div className="list-card-box">
                    <div className="box-head">
                        <h3>Recent Projects</h3>
                        <p>Latest projects added to the system</p>
                    </div>
                    <div className="list-items">
                        <div className="list-item-row">
                            <FileText size={16} /> <span>UX/UI</span>
                        </div>
                        <div className="list-item-row">
                            <FileText size={16} /> <span>Graphic Design</span>
                        </div>
                    </div>
                    <button className="view-all-link">View All Projects <ChevronRight size={14}/></button>
                </div>

                <div className="list-card-box">
                    <div className="box-head">
                        <h3>Recent Pages</h3>
                        <p>Latest static pages in the system</p>
                    </div>
                    <div className="list-items">
                        <div className="list-item-row-between">
                            <div className="left">
                                <FileText size={16} /> 
                                <div className="txt">
                                    <strong>Contact Us</strong>
                                    <span>/contact</span>
                                </div>
                            </div>
                            <span className="badge-complete">Complete</span>
                        </div>
                        <div className="list-item-row-between">
                            <div className="left">
                                <FileText size={16} /> 
                                <div className="txt">
                                    <strong>About Us</strong>
                                    <span>/about</span>
                                </div>
                            </div>
                            <span className="badge-complete">Complete</span>
                        </div>
                    </div>
                    <button className="view-all-link">View All Pages <ChevronRight size={14}/></button>
                </div>
            </div>

            <section className="seo-form-section">
                <h2 className="section-title">SEO</h2>
                <div className="seo-input-grid">
                    <div className="field">
                        <label>Slug Name</label>
                        <input type="text" placeholder="Enter Slug Name" />
                    </div>
                    <div className="field">
                        <label>Page Tag</label>
                        <input type="text" placeholder="Enter Tag" />
                    </div>
                </div>
                
                <div className="editor-container">
                    <div className="editor-toolbar">
                        <Bold size={16} /> <Italic size={16} /> <Strikethrough size={16} />
                        <div className="sep" />
                        <Heading1 size={16} /> <Heading2 size={16} /> <Heading3 size={16} />
                        <div className="sep" />
                        <Pencil size={16} /> <Code size={16} /> <LinkIcon size={16} /> 
                        <Image size={16} /> <Search size={16} />
                    </div>
                    <div className="field">
                        <label>Meta Description</label>
                        <textarea placeholder="Enter Meta Description"></textarea>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Analytics;