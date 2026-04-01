import React, { useState, useEffect } from 'react';
import { ENDPOINTS } from '../apiConfig';
import '../styles/NewArrivalSection.css';
import QuickViewModal from './QuickViewModal.jsx';

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedProduct, setSelectedProduct] = useState(null);

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

    return (
        <div className="homeContainer">
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
                                <button className="addToCartBtn">Add to Cart</button>
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