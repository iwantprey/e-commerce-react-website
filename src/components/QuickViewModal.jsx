import React, { useEffect, useRef } from 'react';
import '../styles/QuickViewModal.css';
import AddToCartButton from './AddToCartButton.jsx';
import { gsap, useGSAP } from '../lib/gsap.js';

const QuickViewModal = ({ product, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!product) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [product]);

  useGSAP(() => {
    if (!product) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.modalOverlay', {
      autoAlpha: 0,
    }, {
      autoAlpha: 1,
      duration: 0.3,
      ease: 'power2.out',
      clearProps: 'all',
    }).fromTo('.modalContent', {
      y: 24,
      autoAlpha: 0,
      scale: 0.98,
      transformOrigin: 'center center',
    }, {
      y: 0,
      autoAlpha: 1,
      scale: 1,
      duration: 0.6,
      ease: 'expo.out',
      clearProps: 'all',
    }, '-=0.1')
      .from('.modalImage img', {
        x: -20,
        autoAlpha: 0,
        scale: 0.96,
        duration: 0.6,
        ease: 'expo.out',
        clearProps: 'all',
      }, '-=0.4')
      .from('.modalInfo > *', {
        y: 12,
        autoAlpha: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'expo.out',
        clearProps: 'all',
      }, '-=0.5');
  }, { scope: modalRef, dependencies: [product], revertOnUpdate: true });

  if (!product) return null;

  // Normalize product fields as they vary between NewArrivalSection and ShopPage
  const title = product.name || product.title;
  const price = typeof product.price === 'number' ? `$${product.price}` : product.price;

  return (
    <div className="modalOverlay" onClick={onClose} ref={modalRef}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <button className="closeBtn" onClick={onClose}>&times;</button>
        <div className="modalBody">
          <div className="modalImage">
            <img src={product.image} alt={title} />
          </div>
          <div className="modalInfo">
            <p className="modalCategory">{product.category || 'Fashion'}</p>
            <h2 className="modalTitle">{title}</h2>
            <p className="modalPrice">{price}</p>
            <p className="modalDescription">
              This premium piece from our collection is designed for the modern lifestyle. 
              Combining timeless elegance with everyday comfort, it's a versatile addition 
              to any wardrobe.
            </p>
            <div className="modalActions">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
