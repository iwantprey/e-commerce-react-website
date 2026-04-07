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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navRef = useRef(null);
    const dropdownPanelRef = useRef(null);
    const mobileMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }

            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false);
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

    useGSAP(() => {
        if (!isMobileMenuOpen || !mobileMenuRef.current) return;

        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

        tl.fromTo(
            '.mobileMenuPanel',
            { autoAlpha: 0, y: -18, scale: 0.98, transformOrigin: 'top center' },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.22 },
        ).from('.mobileMenuPanel .mobileMenuItem', {
            y: -10,
            autoAlpha: 0,
            stagger: 0.045,
            duration: 0.18,
        }, '-=0.12');
    }, { scope: mobileMenuRef, dependencies: [isMobileMenuOpen], revertOnUpdate: true });

    const handleMenuToggle = (event) => {
        event.stopPropagation();
        setIsMobileMenuOpen((current) => !current);
    };

    const closeMenus = () => {
        setIsOpen(false);
        setIsMobileMenuOpen(false);
    };

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
            <div className="mobileMenuWrapper" ref={mobileMenuRef}>
                <button
                    className={`mobileMenuButton ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={handleMenuToggle}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    <span />
                    <span />
                    <span />
                </button>
                {isMobileMenuOpen && (
                    <div className="mobileMenuPanel">
                        <Link className="mobileMenuItem" to="/about" onClick={closeMenus}>About</Link>
                        <Link className="mobileMenuItem" to="/shop" onClick={closeMenus}>Shop</Link>
                        <Link className="mobileMenuItem" to="/products" onClick={closeMenus}>Products</Link>
                        <Link className="mobileMenuItem" to="/cart" onClick={closeMenus}>Cart ({itemCount})</Link>
                        {user.isAuth ? (
                            <>
                                <Link className="mobileMenuItem" to="/profile" onClick={closeMenus}>Profile</Link>
                                <Link className="mobileMenuItem" to="/orders" onClick={closeMenus}>{isAdmin ? 'Manage Orders' : 'Orders'}</Link>
                                <button className="mobileMenuItem mobileMenuLogout" onClick={() => { logout(); closeMenus(); }}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link className="mobileMenuItem" to="/login" onClick={closeMenus}>Login</Link>
                                <Link className="mobileMenuItem mobileMenuAccent" to="/signUp" onClick={closeMenus}>Sign Up</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
            {user.isAuth ? (
                <div className="navDropdown" ref={dropdownRef}>
                    <button
                        className={`navLink dropdownTrigger ${isOpen ? 'active' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                            setIsMobileMenuOpen(false);
                        }}
                    >
                        Account <span className="arrow">{isOpen ? '^' : 'v'}</span>
                    </button>
                    {isOpen && (
                        <div className="dropdownContent" ref={dropdownPanelRef}>
                            <Link className="dropdownItem" to="/profile" onClick={closeMenus}>Profile</Link>
                            <Link className="dropdownItem" to="/cart" onClick={closeMenus}>Cart ({itemCount})</Link>
                            <Link className="dropdownItem" to="/orders" onClick={closeMenus}>{isAdmin ? 'Manage Orders' : 'Orders'}</Link>
                            <button className="dropdownItem logoutBtn" onClick={() => { logout(); closeMenus(); }}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className='navbar-auth'>
                    <Link className="navLink" to="/cart" onClick={closeMenus}>Cart ({itemCount})</Link>
                    <Link className="navLink" to="/login" onClick={closeMenus}>Login</Link>
                    <Link className="navLink" to="/signUp" onClick={closeMenus}>Sign Up</Link>
                </div>
            )}
            </div>
        </nav>
    );
};

export default Navbar;
