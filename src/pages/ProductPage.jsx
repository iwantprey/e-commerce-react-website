import React, { useState, useEffect, useRef } from 'react';
import { ENDPOINTS } from '../apiConfig';
import AddToCartButton from '../components/AddToCartButton.jsx';
import { gsap, useGSAP } from '../lib/gsap.js';

function ProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const pageRef = useRef(null);

    useEffect(() => {
        fetch(ENDPOINTS.PRODUCTS)
            .then((res) => res.json())
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
        gsap.from('h1', {
            y: 24,
            autoAlpha: 0,
            duration: 0.5,
            ease: 'power3.out',
        });

        if (!products.length) return;

        gsap.from('.productCard', {
            y: 50,
            autoAlpha: 0,
            scale: 0.95,
            stagger: 0.08,
            duration: 0.75,
            ease: 'power3.out',
        });
    }, { scope: pageRef, dependencies: [products], revertOnUpdate: true });

    return(
        <div className="homeContainer" ref={pageRef}>
            <h1>Products</h1>
            {isLoading ? (
                <p>Loading products...</p>
            ) : (
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
            )}
        </div>
    );
}

export default ProductPage;
