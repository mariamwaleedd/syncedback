import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, Upload, Search, Grid, List, 
    Image as ImageIcon, Video, FileText, MoreVertical, 
    Download, Trash2, HardDrive, Plus, X, RefreshCw, CornerUpLeft, AlertCircle, ChevronRight, Folder
} from 'lucide-react';
import { supabase } from '../Supabase';
import './MediaLibrary.css';

const MediaLibrary = ({ isCollapsed }) => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const replaceInputRef = useRef(null);
    const [viewMode, setViewMode] = useState('grid');
    const [activeTab, setActiveTab] = useState('all');
    const [selectedItem, setSelectedItem] = useState(null);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPath, setCurrentPath] = useState(''); 
    const [allMediaFlat, setAllMediaFlat] = useState([]);
    const [isFetchingFlat, setIsFetchingFlat] = useState(false);
    const [replaceModalOpen, setReplaceModalOpen] = useState(false);
    const [sortBy, setSortBy] = useState('default');

    const BUCKET_NAME = 'Synced';

    useEffect(() => {
        fetchFiles(currentPath);
    }, [currentPath]);

    useEffect(() => {
        fetchAllFlatMedia();
    }, []);

    const fetchAllFlatMedia = async () => {
        setIsFetchingFlat(true);
        let allItems = [];
        
        const fetchRecursive = async (path) => {
            const { data, error } = await supabase.storage.from(BUCKET_NAME).list(path, { limit: 100 });
            if (error || !data) return;
            
            for (let item of data) {
                if (!item.metadata) {
                    await fetchRecursive(path ? `${path}/${item.name}` : item.name);
                } else {
                    const fullPath = path ? `${path}/${item.name}` : item.name;
                    const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fullPath);
                    allItems.push({
                        ...item,
                        isFolder: false,
                        fullPath,
                        url: `${publicUrl}?t=${Date.now()}`,
                        type: getFileType(item.name)
                    });
                }
            }
        };

        await fetchRecursive('');
        setAllMediaFlat(allItems);
        setIsFetchingFlat(false);
    };

    const fetchFiles = async (path) => {
        setLoading(true);
        const { data, error } = await supabase.storage.from(BUCKET_NAME).list(path, {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' }
        });

        if (!error) {
            const processedFiles = data.map(item => {
                const isFolder = !item.metadata;
                const fullPath = path ? `${path}/${item.name}` : item.name;
                const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fullPath);
                
                return { 
                    ...item, 
                    isFolder,
                    fullPath,
                    url: isFolder ? null : `${publicUrl}?t=${Date.now()}`, 
                    type: isFolder ? 'folder' : getFileType(item.name) 
                };
            });
            setFiles(processedFiles);
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
        if (!bytes) return '---';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleItemClick = (item) => {
        if (item.isFolder) {
            setCurrentPath(item.fullPath);
            setSelectedItem(null);
        } else {
            setSelectedItem(item);
        }
    };

    const goBack = () => {
        const parts = currentPath.split('/');
        parts.pop();
        setCurrentPath(parts.join('/'));
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const uploadPath = currentPath ? `${currentPath}/${file.name}` : file.name;
        const { error } = await supabase.storage.from(BUCKET_NAME).upload(uploadPath, file);
        if (error) alert(error.message);
        else { fetchFiles(currentPath); fetchAllFlatMedia(); }
    };

    const handleReplace = async (e) => {
        const file = e.target.files[0];
        if (!file || !selectedItem) return;
        
        setLoading(true);
        const { error } = await supabase.storage.from(BUCKET_NAME).upload(selectedItem.fullPath, file, {
            cacheControl: '0',
            upsert: true
        });
        
        if (error) {
            alert("Failed to replace asset: " + error.message);
            setLoading(false);
        } else {
            const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(selectedItem.fullPath);
            const freshUrl = `${publicUrl}?t=${Date.now()}`;
            
            setSelectedItem(prev => ({ ...prev, url: freshUrl }));
            await fetchFiles(currentPath);
            await fetchAllFlatMedia();
            setLoading(false);
        }
    };

    const handleDelete = async (item) => {
        if (!window.confirm('Delete this item?')) return;
        const { error } = await supabase.storage.from(BUCKET_NAME).remove([item.fullPath]);
        if (error) alert('Delete failed.');
        else { setSelectedItem(null); fetchFiles(currentPath); fetchAllFlatMedia(); }
    };

    const filteredMedia = (activeTab === 'all' ? files : allMediaFlat).filter(item => {
        const matchesTab = activeTab === 'all' || item.type === activeTab;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    }).sort((a, b) => {
        if (sortBy === 'sizeDesc') return Number(b.metadata?.size || 0) - Number(a.metadata?.size || 0);
        if (sortBy === 'sizeAsc') return Number(a.metadata?.size || 0) - Number(b.metadata?.size || 0);
        return 0;
    });

    const totalBytes = allMediaFlat.reduce((acc, item) => acc + (item.metadata?.size || 0), 0);
    const maxQuota = 5 * 1024 * 1024 * 1024;
    const fillPercent = Math.min((totalBytes / maxQuota) * 100, 100);

    return (
        <div className={`media-library-page ${isCollapsed ? 'is-collapsed' : ''}`}>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleUpload} />
            <input type="file" ref={replaceInputRef} style={{ display: 'none' }} onChange={handleReplace} />
            
            <header className="media-header">
                <div className="media-header-left">
                    <button className="media-back-btn" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
                    <div className="media-titles">
                        <h1>Media Library</h1>
                        <div className="breadcrumb">
                            <span onClick={() => setCurrentPath('')} className="breadcrumb-root">Root</span>
                            {currentPath.split('/').map((part, i) => part && (
                                <React.Fragment key={i}>
                                    <ChevronRight size={14} />
                                    <span>{part}</span>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="media-header-actions">
                    <div className="storage-summary">
                        <div className="storage-info">
                            <HardDrive size={16} />
                            <span><strong>{formatSize(totalBytes)}</strong> of 5 GB used</span>
                        </div>
                        <div className="storage-bar"><div className="fill" style={{width: `${fillPercent}%`}}></div></div>
                    </div>
                    {currentPath && (
                        <button className="media-folder-back-btn" onClick={goBack}>
                            <CornerUpLeft size={18} /> Back
                        </button>
                    )}
                    <button className="upload-main-btn" onClick={() => fileInputRef.current.click()}>
                        <Upload size={18} /><span>Upload Here</span>
                    </button>
                </div>
            </header>

            <div className="media-controls">
                <div className="controls-left">
                    <div className="media-tabs">
                        {[{ id: 'all', label: 'All Files' }, { id: 'image', label: 'Images' }, { id: 'video', label: 'Videos' }, { id: 'document', label: 'Documents' }].map(tab => (
                            <button key={tab.id} className={activeTab === tab.id ? 'active' : ''} onClick={() => setActiveTab(tab.id)}>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="controls-right">
                    <select className="media-sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="default">Sort by Size...</option>
                        <option value="sizeDesc">Largest Size</option>
                        <option value="sizeAsc">Smallest Size</option>
                    </select>
                    <div className="media-search">
                        <Search size={18} /><input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="view-toggle">
                        <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}><Grid size={18} /></button>
                        <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}><List size={18} /></button>
                    </div>
                </div>
            </div>

            <div className="media-content-layout">
                <div className={`media-display-area ${selectedItem ? 'has-sidebar' : ''}`}>
                    {loading ? <div className="loading-msg">Refreshing Library...</div> : (
                        <div className={viewMode === 'grid' ? "media-grid" : "media-list-view"}>
                            {viewMode === 'grid' ? (
                                <>
                                    {filteredMedia.map(item => (
                                        <div key={item.fullPath} className={`media-card ${selectedItem?.fullPath === item.fullPath ? 'selected' : ''} ${item.isFolder ? 'folder-type' : ''}`} onClick={() => handleItemClick(item)}>
                                            <div className="media-thumb">
                                                {item.type === 'image' ? <img src={item.url} alt="" /> : 
                                                 item.isFolder ? <Folder size={40} fill="rgba(43, 127, 255, 0.2)" /> :
                                                 <FileText size={32} />}
                                            </div>
                                            <div className="media-info">
                                                <span className="file-name">{item.name}</span>
                                                <div className="file-meta">
                                                    <span>{item.isFolder ? 'Folder' : formatSize(item.metadata?.size)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="add-media-placeholder" onClick={() => fileInputRef.current.click()}><Plus size={32} /><span>Add File</span></div>
                                </>
                            ) : (
                                <table className="media-table">
                                    <thead><tr><th>Name</th><th>Type</th><th>Size</th><th>Actions</th></tr></thead>
                                    <tbody>
                                        {filteredMedia.map(item => (
                                            <tr key={item.fullPath} onClick={() => handleItemClick(item)} className={selectedItem?.fullPath === item.fullPath ? 'selected' : ''}>
                                                <td><div className="list-name-cell">{item.isFolder ? <Folder size={18}/> : <ImageIcon size={18} />}<span>{item.name}</span></div></td>
                                                <td><span className={`type-badge ${item.type}`}>{item.type}</span></td>
                                                <td>{formatSize(item.metadata?.size)}</td>
                                                <td><button className="list-action" onClick={(e) => { e.stopPropagation(); handleDelete(item); }}><Trash2 size={16} /></button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </div>

                {selectedItem && (
                    <aside className="media-details-sidebar">
                        <div className="sidebar-head"><h3>Details</h3><button onClick={() => setSelectedItem(null)}><X size={18} /></button></div>
                        <div className="detail-preview">{selectedItem.type === 'image' ? <img src={selectedItem.url} key={selectedItem.url} alt="" /> : <FileText size={48} />}</div>
                        <div className="detail-list">
                            <div className="detail-row"><label>Name</label><span>{selectedItem.name}</span></div>
                            <div className="detail-row"><label>Path</label><span style={{fontSize: '11px'}}>{selectedItem.fullPath}</span></div>
                            <div className="detail-row"><label>Size</label><span>{formatSize(selectedItem.metadata?.size)}</span></div>
                        </div>
                        <div className="detail-actions">
                            {!selectedItem.isFolder && (
                                <button className="btn-detail-outline" onClick={() => setReplaceModalOpen(true)}>
                                    <RefreshCw size={18} /> Replace Asset
                                </button>
                            )}
                            <a href={selectedItem.url} download target="_blank" rel="noreferrer" className="btn-detail-primary"><Download size={18} /> Download</a>
                            <button className="btn-detail-secondary" onClick={() => handleDelete(selectedItem)}><Trash2 size={18} /> Delete</button>
                        </div>
                    </aside>
                )}
            </div>

            {replaceModalOpen && (
                <div className="media-modal-overlay">
                    <div className="media-modal-card">
                        <div className="media-modal-icon warning"><AlertCircle size={32} /></div>
                        <h2>Replace Asset?</h2>
                        <p>This action will overwrite the existing file at this path instantly across the whole application.</p>
                        <div className="media-modal-actions">
                            <button className="media-modal-btn-secondary" onClick={() => setReplaceModalOpen(false)}>Cancel</button>
                            <button className="media-modal-btn-warning" onClick={() => { setReplaceModalOpen(false); replaceInputRef.current.click(); }}>Yes, Replace</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaLibrary;