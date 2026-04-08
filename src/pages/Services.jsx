import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Filter, Plus, Search, Zap, Edit2, Trash2, MoreVertical, AlertCircle } from 'lucide-react';
import { supabase } from '../Supabase';
import './Services.css';

const Services = ({ isCollapsed }) => {
    const navigate = useNavigate();
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchFeatures();
    }, []);

    const fetchFeatures = async (isManual = false) => {
        if (isManual) setRefreshing(true);
        else setLoading(true);
        
        console.log('Fetching features from Supabase...');
        const { data, error } = await supabase
            .from('features')
            .select('*')
            .order('order_index', { ascending: true })
            .order('id', { ascending: true });

        if (error) {
            console.error('Error fetching features:', error);
            alert(`Fetch failed: ${error.message}`);
        } else {
            console.log(`Successfully fetched ${data.length} features:`, data);
            setFeatures(data);
        }
        
        setLoading(false);
        setRefreshing(false);
    };

    const openDeleteModal = (item) => {
        setItemToDelete(item);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setItemToDelete(null);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        
        setIsDeleting(true);
        console.log(`Deleting feature ${itemToDelete.id}...`);
        
        const { error } = await supabase.from('features').delete().eq('id', itemToDelete.id);
        
        if (error) {
            console.error('Delete failed:', error);
            alert(`Failed to delete: ${error.message}`);
        } else {
            console.log('Delete successful');
            fetchFeatures();
            closeDeleteModal();
        }
        setIsDeleting(false);
    };

    const filteredFeatures = features.filter(f => 
        f.title_en?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={`services-feature-list-container ${isCollapsed ? 'is-collapsed' : ''}`}>
            <header className="services-feature-list-header">
                <div className="services-header-left-side">
                    <button className="services-back-circle-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={20} />
                    </button>
                    <div className="services-title-area">
                        <h1>Application Features</h1>
                        <p>Total: {features.length} /  features configured.</p>
                    </div>
                </div>
                <div className="services-header-right-side">
                    <button 
                        className={`services-refresh-circle-btn ${refreshing ? 'spinning' : ''}`}
                        onClick={() => fetchFeatures(true)}
                        disabled={loading || refreshing}
                        title="Refresh Data"
                    >
                        <Zap size={18} fill={refreshing ? 'currentColor' : 'none'} />
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
                    <input 
                        type="text" 
                        placeholder="Search features by name..." 
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="services-table-responsive-wrapper">
                    <table className="services-features-data-table">
                        <thead>
                            <tr>
                                <th>Title (EN)</th>
                                <th>Category (EN)</th>
                                <th>Title (AR)</th>
                                <th>Index</th>
                                <th className="services-text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" style={{textAlign:'center', padding:'50px'}}>Loading platform data...</td></tr>
                            ) : filteredFeatures.map((feature) => (
                                <tr key={feature.id}>
                                    <td data-label="Title (EN)">
                                        <div className="services-feature-name-cell">
                                            <div className="services-feature-icon-square">
                                                <Zap size={18} />
                                            </div>
                                            <span>{feature.title_en}</span>
                                        </div>
                                    </td>
                                    <td data-label="Category"><span className="services-path-badge">{feature.category_en}</span></td>
                                    <td data-label="Title (AR)" style={{textAlign: 'right', direction: 'rtl'}}>{feature.title_ar}</td>
                                    <td data-label="Index">{feature.order_index}</td>
                                    <td data-label="Actions" className="services-actions-cell">
                                        <button 
                                            className="services-action-btn-gray"
                                            onClick={() => navigate('/add-feature', { state: { editData: feature } })}
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button 
                                            className="services-action-btn-gray" 
                                            style={{color: '#ef4444'}}
                                            onClick={() => openDeleteModal(feature)}
                                            title="Delete Feature"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {isModalOpen && (
                <div className="services-modal-overlay">
                    <div className="services-modal-card">
                        <div className="services-modal-icon danger">
                            <AlertCircle size={32} />
                        </div>
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete <strong>"{itemToDelete?.title_en}"</strong>? This action will remove the feature permanently from the system and cannot be undone.</p>
                        
                        <div className="services-modal-actions">
                            <button 
                                className="services-modal-btn-secondary" 
                                onClick={closeDeleteModal}
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                            <button 
                                className="services-modal-btn-danger" 
                                onClick={confirmDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Delete Feature'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Services;