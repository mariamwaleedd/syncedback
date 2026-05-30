import React, { useState } from 'react';
import { Zap, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../common/LanguageContext';
import './FeatureManagement.css';

const featuresData = [
  { id: 1, nameKey: 'healthQuestionnaire', categoryKey: 'onboarding', users: '1,240', active: true },
  { id: 2, nameKey: 'familyMgmt', categoryKey: 'core', users: '3,450', active: true },
  { id: 3, nameKey: 'medicineTracking', categoryKey: 'healthcare', users: '2,890', active: true },
  { id: 4, nameKey: 'aiAssistantFeature', categoryKey: 'aiCat', users: '1,890', active: true },
  { id: 5, nameKey: 'deviceSyncing', categoryKey: 'integration', users: '980', active: true },
  { id: 6, nameKey: 'bloodDonationNetwork', categoryKey: 'community', users: '560', active: true },
];

const FeatureManagement = () => {
  const [features, setFeatures] = useState(featuresData);
  const { t } = useTranslation();

  const toggleFeature = (id) => {
    setFeatures(features.map(f => 
      f.id === id ? { ...f, active: !f.active } : f
    ));
  };

  return (
    <div className="featuremanagement-feature-mgmt-container">
      <div className="featuremanagement-feature-mgmt-header">
        <div className="featuremanagement-header-text">
          <h1>{t('featureManagement')}</h1>
          <p>{t('enableDisableFeatures')}</p>
        </div>
        <button className="featuremanagement-add-feature-btn">
          <Plus size={18} />
          <Link to="/add-feature" className="primary-hero-btn">
            <span>{t('addFeature')}</span>
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
              <h3>{t(feature.nameKey)}</h3>
              <div className="featuremanagement-card-footer">
                <span className="featuremanagement-category">{t(feature.categoryKey)}</span>
                <span className="featuremanagement-users-count">{feature.users} {t('usersCount')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureManagement;

