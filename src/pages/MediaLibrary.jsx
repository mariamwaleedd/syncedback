import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, Upload, Search, Filter, Grid, List, 
    Image as ImageIcon, Video, FileText, MoreVertical, 
    Download, Trash2, Info, HardDrive, Plus, X,
    ChevronRight, File
} from 'lucide-react';
import './MediaLibrary.css';

const mediaData = [
    { id: 1, name: 'hero-banner.jpg', type: 'image', size: '2.4 MB', date: 'Oct 12, 2025', url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=300' },
    { id: 2, name: 'intro-video.mp4', type: 'video', size: '45.8 MB', date: 'Oct 10, 2025', url: '#' },
    { id: 3, name: 'user-manual.pdf', type: 'document', size: '1.2 MB', date: 'Oct 08, 2025', url: '#' },
    { id: 4, name: 'profile-placeholder.png', type: 'image', size: '850 KB', date: 'Oct 05, 2025', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300' },
    { id: 5, name: 'dashboard-preview.png', type: 'image', size: '3.1 MB', date: 'Oct 03, 2025', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300' },
    { id: 6, name: 'quarterly-report.xlsx', type: 'document', size: '2.1 MB', date: 'Sep 28, 2025', url: '#' },
    { id: 7, name: 'meeting-notes.docx', type: 'document', size: '450 KB', date: 'Sep 25, 2025', url: '#' },
    { id: 8, name: 'branding-assets.zip', type: 'archive', size: '124 MB', date: 'Sep 20, 2025', url: '#' }
];

const MediaLibrary = ({ isCollapsed }) => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('grid');
    const [activeTab, setActiveTab] = useState('all');
    const [selectedItem, setSelectedItem] = useState(null);

    const filteredMedia = activeTab === 'all' 
        ? mediaData 
        : mediaData.filter(item => item.type === activeTab);

    return (
        <div className={`media-library-page ${isCollapsed ? 'is-collapsed' : ''}`}>
            <header className="media-header">
                <div className="media-header-left">
                    <button className="media-back-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={20} />
                    </button>
                    <div className="media-titles">
                        <h1>Media Library</h1>
                        <p>Manage and organize your application assets</p>
                    </div>
                </div>
                <div className="media-header-actions">
                    <div className="storage-summary">
                        <div className="storage-info">
                            <HardDrive size={16} />
                            <span><strong>1.2 GB</strong> of 5 GB used</span>
                        </div>
                        <div className="storage-bar"><div className="fill" style={{width: '24%'}}></div></div>
                    </div>
                    <button className="upload-main-btn">
                        <Upload size={18} />
                        <span>Upload File</span>
                    </button>
                </div>
            </header>

            <div className="media-controls">
                <div className="controls-left">
                    <div className="media-tabs">
                        <button className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>All Assets</button>
                        <button className={activeTab === 'image' ? 'active' : ''} onClick={() => setActiveTab('image')}>Images</button>
                        <button className={activeTab === 'video' ? 'active' : ''} onClick={() => setActiveTab('video')}>Videos</button>
                        <button className={activeTab === 'document' ? 'active' : ''} onClick={() => setActiveTab('document')}>Documents</button>
                    </div>
                </div>
                <div className="controls-right">
                    <div className="media-search">
                        <Search size={18} />
                        <input type="text" placeholder="Search files..." />
                    </div>
                    <div className="view-toggle">
                        <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}><Grid size={18} /></button>
                        <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}><List size={18} /></button>
                    </div>
                    <button className="filter-outline"><Filter size={18} /></button>
                </div>
            </div>

            <div className="media-content-layout">
                <div className={`media-display-area ${selectedItem ? 'has-sidebar' : ''}`}>
                    {viewMode === 'grid' ? (
                        <div className="media-grid">
                            {filteredMedia.map(item => (
                                <div 
                                    key={item.id} 
                                    className={`media-card ${selectedItem?.id === item.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedItem(item)}
                                >
                                    <div className="media-thumb">
                                        {item.type === 'image' ? (
                                            <img src={item.url} alt={item.name} />
                                        ) : (
                                            <div className={`file-placeholder ${item.type}`}>
                                                {item.type === 'video' ? <Video size={32} /> : <FileText size={32} />}
                                            </div>
                                        )}
                                        <div className="card-overlay">
                                            <button className="overlay-btn"><Download size={16} /></button>
                                            <button className="overlay-btn"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                    <div className="media-info">
                                        <span className="file-name">{item.name}</span>
                                        <div className="file-meta">
                                            <span>{item.size}</span>
                                            <span className="dot"></span>
                                            <span>{item.type}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="add-media-placeholder">
                                <Plus size={32} />
                                <span>Add New</span>
                            </div>
                        </div>
                    ) : (
                        <div className="media-list-view">
                            <table className="media-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Size</th>
                                        <th>Upload Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMedia.map(item => (
                                        <tr key={item.id} onClick={() => setSelectedItem(item)} className={selectedItem?.id === item.id ? 'selected' : ''}>
                                            <td>
                                                <div className="list-name-cell">
                                                    {item.type === 'image' ? <ImageIcon size={18} /> : <File size={18} />}
                                                    <span>{item.name}</span>
                                                </div>
                                            </td>
                                            <td><span className={`type-badge ${item.type}`}>{item.type}</span></td>
                                            <td>{item.size}</td>
                                            <td>{item.date}</td>
                                            <td><button className="list-action"><MoreVertical size={16} /></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {selectedItem && (
                    <aside className="media-details-sidebar">
                        <div className="sidebar-head">
                            <h3>File Details</h3>
                            <button className="close-sidebar" onClick={() => setSelectedItem(null)}><X size={18} /></button>
                        </div>
                        <div className="detail-preview">
                            {selectedItem.type === 'image' ? (
                                <img src={selectedItem.url} alt={selectedItem.name} />
                            ) : (
                                <div className="detail-placeholder">
                                    <FileText size={48} />
                                </div>
                            )}
                        </div>
                        <div className="detail-list">
                            <div className="detail-row">
                                <label>File Name</label>
                                <span>{selectedItem.name}</span>
                            </div>
                            <div className="detail-row">
                                <label>File Type</label>
                                <span>{selectedItem.type.toUpperCase()}</span>
                            </div>
                            <div className="detail-row">
                                <label>File Size</label>
                                <span>{selectedItem.size}</span>
                            </div>
                            <div className="detail-row">
                                <label>Dimensions</label>
                                <span>1920 x 1080</span>
                            </div>
                            <div className="detail-row">
                                <label>Uploaded On</label>
                                <span>{selectedItem.date}</span>
                            </div>
                        </div>
                        <div className="detail-actions">
                            <button className="btn-detail-primary"><Download size={18} /> Download</button>
                            <button className="btn-detail-secondary"><Trash2 size={18} /> Delete Asset</button>
                        </div>
                    </aside>
                )}
            </div>
        </div>
    );
};

export default MediaLibrary;