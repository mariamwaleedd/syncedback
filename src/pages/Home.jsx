import React from 'react';
import Hero from '../components/Hero';
import ApplicationPages from '../components/ApplicationPages';
import FeatureManagement from '../components/FeatureManagement';
import QuickActions from '../components/QuickActions';
import FamilyHealthOverview from '../components/FamilyHealthOverview';
import RecentActivity from '../components/RecentActivity';
import './Home.css';

const Home = ({ isCollapsed }) => {
    return (  
        <div className={`dashboard-container ${isCollapsed ? 'is-collapsed' : ''}`}>
            <Hero />
            
            <div className="dashboard-row">
                <FamilyHealthOverview />
                <RecentActivity />
            </div>

            <ApplicationPages />
            <FeatureManagement />
            <QuickActions />
        </div>
    );
};

export default Home;