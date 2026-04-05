import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <div className="logo-box">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                            <path d="M15 15C13.5 17.5 13.5 22.5 15 25" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                            <path d="M25 15C26.5 17.5 26.5 22.5 25 25" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                            <path d="M20 16V24M16 20H24" stroke="#2B7FFF" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                    </div>
                    <h1>New? Join our team</h1>
                </div>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="name-row">
                        <div className="input-group">
                            <User className="input-icon" size={20} />
                            <input 
                                type="text" 
                                placeholder="First Name" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <User className="input-icon" size={20} />
                            <input 
                                type="text" 
                                placeholder="Second Name" 
                                value={secondName}
                                onChange={(e) => setSecondName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <User className="input-icon" size={20} />
                        <input 
                            type="email" 
                            placeholder="Enter email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <Lock className="input-icon" size={20} />
                        <input 
                            type="password" 
                            placeholder="Enter password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <a href="#" className="forgot-link">Forget password?</a>

                    <button type="submit" className="signup-btn">
                        Sign Up
                    </button>
                </form>

                <p className="login-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
