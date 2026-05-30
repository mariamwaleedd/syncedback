import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, Plus, Edit2, Trash2 
} from 'lucide-react';
import { supabase } from '../Supabase';
import { useDialog } from '../common/DialogContext';
import { useTranslation } from '../common/LanguageContext';
import './ApplicationPages.css';

const ApplicationPages = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { alert, confirm } = useDialog();
  const { language, t } = useTranslation();

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
    const confirmed = await confirm(t('deletePageConfirmMsg'), t('deletePageConfirmTitle'));
    if (confirmed) {
      const { error } = await supabase.from('pages').delete().eq('id', id);
      if (error) {
        alert(t('errorDeletingPage'));
      } else {
        fetchPages();
      }
    }
  };
  return (
    <div className="applicationpages-app-pages-container">
      <div className="applicationpages-app-pages-header">
        <div className="applicationpages-header-left">
          <h1>{t('applicationPages')}</h1>
          <p>{t('manageAppPages')}</p>
        </div>
        <div className="applicationpages-header-actions">
          <button className="applicationpages-new-page-btn">
            <Plus size={18} />
            <Link to="/add-page" className="primary-hero-btn">
              <span>{t('newPage')}</span>
            </Link>
          </button>
        </div>
      </div>

      <div className="applicationpages-table-wrapper">
        <table className="applicationpages-pages-table">
          <thead>
            <tr>
              <th>{t('pageName')}</th>
              <th>{t('path')}</th>
              <th>{t('status')}</th>
              <th>{t('type')}</th>
              <th>{t('lastModified')}</th>
              <th>{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{textAlign:'center', padding:'40px'}}>{t('fetchingPages')}</td></tr>
            ) : (
              pages.map((page) => (
                <tr key={page.id}>
                  <td data-label={t('pageName')}>
                    <div className="applicationpages-page-name-cell">
                      <div className="applicationpages-page-icon">
                        <FileText size={18} />
                      </div>
                      <span>{language === 'ar' ? (page.name_ar || page.name_en) : page.name_en}</span>
                    </div>
                  </td>
                  <td data-label={t('path')}>
                    <span className="applicationpages-path-chip">{language === 'ar' ? (page.path_ar || page.path_en) : page.path_en}</span>
                  </td>
                  <td data-label={t('status')}>
                    <div className="applicationpages-status-badge">
                      <span className="applicationpages-dot"></span>
                      <span>{page.status || 'active'}</span>
                    </div>
                  </td>
                  <td data-label={t('type')}>
                    <span className={`applicationpages-type-tag ${page.type || 'standard'}`}>
                      {page.type || 'standard'}
                    </span>
                  </td>
                  <td data-label={t('lastModified')}>
                    {new Date(page.created_at).toLocaleDateString()}
                  </td>
                  <td data-label={t('actions')}>
                    <div className="applicationpages-action-btns">
                      <button 
                        className="applicationpages-icon-action" 
                        title={t('editPage')}
                        onClick={() => navigate('/add-page', { state: { editData: page } })}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        className="applicationpages-icon-action delete" 
                        title={t('deletePage')}
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

