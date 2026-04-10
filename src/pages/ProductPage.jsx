import React, { useState, useEffect, useRef } from 'react';
import AddToCartButton from '../components/AddToCartButton.jsx';
import { gsap, useGSAP } from '../lib/gsap.js';
import { getProducts } from '../lib/productService.js';

function ProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const pageRef = useRef(null);

    useEffect(() => {
        getProducts()
            .then((data) => {
                setProducts(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setIsLoading(false);
            });
    }, []);

    useGSAP(() => {
        gsap.from('.sectionHeader > *', {
            y: 20,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'expo.out',
            clearProps: 'all',
        });

        if (!products.length) return;

        gsap.from('.productCard', {
            y: 32,
            autoAlpha: 0,
            scale: 0.98,
            stagger: 0.06,
            duration: 0.8,
            ease: 'expo.out',
            clearProps: 'all',
        });
    }, { scope: pageRef, dependencies: [products], revertOnUpdate: true });

    return(
        <div className="homeContainer" ref={pageRef}>
            <header className="sectionHeader">
                <h1 className="sectionTitle">All Products</h1>
                <p className="sectionSubtitle">Curated essentials for a modern wardrobe.</p>
            </header>
            {isLoading ? (
                <p>Loading products...</p>
            ) : products.length ? (
                <div className="productGrid">
                    {products.map((product) => (
                        <div key={product.id} className="productCard">
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
                <p className="emptyProductsMessage">No products available right now.</p>
            )}
        </div>
    );
}

export default ProductPage;
