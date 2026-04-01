import React, { useState, useEffect } from 'react';
import { ENDPOINTS } from '../apiConfig';

function ProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    return(
        <div className="homeContainer">
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
                                <button className="addToCartBtn">Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductPage;