import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideMenu from './common/SideMenu';
import NavBar from './common/NavBar';
import Home from './pages/Home';

const Routing = () => {
    return (
        <>
        <SideMenu/>
        <NavBar/>
        <Routes>
        <Route path="/" element={<Home />} />
        </Routes>
        </>
      );
}
 
export default Routing;