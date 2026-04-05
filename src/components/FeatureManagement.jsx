import React, { useState } from 'react';
import { Zap, Plus } from 'lucide-react';
import './FeatureManagement.css';
import { Link } from 'react-router-dom';

const featuresData = [
  { id: 1, name: 'Health Questionnaire', category: 'Onboarding', users: '1,240', active: true },
  { id: 2, name: 'Family Management', category: 'Core', users: '3,450', active: true },
  { id: 3, name: 'Medicine Tracking', category: 'Healthcare', users: '2,890', active: true },
  { id: 4, name: 'AI Assistant', category: 'AI', users: '1,890', active: true },
  { id: 5, name: 'Device Syncing', category: 'Integration', users: '980', active: true },
  { id: 6, name: 'Blood Donation Network', category: 'Community', users: '560', active: true },
];

const FeatureManagement = () => {
  const [features, setFeatures] = useState(featuresData);

  const toggleFeature = (id) => {
    setFeatures(features.map(f => 
      f.id === id ? { ...f, active: !f.active } : f
    ));
  };

  return (
    <div className="featuremanagement-feature-mgmt-container">
      <div className="featuremanagement-feature-mgmt-header">
        <div className="featuremanagement-header-text">
          <h1>Feature Management</h1>
          <p>Enable/disable features and track usage</p>
        </div>
        <button className="featuremanagement-add-feature-btn">
          <Plus size={18} />
          <Link to="/add-feature" className="primary-hero-btn">
            <span>Add Feature</span>
          </Link>
        </button>
      </div>

      <div className="featuremanagement-features-grid">
        {features.map((feature) => (
          <div key={feature.id} className="featuremanagement-feature-card">
            <div className="featuremanagement-card-top">
              <div className="featuremanagement-feature-icon">
                <Zap size={20} fill="currentColor" />
              </div>
              <label className="featuremanagement-toggle-switch">
                <input 
                  type="checkbox" 
                  checked={feature.active} 
                  onChange={() => toggleFeature(feature.id)}
                />
                <span className="featuremanagement-slider"></span>
              </label>
            </div>
            <div className="featuremanagement-card-content">
              <h3>{feature.name}</h3>
              <div className="featuremanagement-card-footer">
                <span className="featuremanagement-category">{feature.category}</span>
                <span className="featuremanagement-users-count">{feature.users} users</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureManagement;
