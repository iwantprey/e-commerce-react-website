import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../lib/productService.js';
import AddToCartButton from './AddToCartButton';
import QuickViewModal from './QuickViewModal';
import { gsap, useGSAP } from '../lib/gsap.js';
import '../styles/NewArrivalSection.css';

const NewArrivalSection = () => {
  const sectionRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
      setIsLoading(false);
    });
  }, []);

  useGSAP(() => {
    // Entrance Animations
    gsap.from('.sectionHeader > *', {
      y: 30,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'expo.out',
      clearProps: 'all',
      scrollTrigger: {
        trigger: '.sectionHeader',
        start: 'top 85%',
      },
    });

    gsap.from('.viewAllButton', {
      y: 20,
      autoAlpha: 0,
      duration: 0.6,
      ease: 'expo.out',
      clearProps: 'all',
      scrollTrigger: {
        trigger: '.viewAllContainer',
        start: 'top 92%',
      },
    });

    if (!products.length) return;

    gsap.from('.productCard', {
      y: 40,
      autoAlpha: 0,
      scale: 0.98,
      stagger: 0.05,
      duration: 0.8,
      ease: 'expo.out',
      clearProps: 'all',
      scrollTrigger: {
        trigger: '.productGrid',
        start: 'top 80%',
      },
    });

    gsap.from('.badge', {
      scale: 0,
      autoAlpha: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: 'back.out(1.4)',
      clearProps: 'all',
      scrollTrigger: {
        trigger: '.productGrid',
        start: 'top 80%',
      },
    });

    // Card Hover Interactions
    const cards = gsap.utils.toArray('.productCard');
    const cleanups = cards.map((card) => {
      const image = card.querySelector('img');

      const handleMove = (event) => {
        const bounds = card.getBoundingClientRect();
        const rotateY = gsap.utils.mapRange(0, bounds.width, -8, 8, event.clientX - bounds.left);
        const rotateX = gsap.utils.mapRange(0, bounds.height, 8, -8, event.clientY - bounds.top);

        gsap.to(card, {
          rotateX,
          rotateY,
          y: -12,
          duration: 0.35,
          ease: 'power2.out',
          transformPerspective: 1000,
        });

        if (image) {
          gsap.to(image, {
            scale: 1.08,
            duration: 0.35,
            ease: 'power2.out',
          });
        }
      };

      const handleLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          y: 0,
          duration: 0.45,
          ease: 'power3.out',
        });

        if (image) {
          gsap.to(image, {
            scale: 1,
            duration: 0.45,
            ease: 'power3.out',
          });
        }
      };

      card.addEventListener('mousemove', handleMove);
      card.addEventListener('mouseleave', handleLeave);

      return () => {
        card.removeEventListener('mousemove', handleMove);
        card.removeEventListener('mouseleave', handleLeave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, { scope: sectionRef, dependencies: [products] });

  return (
    <section className="newArrivals" ref={sectionRef}>
      <div className="sectionHeader">
        <h2 className="sectionTitle">New & Popular</h2>
        <p className="sectionSubtitle">Discover our latest fashion drops and community favorites designed for your style.</p>
      </div>
      
      {isLoading ? <p style={{textAlign: 'center'}}>Loading latest collection...</p> : (
      
      products.length ? (
      <div className="productGrid">
        {products.map((product) => (
          <div key={product.id} className="productCard" onClick={() => setSelectedProduct(product)}>
            <div className="productImage">
              <img src={product.image} alt={product.title} />
              {product.tag && (
                <div className={`badge ${product.tag.toLowerCase()}`}>{product.tag}</div>
              )}
            </div>
            <div className="productInfo">
              <h3 className="productName">{product.title}</h3>
              <p className="productPrice">${product.price}</p>
              <AddToCartButton product={product} />
            </div>
          </div>
        ))}
      </div>
      ) : (
      <p className="emptyProductsMessage">The latest collection will appear here soon.</p>
      )
      )}
      
      <div className="viewAllContainer">
        <Link to="/products" className="viewAllButton">
          View All Products
        </Link>
      </div>

      <QuickViewModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </section>
  );
};

export default NewArrivalSection;
