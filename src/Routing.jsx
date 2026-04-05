import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SideMenu from './common/SideMenu';
import NavBar from './common/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';

const Routing = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    const isLoginPage = location.pathname === '/login';

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
            {!isLoginPage && (
                <SideMenu 
                    isCollapsed={isCollapsed} 
                    isMobileOpen={isMobileOpen} 
                    isMobile={isMobile} 
                    toggleNav={toggleNav} 
                    closeMobile={() => setIsMobileOpen(false)}
                />
            )}
            {!isLoginPage && (
                <NavBar 
                    isCollapsed={isCollapsed} 
                />
            )}
            <Routes>
                <Route path="/" element={<Home isCollapsed={isCollapsed} />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
};

export default Routing;