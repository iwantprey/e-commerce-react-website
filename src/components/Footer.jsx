import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import { gsap, useGSAP } from '../lib/gsap.js';

const Footer = () => {
  const footerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.footerColumn', {
      y: 36,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 88%',
      },
    });

    gsap.from('.footerBottom', {
      y: 18,
      autoAlpha: 0,
      duration: 0.45,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.footerBottom',
        start: 'top 96%',
      },
    });
  }, { scope: footerRef });

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footerContainer">
        <div className="footerGrid">
          {/* Brand Overview */}
          <div className="footerColumn">
            <h3 className="footerLogo">Fashion Brand</h3>
            <p className="footerDescription">
              Elevating your everyday style with curated collections and modern essentials. 
              Quality meets comfort in every piece we create.
            </p>
          </div>

          {/* Category Links */}
          <div className="footerColumn">
            <h4 className="footerTitle">Shop</h4>
            <ul className="footerLinks">
              <li><Link to="/shop">Men's Collection</Link></li>
              <li><Link to="/shop">Women's Collection</Link></li>
              <li><Link to="/shop">Accessories</Link></li>
              <li><Link to="/shop">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="footerColumn">
            <h4 className="footerTitle">Company</h4>
            <ul className="footerLinks">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/shop">Our Shop</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="footerColumn">
            <h4 className="footerTitle">Support</h4>
            <ul className="footerLinks">
              <li><Link to="/shipping">Shipping Info</Link></li>
              <li><Link to="/returns">Returns</Link></li>
              <li><Link to="/tracking">Order Tracking</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="footerBottom">
          <p>&copy; {new Date().getFullYear()} Fashion Brand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
