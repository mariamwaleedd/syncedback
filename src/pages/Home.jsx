import React from 'react';
import Hero from '../components/Hero';
import ApplicationPages from '../components/ApplicationPages';
import FeatureManagement from '../components/FeatureManagement';

const Home = () => {
    return (  
        <>
            <Hero />
            <ApplicationPages />
            <FeatureManagement />
        </>
    );
};

export default Home;