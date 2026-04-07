import React, { useState, useContext, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import '../styles/Errors.css';
import '../styles/LoginPage.css';
import { gsap, useGSAP } from '../lib/gsap.js';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useContext(AuthContext);
    const pageRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

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
            navigate(location.state?.from || '/');
        } catch (err) {
            setError(err.message || 'Invalid credentials. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.loginCard', {
            y: 34,
            autoAlpha: 0,
            scale: 0.97,
            duration: 0.55,
        })
            .from('.loginTitle, .loginSubtitle, .error', {
                y: 18,
                autoAlpha: 0,
                stagger: 0.08,
                duration: 0.35,
            }, '-=0.18')
            .from('.inputBox, .loginHelper, .themeButton, .loginFooter', {
                y: 20,
                autoAlpha: 0,
                stagger: 0.07,
                duration: 0.3,
            }, '-=0.12');
    }, { scope: pageRef, dependencies: [error], revertOnUpdate: true });

    return (
        <div className="loginWrapper" ref={pageRef}>
            <div className="loginCard">
                <h1 className="loginTitle">Welcome Back</h1>
                <p className="loginSubtitle">Please enter your details to sign in.</p>
                {(error || location.state?.authMessage) && <p className="error">{error || location.state?.authMessage}</p>}

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
