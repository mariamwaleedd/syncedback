import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
    ArrowLeft, Filter, Plus, Search, 
    FileCode, Edit2, MoreVertical 
} from 'lucide-react';
import './ManagePages.css';

const pagesData = [
    { id: 1, name: 'Homepage', path: '/', status: 'active', views: '12,450', modified: '2 hours ago' },
    { id: 2, name: 'Family Dashboard', path: '/family-dashboard', status: 'active', views: '8,920', modified: '5 hours ago' },
    { id: 3, name: 'Medicine Tracker', path: '/medicine-tracker', status: 'active', views: '6,340', modified: '1 day ago' },
    { id: 4, name: 'Wellness Hub', path: '/wellness-hub', status: 'active', views: '5,670', modified: '2 days ago' },
    { id: 5, name: 'Doctors Page', path: '/doctors', status: 'active', views: '4,890', modified: '3 days ago' },
    { id: 6, name: 'AI Health Assistant', path: '/health-ai', status: 'active', views: '4,120', modified: '4 days ago' },
    { id: 7, name: 'Settings', path: '/settings', status: 'active', views: '3,450', modified: '5 days ago' },
    { id: 8, name: 'Emergency', path: '/emergency', status: 'active', views: '2,890', modified: '1 week ago' },
];

const ManagePages = ({ isCollapsed }) => {
    const navigate = useNavigate();

    return (
        <div className={`managepages-page-list-container ${isCollapsed ? 'is-collapsed' : ''}`}>
            <header className="managepages-page-list-header">
                <div className="managepages-header-left-side">
                    <button className="managepages-back-circle-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={20} />
                    </button>
                    <div className="managepages-title-area">
                        <h1>Application Page List</h1>
                        <p>Browse through application pages.</p>
                    </div>
                </div>
                <div className="managepages-header-right-side">
                    <button className="managepages-filter-outline-btn">
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                    <Link to="/add-page" className="managepages-new-page-primary-btn">
                        <Plus size={18} />
                        <span>New Page</span>
                    </Link>
                </div>
            </header>

            <main className="managepages-page-list-content-card">
                <div className="managepages-search-input-wrapper">
                    <Search className="managepages-search-icon-inside" size={18} />
                    <input type="text" placeholder="Search pages..." />
                </div>

                <div className="managepages-table-responsive-wrapper">
                    <table className="managepages-pages-data-table">
                        <thead>
                            <tr>
                                <th>Page Name</th>
                                <th>Path</th>
                                <th>Status</th>
                                <th>Views</th>
                                <th>Last Modified</th>
                                <th className="managepages-text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagesData.map((page) => (
                                <tr key={page.id}>
                                    <td>
                                        <div className="managepages-page-name-cell">
                                            <div className="managepages-page-icon-square">
                                                <FileCode size={18} />
                                            </div>
                                            <span>{page.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="managepages-path-badge">{page.path}</span>
                                    </td>
                                    <td>
                                        <div className="managepages-status-chip-active">
                                            <span className="managepages-dot"></span>
                                            <span>{page.status}</span>
                                        </div>
                                    </td>
                                    <td className="managepages-views-cell">{page.views}</td>
                                    <td className="managepages-modified-cell">{page.modified}</td>
                                    <td className="managepages-actions-cell">
                                        <button className="managepages-action-btn-gray"><Edit2 size={16} /></button>
                                        <button className="managepages-action-btn-gray"><MoreVertical size={16} /></button>
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

export default ManagePages;
