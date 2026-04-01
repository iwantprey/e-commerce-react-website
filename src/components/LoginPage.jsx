import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import '../styles/Errors.css';
import '../styles/LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user, login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please enter email and password');
            return;
        }

        setIsSubmitting(true);
        try {
            await login(email, password);
            setError('');
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="loginWrapper">
            <div className="loginCard">
                <h1 className="loginTitle">Welcome Back</h1>
                <p className="loginSubtitle">Please enter your details to sign in.</p>
                {error && <p className="error">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="inputBox">
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                        <label htmlFor="email">Email Address</label>
                    </div>

                    <div className="inputBox">
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                        <label htmlFor="password">Password</label>
                    </div>

                    <div className="loginHelper">
                        <a href="#" className="forgotLink">Forgot Password?</a>
                    </div>

                    <button type="submit" className="themeButton" disabled={isSubmitting}>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="loginFooter">
                    <p>Don't have an account? <a href="/signUp">Sign Up</a></p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;