import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { CartContext } from '../CartContext';

const AddToCartButton = ({ product, className = 'addToCartBtn', onAdded, children = 'Add to Cart' }) => {
    const { user } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [feedback, setFeedback] = useState('');

    const handleClick = (event) => {
        event.stopPropagation();

        if (!user.isAuth) {
            navigate('/signUp', {
                state: {
                    from: location.pathname,
                    authMessage: 'Create an account to add items to your cart and place orders.',
                    pendingCartItem: product,
                },
            });
            return;
        }

        addToCart(product);
        setFeedback('Added');
        window.setTimeout(() => setFeedback(''), 1200);

        if (onAdded) {
            onAdded();
        }
    };

    return (
        <button className={className} onClick={handleClick}>
            {feedback || children}
        </button>
    );
};

export default AddToCartButton;
