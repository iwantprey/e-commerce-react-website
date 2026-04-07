import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { CartContext } from '../CartContext';
import '../styles/Navbar.css';
import { gsap, useGSAP } from '../lib/gsap.js';

const Navbar = () => {
    const { user, logout, isAdmin } = useContext(AuthContext);
    const { itemCount } = useContext(CartContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navRef = useRef(null);
    const dropdownPanelRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.navbar-left .navLink', {
            x: -24,
            autoAlpha: 0,
            duration: 0.55,
        })
            .from('.navbar-links .navLink', {
                y: -18,
                autoAlpha: 0,
                stagger: 0.08,
                duration: 0.45,
            }, '-=0.25')
            .from('.navbar-right .navLink, .navbar-right .dropdownTrigger', {
                x: 24,
                autoAlpha: 0,
                stagger: 0.06,
                duration: 0.4,
            }, '-=0.3');
    }, { scope: navRef });

    useGSAP(() => {
        if (!isOpen || !dropdownPanelRef.current) return;

        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

        tl.fromTo(
            dropdownPanelRef.current,
            { autoAlpha: 0, y: -14, scale: 0.96, transformOrigin: 'top right' },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.25 },
        ).from('.dropdownItem', {
            x: 14,
            autoAlpha: 0,
            stagger: 0.05,
            duration: 0.2,
        }, '-=0.15');
    }, { scope: dropdownRef, dependencies: [isOpen], revertOnUpdate: true });

    return (
        <nav className="nav" ref={navRef}>
            <div className='navbar-left'>
                <Link className="navLink" to="/">RKJR</Link>
            </div>

            <div className='navbar-links'>
                <Link className="navLink" to="/about">About</Link>
                <Link className="navLink" to="/shop">Shop</Link>
                <Link className="navLink" to="/products">Products</Link>
            </div>

            <div className="navbar-right">
            {user.isAuth ? (
                <div className="navDropdown" ref={dropdownRef}>
                    <button
                        className={`navLink dropdownTrigger ${isOpen ? 'active' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                        }}
                    >
                        Account <span className="arrow">{isOpen ? '^' : 'v'}</span>
                    </button>
                    {isOpen && (
                        <div className="dropdownContent" ref={dropdownPanelRef}>
                            <Link className="dropdownItem" to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
                            <Link className="dropdownItem" to="/cart" onClick={() => setIsOpen(false)}>Cart ({itemCount})</Link>
                            <Link className="dropdownItem" to="/orders" onClick={() => setIsOpen(false)}>{isAdmin ? 'Manage Orders' : 'Orders'}</Link>
                            <button className="dropdownItem logoutBtn" onClick={() => { logout(); setIsOpen(false); }}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className='navbar-auth'>
                    <Link className="navLink" to="/cart">Cart ({itemCount})</Link>
                    <Link className="navLink" to="/login">Login</Link>
                    <Link className="navLink" to="/signUp">Sign Up</Link>
                </div>
            )}
            </div>
        </nav>
    );
};

export default Navbar;
