import React, { useContext, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { CartContext } from '../CartContext';
import { AuthContext } from '../AuthContext';
import '../styles/ProfilePage.css';
import '../styles/CartPage.css';

const CartPage = () => {
    const { user } = useContext(AuthContext);
    const { items, subtotal, updateQuantity, removeFromCart, placeOrder } = useContext(CartContext);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    if (!user.isAuth) {
        return <Navigate to="/login" replace state={{ authMessage: 'Please sign in to access your cart.' }} />;
    }

    const handleCheckout = async () => {
        setLoading(true);
        setMessage('');

        try {
            const order = await placeOrder();
            setMessage(`Order #${order.id} placed successfully.`);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profileWrapper">
            <div className="profileCard cartPageCard">
                <div className="sectionHeader">
                    <h1 className="sectionTitle">Your Cart</h1>
                    <p className="sectionSubtitle">Review your items before placing your order.</p>
                </div>

                {message && <p className={message.includes('successfully') ? 'successMsg' : 'error'}>{message}</p>}

                {items.length === 0 ? (
                    <div className="emptyState">
                        <p>Your cart is empty right now.</p>
                        <Link className="viewAllButton" to="/shop">Continue Shopping</Link>
                    </div>
                ) : (
                    <div className="cartLayout">
                        <div className="cartItems">
                            {items.map((item) => (
                                <div key={item.id} className="cartItem">
                                    <img src={item.image} alt={item.title} className="cartItemImage" />
                                    <div className="cartItemDetails">
                                        <h3>{item.title}</h3>
                                        <p>{item.category}</p>
                                        <strong>${item.price.toFixed(2)}</strong>
                                    </div>
                                    <div className="cartItemActions">
                                        <div className="qtyControls">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                        <button className="cartRemoveBtn" onClick={() => removeFromCart(item.id)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <aside className="cartSummary">
                            <h3>Order Summary</h3>
                            <div className="summaryRow">
                                <span>Items</span>
                                <span>{items.length}</span>
                            </div>
                            <div className="summaryRow">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summaryRow total">
                                <span>Total</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <button className="themeButton" onClick={handleCheckout} disabled={loading}>
                                {loading ? 'Placing Order...' : 'Place Order'}
                            </button>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
