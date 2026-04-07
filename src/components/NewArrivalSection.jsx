import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NewArrivalSection.css';
import { ENDPOINTS } from '../apiConfig';
import QuickViewModal from './QuickViewModal.jsx';
import AddToCartButton from './AddToCartButton.jsx';
import { gsap, useGSAP } from '../lib/gsap.js';

const NewArrivalSection = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Now using the configured endpoint. 
    // For now, keep the external URL if you don't have a local backend running yet.
    fetch(ENDPOINTS.PRODUCTS || 'https://fakestoreapi.com/products/category/men\'s clothing')
      .then(res => res.json())
      .then(data => {
        // Map API data to our existing UI structure
        const formattedData = data.slice(0, 8).map((item, index) => ({
          id: item.id,
          name: item.title,
          category: item.category,
          price: `$${item.price}`,
          image: item.image,
          tag: index < 4 ? 'New' : 'Popular'
        }));
        setProducts(formattedData);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to load products:", err);
        setIsLoading(false);
      });
  }, []);

  useGSAP(() => {
    gsap.from('.sectionHeader > *', {
      y: 30,
      autoAlpha: 0,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.sectionHeader',
        start: 'top 82%',
      },
    });

    gsap.from('.viewAllButton', {
      y: 24,
      autoAlpha: 0,
      duration: 0.55,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.viewAllContainer',
        start: 'top 90%',
      },
    });

    if (!products.length) return;

    gsap.from('.productCard', {
      y: 56,
      autoAlpha: 0,
      scale: 0.94,
      stagger: 0.08,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.productGrid',
        start: 'top 78%',
      },
    });

    gsap.from('.badge', {
      scale: 0,
      autoAlpha: 0,
      stagger: 0.08,
      duration: 0.45,
      ease: 'back.out(2)',
      scrollTrigger: {
        trigger: '.productGrid',
        start: 'top 78%',
      },
    });

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
  }, { scope: sectionRef, dependencies: [products], revertOnUpdate: true });

  return (
    <section className="newArrivals" ref={sectionRef}>
      <div className="sectionHeader">
        <h2 className="sectionTitle">New & Popular</h2>
        <p className="sectionSubtitle">Discover our latest fashion drops and community favorites designed for your style.</p>
      </div>
      
      {isLoading ? <p style={{textAlign: 'center'}}>Loading latest collection...</p> : (
      
      <div className="productGrid">
        {products.map((product) => (
          <div key={product.id} className="productCard" onClick={() => setSelectedProduct(product)}>
            <div className="productImage">
              <img src={product.image} alt={product.name} />
              <div className={`badge ${product.tag.toLowerCase()}`}>{product.tag}</div>
            </div>
            <div className="productInfo">
              <h3 className="productName">{product.name}</h3>
              <p className="productPrice">{product.price}</p>
              <AddToCartButton product={product} />
            </div>
          </div>
        ))}
      </div>
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
