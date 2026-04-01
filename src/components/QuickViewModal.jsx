import React from 'react';
import '../styles/QuickViewModal.css';

const QuickViewModal = ({ product, onClose }) => {
  if (!product) return null;

  // Normalize product fields as they vary between NewArrivalSection and ShopPage
  const title = product.name || product.title;
  const price = typeof product.price === 'number' ? `$${product.price}` : product.price;

  return (
    <div className="modalOverlay" onClick={onClose}>
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
              <button className="addToCartBtn">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;