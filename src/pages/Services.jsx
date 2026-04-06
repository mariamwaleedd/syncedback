import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Filter, Plus, Search, Zap, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { supabase } from '../Supabase';
import './Services.css';

const Services = ({ isCollapsed }) => {
    const navigate = useNavigate();
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchFeatures();
    }, []);

    const fetchFeatures = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('features')
            .select('*')
            .order('id', { ascending: true });

        if (error) console.error('Error fetching:', error);
        else setFeatures(data);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this feature?')) {
            const { error } = await supabase.from('features').delete().eq('id', id);
            if (error) alert('Error deleting feature');
            else fetchFeatures();
        }
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
                        <p>Total: {features.length} / 15 features configured.</p>
                    </div>
                </div>
                <div className="services-header-right-side">
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
                                    <td>
                                        <div className="services-feature-name-cell">
                                            <div className="services-feature-icon-square">
                                                <Zap size={18} />
                                            </div>
                                            <span>{feature.title_en}</span>
                                        </div>
                                    </td>
                                    <td><span className="services-path-badge">{feature.category_en}</span></td>
                                    <td style={{textAlign: 'right', direction: 'rtl'}}>{feature.title_ar}</td>
                                    <td>{feature.order_index}</td>
                                    <td className="services-actions-cell">
                                        <button 
                                            className="services-action-btn-gray"
                                            onClick={() => navigate('/add-feature', { state: { editData: feature } })}
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button 
                                            className="services-action-btn-gray" 
                                            style={{color: '#ef4444'}}
                                            onClick={() => handleDelete(feature.id)}
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
        </div>
    );
};

export default Services;