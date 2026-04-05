import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../imgs/logowhite.png';
import './ForgetPass.css';

const ForgetPass = () => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <div className="forgetpass-forget-container">
            <div className="forgetpass-forget-card">
                <div className="forgetpass-forget-header">
                    <div className="forgetpass-logo-box">
                        <img src={logo} alt="Logo" className="forgetpass-logo-img" />
                    </div>
                    <h1>Reset account password</h1>
                    <p className="forgetpass-subtitle">Enter the verification code sent to your email</p>
                </div>

                <form className="forgetpass-forget-form" onSubmit={handleSubmit}>
                    <div className="forgetpass-input-group">
                        <User className="forgetpass-input-icon" size={20} />
                        <input 
                            type="text" 
                            placeholder="Enter Verification Code" 
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>

                    <div className="forgetpass-separator">
                        <span>Reset Password</span>
                    </div>

                    <div className="forgetpass-input-group">
                        <User className="forgetpass-input-icon" size={20} />
                        <input 
                            type={showNewPassword ? "text" : "password"} 
                            placeholder="Enter new password" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <button 
                            type="button" 
                            className="forgetpass-toggle-password"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <div className="forgetpass-input-group">
                        <Lock className="forgetpass-input-icon" size={20} />
                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="Confirm password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button 
                            type="button" 
                            className="forgetpass-toggle-password"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <button type="submit" className="forgetpass-reset-btn">
                        Reset Password
                    </button>
                </form>

                <p className="forgetpass-back-footer">
                    Remembered your password? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgetPass;
