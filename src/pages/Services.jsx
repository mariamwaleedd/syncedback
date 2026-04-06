import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
    ArrowLeft, Filter, Plus, Search, 
    Zap, Edit2, MoreVertical 
} from 'lucide-react';
import './Services.css';

const featuresData = [
    { id: 1, name: 'Real-time Analytics', path: '/analytics', status: 'active', usage: 'High', modified: '2 hours ago' },
    { id: 2, name: 'Cloud Storage', path: '/media-library', status: 'active', usage: 'Medium', modified: '5 hours ago' },
    { id: 3, name: 'AI Content Generator', path: '/ai-gen', status: 'active', usage: 'Low', modified: '1 day ago' },
    { id: 4, name: 'Smart Notifications', path: '/notifications', status: 'active', usage: 'High', modified: '2 days ago' },
    { id: 5, name: 'User Management', path: '/users', status: 'active', usage: 'Medium', modified: '3 days ago' },
    { id: 6, name: 'SEO Optimizer', path: '/seo', status: 'active', usage: 'Low', modified: '4 days ago' },
    { id: 7, name: 'Custom Branding', path: '/branding', status: 'active', usage: 'Medium', modified: '5 days ago' },
    { id: 8, name: 'Automated Backups', path: '/backups', status: 'active', usage: 'High', modified: '1 week ago' },
];

const Services = ({ isCollapsed }) => {
    const navigate = useNavigate();

    return (
        <div className={`services-feature-list-container ${isCollapsed ? 'is-collapsed' : ''}`}>
            <header className="services-feature-list-header">
                <div className="services-header-left-side">
                    <button className="services-back-circle-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={20} />
                    </button>
                    <div className="services-title-area">
                        <h1>Application Features</h1>
                        <p>Manage and configure your platform services.</p>
                    </div>
                </div>
                <div className="services-header-right-side">
                    <button className="services-filter-outline-btn">
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                    <Link to="/add-feature" className="services-add-feature-primary-btn">
                        <Plus size={18} />
                        <span>Add Feature</span>
                    </Link>
                </div>
            </header>

            <main className="services-feature-list-content-card">
                <div className="services-search-input-wrapper">
                    <Search className="services-search-icon-inside" size={18} />
                    <input type="text" placeholder="Search features..." />
                </div>

                <div className="services-table-responsive-wrapper">
                    <table className="services-features-data-table">
                        <thead>
                            <tr>
                                <th>Feature Name</th>
                                <th>Endpoint/Path</th>
                                <th>Status</th>
                                <th>Usage Level</th>
                                <th>Last Updated</th>
                                <th className="services-text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {featuresData.map((feature) => (
                                <tr key={feature.id}>
                                    <td>
                                        <div className="services-feature-name-cell">
                                            <div className="services-feature-icon-square">
                                                <Zap size={18} />
                                            </div>
                                            <span>{feature.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="services-path-badge">{feature.path}</span>
                                    </td>
                                    <td>
                                        <div className="services-status-chip-active">
                                            <span className="services-dot"></span>
                                            <span>{feature.status}</span>
                                        </div>
                                    </td>
                                    <td className="services-views-cell">{feature.usage}</td>
                                    <td className="services-modified-cell">{feature.modified}</td>
                                    <td className="services-actions-cell">
                                        <button className="services-action-btn-gray"><Edit2 size={16} /></button>
                                        <button className="services-action-btn-gray"><MoreVertical size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default Services;
