import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Filter, Plus, Edit2, MoreVertical 
} from 'lucide-react';
import './ApplicationPages.css';

const pagesData = [
  { name: 'Homepage', path: '/', status: 'active', views: '12,450', modified: '2 hours ago' },
  { name: 'Family Dashboard', path: '/family-dashboard', status: 'active', views: '8,920', modified: '5 hours ago' },
  { name: 'Medicine Tracker', path: '/medicine-tracker', status: 'active', views: '6,340', modified: '1 day ago' },
  { name: 'Wellness Hub', path: '/wellness-hub', status: 'active', views: '5,670', modified: '2 days ago' },
  { name: 'Doctors Page', path: '/doctors', status: 'active', views: '4,890', modified: '3 days ago' },
  { name: 'AI Health Assistant', path: '/health-ai', status: 'active', views: '4,120', modified: '4 days ago' },
  { name: 'Settings', path: '/settings', status: 'active', views: '3,450', modified: '5 days ago' },
  { name: 'Emergency', path: '/emergency', status: 'active', views: '2,890', modified: '1 week ago' },
];

const ApplicationPages = () => {
  return (
    <div className="app-pages-container">
      <div className="app-pages-header">
        <div className="header-left">
          <h1>Application Pages</h1>
          <p>Manage and edit all pages in your application</p>
        </div>
        <div className="header-actions">
          <button className="filter-btn">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button className="new-page-btn">
            <Plus size={18} />
            <Link to="/add-page" className="primary-hero-btn">
            <span>New Page</span></Link>
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="pages-table">
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
            {pagesData.map((page, index) => (
              <tr key={index}>
                <td>
                  <div className="page-name-cell">
                    <div className="page-icon">
                      <FileText size={18} />
                    </div>
                    <span>{page.name}</span>
                  </div>
                </td>
                <td>
                  <span className="path-chip">{page.path}</span>
                </td>
                <td>
                  <div className="status-badge">
                    <span className="dot"></span>
                    <span>{page.status}</span>
                  </div>
                </td>
                <td>{page.views}</td>
                <td>{page.modified}</td>
                <td>
                  <div className="action-btns">
                    <button className="icon-action"><Edit2 size={16} /></button>
                    <button className="icon-action"><MoreVertical size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationPages;
