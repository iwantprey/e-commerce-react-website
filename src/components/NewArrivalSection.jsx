import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NewArrivalSection.css';
import { ENDPOINTS } from '../apiConfig';
import QuickViewModal from './QuickViewModal.jsx';

const NewArrivalSection = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  return (
    <section className="newArrivals">
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
              <button className="addToCartBtn">Add to Cart</button>
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