import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SideMenu from './common/SideMenu';
import NavBar from './common/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgetPass from './pages/ForgetPass';
import ChoosePlatform from './pages/ChoosePlatform';
import Analytics from './pages/Analytics';
import Services from './pages/Services';
import AboutPage from './pages/About';
import MediaLibrary from './pages/MediaLibrary';
import ManagePages from './pages/ManagePages';
import UIElements from './pages/UIElements';
import Messages from './pages/Messages';
import ComposeMessage from './pages/ComposeMessage';
import HelpPage from './pages/HelpPage';
import Settings from './pages/Settings';
import MessageDetail from './pages/MessageDetail';
import Profile from './pages/Profile';
import AddFeature from './pages/AddFeature';
import AddPage from './pages/AddPage';
import ErrorPage from './pages/ErrorPage';
import PreLoader from './common/PreLoader';

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
                    toggleNav={toggleNav}
                />
            )}
            <Routes>
                <Route path="/" element={<Home isCollapsed={isCollapsed} />} />
                <Route path="/preloader" element={<PreLoader />} />
                <Route path="/add-feature" element={<AddFeature isCollapsed={isCollapsed} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forget-password" element={<ForgetPass />} />
                <Route path="/choose-platform" element={<ChoosePlatform />} />
                <Route path="/analytics" element={<Analytics isCollapsed={isCollapsed} />} />
                <Route path="/services" element={<Services isCollapsed={isCollapsed} />} />
                <Route path="/about" element={<AboutPage isCollapsed={isCollapsed} />} />
                <Route path="/media-library" element={<MediaLibrary isCollapsed={isCollapsed} />} />
                <Route path="/manage-pages" element={<ManagePages isCollapsed={isCollapsed} />} />
                <Route path="/ui-elements" element={<UIElements isCollapsed={isCollapsed} />} />
                <Route path="/messages" element={<Messages isCollapsed={isCollapsed} />} />
                <Route path="/messages/:id" element={<MessageDetail isCollapsed={isCollapsed} />} />
                <Route path="/compose-message" element={<ComposeMessage isCollapsed={isCollapsed} />} />
                <Route path="/help" element={<HelpPage isCollapsed={isCollapsed} />} />
                <Route path="/settings" element={<Settings isCollapsed={isCollapsed} />} />
                <Route path="/add-page" element={<AddPage isCollapsed={isCollapsed} />} />
                <Route path="/profile" element={<Profile isCollapsed={isCollapsed} />} />
                <Route path="*" element={<ErrorPage type="404" />} />
            </Routes>
        </>
    );
};

export default Routing;