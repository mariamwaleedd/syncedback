import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../imgs/logowhite.png';
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
                        <img src={logo} alt="Logo" className="logo-img" />
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
