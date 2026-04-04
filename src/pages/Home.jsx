import React from 'react';
import Hero from '../components/Hero';
import ApplicationPages from '../components/ApplicationPages';
import FeatureManagement from '../components/FeatureManagement';
import QuickActions from '../components/QuickActions';
import FamilyHealthOverview from '../components/FamilyHealthOverview';
import RecentActivity from '../components/RecentActivity';
import './Home.css';

const Home = () => {
    return (  
        <div className="dashboard-container">
            <Hero />
            <ApplicationPages />
            <FeatureManagement />
            <QuickActions />
            <div className="dashboard-row">
                <FamilyHealthOverview />
                <RecentActivity />
            </div>

        </div>
    );
};

export default Home;