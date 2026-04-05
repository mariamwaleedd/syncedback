import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ForgetPass.css';

const ForgetPass = () => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="forget-container">
            <div className="forget-card">
                <div className="forget-header">
                    <div className="logo-box">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                            <path d="M15 15C13.5 17.5 13.5 22.5 15 25" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                            <path d="M25 15C26.5 17.5 26.5 22.5 25 25" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                            <path d="M20 16V24M16 20H24" stroke="#2B7FFF" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                    </div>
                    <h1>Reset account password</h1>
                    <p className="subtitle">Enter the verification code sent to your email</p>
                </div>

                <form className="forget-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <User className="input-icon" size={20} />
                        <input 
                            type="text" 
                            placeholder="Enter Verification Code" 
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>

                    <div className="separator">
                        <span>Reset Password</span>
                    </div>

                    <div className="input-group">
                        <User className="input-icon" size={20} />
                        <input 
                            type="password" 
                            placeholder="Enter new password" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <Lock className="input-icon" size={20} />
                        <input 
                            type="password" 
                            placeholder="Confirm password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="reset-btn">
                        Reset Password
                    </button>
                </form>

                <p className="back-footer">
                    Remembered your password? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgetPass;
