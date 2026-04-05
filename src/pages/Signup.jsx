import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../imgs/logowhite.png';
import './Signup.css';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <div className="signup-logo-box">
                        <img src={logo} alt="Logo" className="signup-logo-img" />
                    </div>
                    <h1>New? Join our team</h1>
                </div>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="signup-name-row">
                        <div className="signup-input-group">
                            <User className="signup-input-icon" size={20} />
                            <input 
                                type="text" 
                                placeholder="First Name" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="signup-input-group">
                            <User className="signup-input-icon" size={20} />
                            <input 
                                type="text" 
                                placeholder="Second Name" 
                                value={secondName}
                                onChange={(e) => setSecondName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="signup-input-group">
                        <User className="signup-input-icon" size={20} />
                        <input 
                            type="email" 
                            placeholder="Enter email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="signup-input-group">
                        <Lock className="signup-input-icon" size={20} />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Enter password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button 
                            type="button" 
                            className="signup-toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <Link to="/forget-password" alt="" className="signup-forgot-link">Forget password?</Link>

                    <button type="submit" className="signup-btn">
                        Sign Up
                    </button>
                </form>

                <p className="signup-login-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
