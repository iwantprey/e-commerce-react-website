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

    // Entrance Animation
    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

        tl.from('.navbar-left .navLink', {
            x: -24,
            autoAlpha: 0,
            duration: 0.8,
            clearProps: 'all',
        })
            .from('.navbar-links .navLink', {
                y: -18,
                autoAlpha: 0,
                stagger: 0.05,
                duration: 0.7,
                clearProps: 'all',
            }, '-=0.5')
            .from('.navbar-right > *', {
                x: 24,
                autoAlpha: 0,
                stagger: 0.05,
                duration: 0.6,
                clearProps: 'all',
            }, '-=0.5');
    }, { scope: navRef });

    // Dropdown Panel Animation
    useGSAP(() => {
        if (isOpen && dropdownPanelRef.current) {
            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
            tl.fromTo(dropdownPanelRef.current,
                { autoAlpha: 0, y: -10, scale: 0.95, transformOrigin: 'top right' },
                { autoAlpha: 1, y: 0, scale: 1, duration: 0.25, clearProps: 'opacity,visibility,transform' }
            ).from('.dropdownItem', {
                x: 10,
                autoAlpha: 0,
                stagger: 0.04,
                duration: 0.2,
                clearProps: 'all'
            }, '-=0.1');
        }
    }, { scope: dropdownRef, dependencies: [isOpen] });

    // Mobile Menu Panel Animation
    useGSAP(() => {
        const panel = document.querySelector('.mobileMenuPanel');
        if (isMobileMenuOpen && panel) {
            gsap.fromTo(panel,
                { autoAlpha: 0, x: 20, scale: 0.98 },
                { autoAlpha: 1, x: 0, scale: 1, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
            );
        }
    }, { scope: navRef, dependencies: [isMobileMenuOpen] });

    const handleMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsOpen(false);
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
