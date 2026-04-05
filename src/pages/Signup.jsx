import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../imgs/logowhite.png';
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
                        <img src={logo} alt="Logo" className="logo-img" />
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

                    <Link to="/forget-password" alt="" className="forgot-link">Forget password?</Link>

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
