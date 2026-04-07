import React, { useState, useEffect, useRef } from 'react';
import { ENDPOINTS } from '../apiConfig.js';
import '../styles/NewArrivalSection.css';
import QuickViewModal from '../components/QuickViewModal.jsx';
import AddToCartButton from '../components/AddToCartButton.jsx';
import { gsap, useGSAP } from '../lib/gsap.js';

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const pageRef = useRef(null);

    useEffect(() => {
        fetch(ENDPOINTS.PRODUCTS)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching shop products:", err);
                setIsLoading(false);
            });
    }, []);

    const filteredProducts = selectedCategory === 'All' 
        ? products 
        : products.filter(product => product.category === selectedCategory);

    useGSAP(() => {
        gsap.from('.sectionHeader > *', {
            y: 26,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 0.55,
            ease: 'power3.out',
        });

        gsap.from('.filterBtn', {
            y: 20,
            autoAlpha: 0,
            stagger: 0.06,
            duration: 0.35,
            ease: 'power3.out',
        });

        if (!filteredProducts.length) return;

        gsap.from('.productCard', {
            y: 48,
            autoAlpha: 0,
            stagger: 0.07,
            duration: 0.7,
            ease: 'power3.out',
        });

        gsap.to('.filterBtn.active', {
            scale: 1.04,
            duration: 0.25,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1,
        });
    }, { scope: pageRef, dependencies: [filteredProducts, selectedCategory], revertOnUpdate: true });

    return (
        <div className="homeContainer" ref={pageRef}>
            <header className="sectionHeader">
                <h1 className="sectionTitle">Shop All</h1>
                <p className="sectionSubtitle">Explore our complete collection of modern fashion essentials.</p>
            </header>

            <div className="filterContainer">
                {['All', 'Men', 'Women', 'Accessories'].map(cat => (
                    <button 
                        key={cat} 
                        className={`filterBtn ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {isLoading ? (
                <p>Loading the latest styles...</p>
            ) : (
                <div className="productGrid">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="productCard" onClick={() => setSelectedProduct(product)}>
                            <div className="productImage">
                                <img src={product.image} alt={product.title} />
                            </div>
                            <div className="productInfo">
                                <h3 className="productName">{product.title}</h3>
                                <p className="productPrice">${product.price}</p>
                                <AddToCartButton product={product} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <QuickViewModal 
                product={selectedProduct} 
                onClose={() => setSelectedProduct(null)} 
            />
        </div>
    );
};

export default ShopPage;
