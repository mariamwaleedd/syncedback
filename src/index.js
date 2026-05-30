import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Routing from './Routing';
import { DialogProvider } from './common/DialogContext';
import { LanguageProvider } from './common/LanguageContext';

const savedTheme = localStorage.getItem('synced_theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <DialogProvider>
          <Routing/>
        </DialogProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
