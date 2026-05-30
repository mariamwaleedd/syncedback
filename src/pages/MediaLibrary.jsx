import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, Upload, Search, Grid, List, 
    Image as ImageIcon, Video, FileText, 
    Download, Trash2, HardDrive, Plus, X, RefreshCw, CornerUpLeft, AlertCircle, ChevronRight, Folder,
    CheckCircle, Loader
} from 'lucide-react';
import { supabase } from '../Supabase';
import { useDialog } from '../common/DialogContext';
import { useTranslation } from '../common/LanguageContext';
import './MediaLibrary.css';

const localTranslations = {
  en: {
    title: "Media Library",
    root: "Root",
    ofUsed: "of 5 GB used",
    back: "Back",
    uploadHere: "Upload Here",
    allFiles: "All Files",
    images: "Images",
    videos: "Videos",
    documents: "Documents",
    sortBySize: "Sort by Size...",
    largestSize: "Largest Size",
    smallestSize: "Smallest Size",
    search: "Search...",
    doubleClickOpen: "Double-click or Tap to Open",
    addFile: "Add File",
    name: "Name",
    type: "Type",
    size: "Size",
    actions: "Actions",
    details: "Details",
    replaceAsset: "Replace Asset",
    download: "Download",
    delete: "Delete",
    uploading: "Uploading",
    uploadedSuccess: "Media uploaded successfully!",
    failedReplace: "Failed to replace asset",
    deleteConfirmMsg: "Are you absolutely sure you want to delete {name}? This action cannot be undone and may break links in your application.",
    deleteConfirmTitle: "Delete Asset?",
    deleting: "Deleting",
    deleteFailed: "Delete failed",
    deleteSuccess: "Item deleted successfully!",
    replaceConfirmMsg: "This action will overwrite the existing file at this path instantly across the whole application.",
    replaceConfirmTitle: "Replace Asset?",
    refreshing: "Refreshing Library...",
    browseFile: "Browse File...",
    cancel: "Cancel",
    uploadMedia: "Upload Media",
    uploadMediaDesc: "Where would you like to add this new media file? Select the appropriate page or section.",
    generalRoot: "General / Root",
    heroSec: "Hero Section",
    activitiesPage: "Activities Page",
    analyticsSys: "Analytics System",
    familyProfs: "Family Profiles",
    messagesSys: "Messages System",
    helpDocs: "Help & Documentation"
  },
  ar: {
    title: "مكتبة الوسائط",
    root: "الرئيسية",
    ofUsed: "من أصل 5 جيجابايت مستخدمة",
    back: "رجوع",
    uploadHere: "تحميل هنا",
    allFiles: "جميع الملفات",
    images: "الصور",
    videos: "الفيديوهات",
    documents: "المستندات",
    sortBySize: "تصفية حسب الحجم...",
    largestSize: "الحجم الأكبر",
    smallestSize: "الحجم الأصغر",
    search: "بحث...",
    doubleClickOpen: "انقر نقراً مزدوجاً أو اضغط للفتح",
    addFile: "إضافة ملف",
    name: "الاسم",
    type: "النوع",
    size: "الحجم",
    actions: "الإجراءات",
    details: "التفاصيل",
    replaceAsset: "استبدال الملف",
    download: "تنزيل",
    delete: "حذف",
    uploading: "جاري الرفع",
    uploadedSuccess: "تم رفع الوسائط بنجاح!",
    failedReplace: "فشل استبدال الملف",
    deleteConfirmMsg: "هل أنت متأكد تماماً من رغبتك في حذف {name}؟ هذا الإجراء لا يمكن التراجع عنه وقد يؤدي إلى كسر الروابط في تطبيقك.",
    deleteConfirmTitle: "حذف الملف؟",
    deleting: "جاري الحذف",
    deleteFailed: "فشل الحذف",
    deleteSuccess: "تم حذف العنصر بنجاح!",
    replaceConfirmMsg: "سيؤدي هذا الإجراء إلى استبدال الملف الموجود في هذا المسار فوراً في كامل أرجاء التطبيق.",
    replaceConfirmTitle: "هل تريد استبدال الملف؟",
    refreshing: "جاري تحديث المكتبة...",
    browseFile: "تصفح الملفات...",
    cancel: "إلغاء",
    uploadMedia: "تحميل وسائط",
    uploadMediaDesc: "أين تريد إضافة ملف الوسائط الجديد هذا؟ اختر الصفحة أو القسم المناسب.",
    generalRoot: "عام / الجذر",
    heroSec: "قسم الهيرو",
    activitiesPage: "صفحة الأنشطة",
    analyticsSys: "نظام التحليلات",
    familyProfs: "ملفات العائلة",
    messagesSys: "نظام الرسائل",
    helpDocs: "المساعدة والوثائق"
  }
};

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
    const [addModalOpen, setAddModalOpen] = useState(false);
    const { alert, confirm } = useDialog();
    const { language } = useTranslation();
    const [selectedUploadFolder, setSelectedUploadFolder] = useState('General');
    const [toast, setToast] = useState({ visible: false, message: '', type: 'loading' });

    const BUCKET_NAME = 'Synced';

    const tLocal = (key, variables = {}) => {
        let text = localTranslations[language]?.[key] || localTranslations['en'][key] || key;
        Object.keys(variables).forEach(varKey => {
            text = text.replace(`{${varKey}}`, variables[varKey]);
        });
        return text;
    };

    const PREDEFINED_SECTIONS = [
        { id: 'General', label: tLocal('generalRoot') },
        { id: 'Hero', label: tLocal('heroSec') },
        { id: 'Activities', label: tLocal('activitiesPage') },
        { id: 'Analytics', label: tLocal('analyticsSys') },
        { id: 'Family', label: tLocal('familyProfs') },
        { id: 'Messages', label: tLocal('messagesSys') },
        { id: 'Help', label: tLocal('helpDocs') },
    ];

    const showToast = (message, type = 'success', duration = 3000) => {
        setToast({ visible: true, message, type });
        if (type !== 'loading') {
            setTimeout(() => setToast({ visible: false, message: '', type: 'loading' }), duration);
        }
    };

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

    const handleAddClick = () => {
        setSelectedUploadFolder(currentPath || 'General'); 
        setAddModalOpen(true);
    };

    const handleConfirmAdd = () => {
        fileInputRef.current.click();
        setAddModalOpen(false);
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const folderPath = selectedUploadFolder !== 'General' ? selectedUploadFolder : '';
        const uploadPath = folderPath ? `${folderPath}/${file.name}` : file.name;
        
        showToast(`${tLocal('uploading')} ${file.name}...`, 'loading');
        
        const { error } = await supabase.storage.from(BUCKET_NAME).upload(uploadPath, file);
        if (error) {
            showToast(error.message, 'error');
        } else {
            showToast(tLocal('uploadedSuccess'), 'success');
            fetchFiles(currentPath); 
            fetchAllFlatMedia();
        }
        e.target.value = null;
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
            alert(tLocal('failedReplace') + ": " + error.message);
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

    const requestDelete = async (item) => {
        const confirmed = await confirm(tLocal('deleteConfirmMsg', { name: item.name }), tLocal('deleteConfirmTitle'));
        if (confirmed) {
            confirmDelete(item);
        }
    };

    const confirmDelete = async (item) => {
        showToast(`${tLocal('deleting')} ${item.name}...`, 'loading');
        
        const { error } = await supabase.storage.from(BUCKET_NAME).remove([item.fullPath]);
        if (error) {
            showToast(tLocal('deleteFailed') + ': ' + error.message, 'error');
        } else {
            showToast(tLocal('deleteSuccess'), 'success');
            setSelectedItem(null); 
            fetchFiles(currentPath); 
            fetchAllFlatMedia();
        }
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
                        <h1>{tLocal('title')}</h1>
                        <div className="breadcrumb">
                            <span onClick={() => setCurrentPath('')} className="breadcrumb-root">{tLocal('root')}</span>
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
                            <span><strong>{formatSize(totalBytes)}</strong> {tLocal('ofUsed')}</span>
                        </div>
                        <div className="storage-bar"><div className="fill" style={{width: `${fillPercent}%`}}></div></div>
                    </div>
                    {currentPath && (
                        <button className="media-folder-back-btn" onClick={goBack}>
                            <CornerUpLeft size={18} /> {tLocal('back')}
                        </button>
                    )}
                    <button className="upload-main-btn" onClick={handleAddClick}>
                        <Upload size={18} /><span>{tLocal('uploadHere')}</span>
                    </button>
                </div>
            </header>

            <div className="media-controls">
                <div className="controls-left">
                    <div className="media-tabs">
                        {[
                          { id: 'all', label: tLocal('allFiles') },
                          { id: 'image', label: tLocal('images') },
                          { id: 'video', label: tLocal('videos') },
                          { id: 'document', label: tLocal('documents') }
                        ].map(tab => (
                            <button key={tab.id} className={activeTab === tab.id ? 'active' : ''} onClick={() => setActiveTab(tab.id)}>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="controls-right">
                    <select className="media-sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="default">{tLocal('sortBySize')}</option>
                        <option value="sizeDesc">{tLocal('largestSize')}</option>
                        <option value="sizeAsc">{tLocal('smallestSize')}</option>
                    </select>
                    <div className="media-search">
                        <Search size={18} /><input type="text" placeholder={tLocal('search')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="view-toggle">
                        <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}><Grid size={18} /></button>
                        <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}><List size={18} /></button>
                    </div>
                </div>
            </div>

            <div className="media-content-layout">
                <div className={`media-display-area ${selectedItem ? 'has-sidebar' : ''}`}>
                    {loading ? <div className="loading-msg">{tLocal('refreshing')}</div> : (
                        <div className={viewMode === 'grid' ? "media-grid" : "media-list-view"}>
                            {viewMode === 'grid' ? (
                                <>
                                    {filteredMedia.map(item => item.isFolder ? (
                                        <div key={item.fullPath} className={`folder-premium-card ${selectedItem?.fullPath === item.fullPath ? 'selected' : ''}`} onClick={() => handleItemClick(item)}>
                                            <div className="folder-icon-glow">
                                                <Folder size={32} fill="var(--primary)" stroke="var(--primary)" />
                                            </div>
                                            <div className="folder-details">
                                                <span className="folder-name">{item.name}</span>
                                                <span className="folder-desc">{tLocal('doubleClickOpen')}</span>
                                            </div>
                                            <ChevronRight size={20} className="folder-arrow" />
                                        </div>
                                    ) : (
                                        <div key={item.fullPath} className={`media-card ${selectedItem?.fullPath === item.fullPath ? 'selected' : ''}`} onClick={() => handleItemClick(item)}>
                                            <div className="media-thumb">
                                                {item.type === 'image' ? <img src={item.url} alt="" /> : <FileText size={32} />}
                                            </div>
                                            <div className="media-info">
                                                <span className="file-name">{item.name}</span>
                                                <div className="file-meta">
                                                    <span>{formatSize(item.metadata?.size)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="add-media-placeholder" onClick={handleAddClick}><Plus size={32} /><span>{tLocal('addFile')}</span></div>
                                </>
                            ) : (
                                <table className="media-table">
                                    <thead><tr><th>{tLocal('name')}</th><th>{tLocal('type')}</th><th>{tLocal('size')}</th><th>{tLocal('actions')}</th></tr></thead>
                                    <tbody>
                                        {filteredMedia.map(item => (
                                            <tr key={item.fullPath} onClick={() => handleItemClick(item)} className={selectedItem?.fullPath === item.fullPath ? 'selected' : ''}>
                                                <td data-label={tLocal('name')}><div className="list-name-cell">{item.isFolder ? <Folder size={18}/> : <ImageIcon size={18} />}<span>{item.name}</span></div></td>
                                                <td data-label={tLocal('type')}><span className={`type-badge ${item.type}`}>{item.type}</span></td>
                                                <td data-label={tLocal('size')}>{formatSize(item.metadata?.size)}</td>
                                                <td data-label={tLocal('actions')}><button className="list-action" onClick={(e) => { e.stopPropagation(); requestDelete(item); }}><Trash2 size={16} /></button></td>
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
                        <div className="sidebar-head"><h3>{tLocal('details')}</h3><button onClick={() => setSelectedItem(null)}><X size={18} /></button></div>
                        <div className="detail-preview">{selectedItem.type === 'image' ? <img src={selectedItem.url} key={selectedItem.url} alt="" /> : <FileText size={48} />}</div>
                        <div className="detail-list">
                            <div className="detail-row"><label>{tLocal('name')}</label><span>{selectedItem.name}</span></div>
                            <div className="detail-row"><label>Path</label><span style={{fontSize: '11px'}}>{selectedItem.fullPath}</span></div>
                            <div className="detail-row"><label>{tLocal('size')}</label><span>{formatSize(selectedItem.metadata?.size)}</span></div>
                        </div>
                        <div className="detail-actions">
                            {!selectedItem.isFolder && (
                                <button className="btn-detail-outline" onClick={async () => {
                                    const confirmed = await confirm(tLocal('replaceConfirmMsg'), tLocal('replaceConfirmTitle'));
                                    if (confirmed) replaceInputRef.current.click();
                                }}>
                                    <RefreshCw size={18} /> {tLocal('replaceAsset')}
                                </button>
                            )}
                            <a href={selectedItem.url} download target="_blank" rel="noreferrer" className="btn-detail-primary"><Download size={18} /> {tLocal('download')}</a>
                            <button className="btn-detail-secondary" onClick={() => requestDelete(selectedItem)}><Trash2 size={18} /> {tLocal('delete')}</button>
                        </div>
                    </aside>
                )}
            </div>

            {addModalOpen && (
                <div className="media-modal-overlay" onClick={() => setAddModalOpen(false)}>
                    <div className="media-modal-card" onClick={e => e.stopPropagation()}>
                        <button className="helppage-modal-close" onClick={() => setAddModalOpen(false)}>&times;</button>
                        <div className="media-modal-icon primary"><Upload size={32} /></div>
                        <h2>{tLocal('uploadMedia')}</h2>
                        <p>{tLocal('uploadMediaDesc')}</p>
                        <select 
                            className="media-modal-select" 
                            value={selectedUploadFolder} 
                            onChange={(e) => setSelectedUploadFolder(e.target.value)}
                        >
                            {PREDEFINED_SECTIONS.map(sec => (
                                <option key={sec.id} value={sec.id}>{sec.label}</option>
                            ))}
                        </select>
                        <div className="media-modal-actions">
                            <button className="media-modal-btn-secondary" onClick={() => setAddModalOpen(false)}>{tLocal('cancel')}</button>
                            <button className="media-modal-btn-primary" onClick={handleConfirmAdd}>{tLocal('browseFile')}</button>
                        </div>
                    </div>
                </div>
            )}

            {toast.visible && (
                <div className={`media-toast ${toast.type}`}>
                    {toast.type === 'loading' && <Loader className="media-toast-icon loading" size={20} />}
                    {toast.type === 'success' && <CheckCircle className="media-toast-icon success" size={20} />}
                    {toast.type === 'error' && <AlertCircle className="media-toast-icon error" size={20} />}
                    <span>{toast.message}</span>
                </div>
            )}
        </div>
    );
};

export default MediaLibrary;