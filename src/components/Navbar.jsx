import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="nav">
            <Link className="navLink" to="/">Home</Link>
            <Link className="navLink" to="/about">About</Link>
            <Link className="navLink" to="/shop">Shop</Link>
            <Link className="navLink" to="/products">Products</Link>
            
            {user.isAuth ? (
                <div className="navDropdown" ref={dropdownRef}>
                    <button 
                        className={`navLink dropdownTrigger ${isOpen ? 'active' : ''}`} 
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                        }}
                    >
                        Account <span className="arrow">{isOpen ? '▴' : '▾'}</span>
                    </button>
                    {isOpen && (
                        <div className="dropdownContent">
                            <Link className="dropdownItem" to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
                            <Link className="dropdownItem" to="/orders" onClick={() => setIsOpen(false)}>Orders</Link>
                            <button className="dropdownItem logoutBtn" onClick={() => { logout(); setIsOpen(false); }}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <Link className="navLink" to="/login">Login</Link>
                    <Link className="navLink" to="/signUp">Sign Up</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;