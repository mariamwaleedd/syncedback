import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SideMenu from './common/SideMenu';
import NavBar from './common/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgetPass from './pages/ForgetPass';
import ChoosePlatform from './pages/ChoosePlatform';

const Routing = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    const isAuthPage = ['/login', '/signup', '/forget-password', '/choose-platform'].includes(location.pathname);

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
            {!isAuthPage && (
                <SideMenu 
                    isCollapsed={isCollapsed} 
                    isMobileOpen={isMobileOpen} 
                    isMobile={isMobile} 
                    toggleNav={toggleNav} 
                    closeMobile={() => setIsMobileOpen(false)}
                />
            )}
            {!isAuthPage && (
                <NavBar 
                    isCollapsed={isCollapsed} 
                />
            )}
            <Routes>
                <Route path="/" element={<Home isCollapsed={isCollapsed} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forget-password" element={<ForgetPass />} />
                <Route path="/choose-platform" element={<ChoosePlatform />} />
            </Routes>
        </>
    );
};

export default Routing;