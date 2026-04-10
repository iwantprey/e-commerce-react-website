import React, { useState, useEffect, useRef } from 'react';
import '../styles/NewArrivalSection.css';
import QuickViewModal from '../components/QuickViewModal.jsx';
import AddToCartButton from '../components/AddToCartButton.jsx';
import { gsap, useGSAP } from '../lib/gsap.js';
import { getProducts } from '../lib/productService.js';

const ShopPage = () => {
    const categories = ['All', 'Men', 'Women', 'Accessories'];
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const pageRef = useRef(null);

    useEffect(() => {
        getProducts()
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
            y: 20,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'expo.out',
            clearProps: 'all',
        });

        gsap.from('.filterBtn', {
            y: 12,
            autoAlpha: 0,
            stagger: 0.05,
            duration: 0.6,
            ease: 'expo.out',
            clearProps: 'all',
        });

        if (!filteredProducts.length) return;

        gsap.from('.productCard', {
            y: 30,
            autoAlpha: 0,
            stagger: 0.05,
            duration: 0.8,
            ease: 'expo.out',
            clearProps: 'all',
        });
    }, { scope: pageRef, dependencies: [filteredProducts, selectedCategory], revertOnUpdate: true });

    return (
        <div className="homeContainer shopPage" ref={pageRef}>
            <header className="sectionHeader">
                <h1 className="sectionTitle">Shop All</h1>
                <p className="sectionSubtitle">Explore our complete collection of modern fashion essentials.</p>
            </header>

            <div className="filterContainer" role="tablist" aria-label="Product categories">
                {categories.map((cat) => {
                    const isActive = selectedCategory === cat;

                    return (
                        <div
                            key={cat}
                            className={`filterChip ${isActive ? 'is-active' : ''}`}
                        >
                            <button
                                type="button"
                                className={`filterBtn ${isActive ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                                aria-pressed={isActive}
                            >
                                {cat}
                            </button>
                        </div>
                    );
                })}
            </div>

            {isLoading ? (
                <p>Loading the latest styles...</p>
            ) : filteredProducts.length ? (
                <div className="productGrid shopProductGrid">
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
            ) : (
                <p className="emptyProductsMessage">No products available in this category yet.</p>
            )}

            <QuickViewModal 
                product={selectedProduct} 
                onClose={() => setSelectedProduct(null)} 
            />
        </div>
    );
};

export default ShopPage;
