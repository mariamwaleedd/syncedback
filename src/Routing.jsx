import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SideMenu from './common/SideMenu';
import NavBar from './common/NavBar';
import Home from './pages/Home';

const Routing = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (!mobile) setIsMobileOpen(false);
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleNav = () => {
        if (isMobile) {
            setIsMobileOpen(!isMobileOpen);
        } else {
            setIsCollapsed(!isCollapsed);
        }
    };

    return (
        <>
            <SideMenu 
                isCollapsed={isCollapsed} 
                isMobileOpen={isMobileOpen} 
                isMobile={isMobile} 
                toggleNav={toggleNav} 
                closeMobile={() => setIsMobileOpen(false)}
            />
            <NavBar 
                isCollapsed={isCollapsed} 
            />
            <Routes>
                <Route path="/" element={<Home isCollapsed={isCollapsed} />} />
            </Routes>
        </>
    );
};

export default Routing;