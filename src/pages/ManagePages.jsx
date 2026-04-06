import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Filter, Plus, Search, FileCode, Edit2, Trash2, MoreVertical, RefreshCw, AlertCircle } from 'lucide-react';
import { supabase } from '../Supabase';
import './ManagePages.css';

const ManagePages = ({ isCollapsed }) => {
    const navigate = useNavigate();
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, pageId: null });

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('pages').select('*').order('created_at', { ascending: false });
        if (error) console.error(error);
        else setPages(data);
        setLoading(false);
    };

    const handleDeleteClick = (id) => {
        setDeleteModal({ isOpen: true, pageId: id });
    };

    const confirmDelete = async () => {
        if (!deleteModal.pageId) return;
        
        const { error } = await supabase.from('pages').delete().eq('id', deleteModal.pageId);
        if (error) {
            alert("Error deleting page");
        } else {
            fetchPages();
        }
        setDeleteModal({ isOpen: false, pageId: null });
    };

    const filtered = pages.filter(p => p.name_en?.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchPages();
        setRefreshing(false);
    };

    return (
        <div className={`managepages-page-list-container ${isCollapsed ? 'is-collapsed' : ''}`}>
            <header className="managepages-page-list-header">
                <div className="managepages-header-left-side">
                    <button className="managepages-back-circle-btn" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
                    <div className="managepages-title-area">
                        <h1>Application Page List</h1>
                        <p>Managing {pages.length} live pages</p>
                    </div>
                </div>
                <div className="managepages-header-right-side">
                    <button 
                        className={`managepages-refresh-circle-btn ${refreshing ? 'spinning' : ''}`} 
                        onClick={handleRefresh}
                        title="Refresh Pages Data"
                    >
                        <RefreshCw size={18} />
                    </button>
                    <Link to="/add-page" className="managepages-new-page-primary-btn"><Plus size={18} /><span>New Page</span></Link>
                </div>
            </header>

            <main className="managepages-page-list-content-card">
                <div className="managepages-search-input-wrapper">
                    <Search className="managepages-search-icon-inside" size={18} />
                    <input type="text" placeholder="Search pages..." onChange={(e) => setSearchTerm(e.target.value)} />
                </div>

                <div className="managepages-table-responsive-wrapper">
                    <table className="managepages-pages-data-table">
                        <thead>
                            <tr>
                                <th>Page Name</th>
                                <th>Path</th>
                                <th>Status</th>
                                <th>Type</th>
                                <th className="managepages-text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? <tr><td colSpan="5" style={{textAlign:'center', padding:'40px'}}>Fetching...</td></tr> : 
                            filtered.map((page) => (
                                <tr key={page.id}>
                                    <td>
                                        <div className="managepages-page-name-cell">
                                            <div className="managepages-page-icon-square"><FileCode size={18} /></div>
                                            <span>{page.name_en}</span>
                                        </div>
                                    </td>
                                    <td><span className="managepages-path-badge">{page.path_en}</span></td>
                                    <td><div className="managepages-status-chip-active"><span className="managepages-dot"></span>{page.status || 'active'}</div></td>
                                    <td><span className={`managepages-type-badge ${page.type || 'standard'}`}>{page.type || 'standard'}</span></td>
                                    <td className="managepages-actions-cell">
                                        <button className="managepages-action-btn-gray" onClick={() => navigate('/add-page', { state: { editData: page } })}><Edit2 size={16} /></button>
                                        <button className="managepages-action-btn-gray" style={{color:'#ef4444'}} onClick={() => handleDeleteClick(page.id)}><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {deleteModal.isOpen && (
                <div className="managepages-modal-overlay">
                    <div className="managepages-modal-card">
                        <div className="managepages-modal-icon danger">
                            <AlertCircle size={32} />
                        </div>
                        <h2>Delete Page?</h2>
                        <p>This action cannot be undone. This page will be permanently removed from your application and database.</p>
                        <div className="managepages-modal-actions">
                            <button className="managepages-modal-btn-secondary" onClick={() => setDeleteModal({ isOpen: false, pageId: null })}>
                                Cancel
                            </button>
                            <button className="managepages-modal-btn-danger" onClick={confirmDelete}>
                                Yes, Delete Page
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManagePages;