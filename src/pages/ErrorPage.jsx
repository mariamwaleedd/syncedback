import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, RefreshCcw, AlertTriangle, ChevronLeft, ShieldAlert } from 'lucide-react';
import './ErrorPage.css';

const ErrorPage = ({ type = "404" }) => {
    const navigate = useNavigate();

    const errorContent = {
        "404": {
            code: "404",
            title: "Page Not Found",
            message: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
            icon: <AlertTriangle size={80} strokeWidth={1} />
        },
        "500": {
            code: "500",
            title: "Internal Server Error",
            message: "Oops! Something went wrong on our end. Our technical team has been notified and is working to fix the issue.",
            icon: <ShieldAlert size={80} strokeWidth={1} />
        }
    };

    const content = errorContent[type] || errorContent["404"];

    return (
        <div className="error-page-container">
            <div className="error-bg-glow"></div>
            <div className="error-bg-grid"></div>
            
            <div className="error-content-card">
                <div className="error-visual">
                    <div className="error-icon-wrap">
                        {content.icon}
                    </div>
                    <h1 className="error-glitch-text" data-text={content.code}>
                        {content.code}
                    </h1>
                </div>

                <div className="error-text-details">
                    <h2>{content.title}</h2>
                    <p>{content.message}</p>
                </div>

                <div className="error-action-btns">
                    <button className="btn-go-home" onClick={() => navigate('/')}>
                        <Home size={18} />
                        <span>Back to Dashboard</span>
                    </button>
                    <button className="btn-refresh" onClick={() => window.location.reload()}>
                        <RefreshCcw size={18} />
                        <span>Try Again</span>
                    </button>
                </div>

                <button className="btn-back-link" onClick={() => navigate(-1)}>
                    <ChevronLeft size={16} />
                    <span>Go back to previous page</span>
                </button>
            </div>

        </div>
    );
};

export default ErrorPage;