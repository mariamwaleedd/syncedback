import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, Filter, Plus, Edit2, Trash2, AlertCircle 
} from 'lucide-react';
import { supabase } from '../Supabase';
import { useDialog } from '../common/DialogContext';
import './ApplicationPages.css';

const ApplicationPages = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { alert, confirm } = useDialog();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(8);
    
    if (error) console.error(error);
    else setPages(data || []);
    setLoading(false);
  };

  const handleDeleteClick = async (id) => {
    const confirmed = await confirm("This action cannot be undone. This page will be permanently removed from your application and database.", "Delete Page?");
    if (confirmed) {
      const { error } = await supabase.from('pages').delete().eq('id', id);
      if (error) {
        alert("Error deleting page");
      } else {
        fetchPages();
      }
    }
  };
  return (
    <div className="applicationpages-app-pages-container">
      <div className="applicationpages-app-pages-header">
        <div className="applicationpages-header-left">
          <h1>Application Pages</h1>
          <p>Manage and edit all pages in your application</p>
        </div>
        <div className="applicationpages-header-actions">
          <button className="applicationpages-new-page-btn">
            <Plus size={18} />
            <Link to="/add-page" className="primary-hero-btn">
            <span>New Page</span></Link>
          </button>
        </div>
      </div>

      <div className="applicationpages-table-wrapper">
        <table className="applicationpages-pages-table">
          <thead>
            <tr>
              <th>Page Name</th>
              <th>Path</th>
              <th>Status</th>
              <th>Views</th>
              <th>Last Modified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{textAlign:'center', padding:'40px'}}>Fetching live pages...</td></tr>
            ) : (
              pages.map((page) => (
                <tr key={page.id}>
                  <td data-label="Page Name">
                    <div className="applicationpages-page-name-cell">
                      <div className="applicationpages-page-icon">
                        <FileText size={18} />
                      </div>
                      <span>{page.name_en}</span>
                    </div>
                  </td>
                  <td data-label="Path">
                    <span className="applicationpages-path-chip">{page.path_en}</span>
                  </td>
                  <td data-label="Status">
                    <div className="applicationpages-status-badge">
                      <span className="applicationpages-dot"></span>
                      <span>{page.status || 'active'}</span>
                    </div>
                  </td>
                  <td data-label="Type">
                    <span className={`applicationpages-type-tag ${page.type || 'standard'}`}>
                      {page.type || 'standard'}
                    </span>
                  </td>
                  <td data-label="Last Modified">
                    {new Date(page.created_at).toLocaleDateString()}
                  </td>
                  <td data-label="Actions">
                    <div className="applicationpages-action-btns">
                      <button 
                        className="applicationpages-icon-action" 
                        title="Edit Page"
                        onClick={() => navigate('/add-page', { state: { editData: page } })}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="applicationpages-icon-action delete" 
                        title="Delete Page"
                        onClick={() => handleDeleteClick(page.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default ApplicationPages;
