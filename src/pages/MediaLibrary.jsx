import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, Upload, Search, Filter, Grid, List, 
    Image as ImageIcon, Video, FileText, MoreVertical, 
    Download, Trash2, HardDrive, Plus, X, File, FileArchive
} from 'lucide-react';
import { supabase } from '../Supabase';
import './MediaLibrary.css';

const MediaLibrary = ({ isCollapsed }) => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [viewMode, setViewMode] = useState('grid');
    const [activeTab, setActiveTab] = useState('all');
    const [selectedItem, setSelectedItem] = useState(null);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const BUCKET_NAME = 'Synced';

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        setLoading(true);
        const { data, error } = await supabase.storage.from(BUCKET_NAME).list('', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'created_at', order: 'desc' }
        });

        if (error) {
            console.error('Error fetching files:', error);
        } else {
            const filesWithUrls = data.map(file => {
                const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(file.name);
                return { ...file, url: publicUrl, type: getFileType(file.name) };
            });
            setFiles(filesWithUrls);
        }
        setLoading(false);
    };

    const getFileType = (fileName) => {
        const ext = fileName.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext)) return 'image';
        if (['mp4', 'webm', 'ogg', 'mov'].includes(ext)) return 'video';
        if (['pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx'].includes(ext)) return 'document';
        if (['zip', 'rar', '7z'].includes(ext)) return 'archive';
        return 'other';
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fileName = `${Date.now()}_${file.name}`;
        const { error } = await supabase.storage.from(BUCKET_NAME).upload(fileName, file);

        if (error) {
            alert('Upload failed: ' + error.message);
        } else {
            fetchFiles();
        }
    };

    const handleDelete = async (fileName) => {
        if (!window.confirm('Delete this file permanently?')) return;

        const { error } = await supabase.storage.from(BUCKET_NAME).remove([fileName]);

        if (error) {
            alert('Delete failed');
        } else {
            setSelectedItem(null);
            fetchFiles();
        }
    };

    const filteredMedia = files.filter(item => {
        const matchesTab = activeTab === 'all' || item.type === activeTab;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className={`media-library-page ${isCollapsed ? 'is-collapsed' : ''}`}>
            <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleUpload} 
            />
            
            <header className="media-header">
                <div className="media-header-left">
                    <button className="media-back-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={20} />
                    </button>
                    <div className="media-titles">
                        <h1>Media Library</h1>
                        <p>Supabase Storage Connection Active</p>
                    </div>
                </div>
                <div className="media-header-actions">
                    <div className="storage-summary">
                        <div className="storage-info">
                            <HardDrive size={16} />
                            <span><strong>{files.length}</strong> files stored</span>
                        </div>
                    </div>
                    <button className="upload-main-btn" onClick={() => fileInputRef.current.click()}>
                        <Upload size={18} />
                        <span>Upload File</span>
                    </button>
                </div>
            </header>

            <div className="media-controls">
                <div className="controls-left">
                    <div className="media-tabs">
                        {['all', 'image', 'video', 'document', 'archive'].map(tab => (
                            <button 
                                key={tab}
                                className={activeTab === tab ? 'active' : ''} 
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="controls-right">
                    <div className="media-search">
                        <Search size={18} />
                        <input 
                            type="text" 
                            placeholder="Search files..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="view-toggle">
                        <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}><Grid size={18} /></button>
                        <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}><List size={18} /></button>
                    </div>
                </div>
            </div>

            <div className="media-content-layout">
                <div className={`media-display-area ${selectedItem ? 'has-sidebar' : ''}`}>
                    {loading ? (
                        <div className="loading-state">Syncing with Storage...</div>
                    ) : (
                        viewMode === 'grid' ? (
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
                                                    {item.type === 'video' ? <Video size={32} /> : 
                                                     item.type === 'archive' ? <FileArchive size={32} /> : 
                                                     <FileText size={32} />}
                                                </div>
                                            )}
                                        </div>
                                        <div className="media-info">
                                            <span className="file-name">{item.name}</span>
                                            <div className="file-meta">
                                                <span>{formatSize(item.metadata.size)}</span>
                                                <span className="dot"></span>
                                                <span>{item.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="add-media-placeholder" onClick={() => fileInputRef.current.click()}>
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
                                            <th>Date</th>
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
                                                <td>{formatSize(item.metadata.size)}</td>
                                                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                                                <td><button className="list-action" onClick={(e) => { e.stopPropagation(); handleDelete(item.name); }}><Trash2 size={16} /></button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
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
                                <span>{formatSize(selectedItem.metadata.size)}</span>
                            </div>
                            <div className="detail-row">
                                <label>Created</label>
                                <span>{new Date(selectedItem.created_at).toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="detail-actions">
                            <a href={selectedItem.url} download target="_blank" rel="noreferrer" className="btn-detail-primary">
                                <Download size={18} /> Download
                            </a>
                            <button className="btn-detail-secondary" onClick={() => handleDelete(selectedItem.name)}>
                                <Trash2 size={18} /> Delete Asset
                            </button>
                        </div>
                    </aside>
                )}
            </div>
        </div>
    );
};

export default MediaLibrary;