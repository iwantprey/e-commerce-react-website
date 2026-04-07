import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import { ENDPOINTS } from './apiConfig';

export const CartContext = createContext(null);

const getCartKey = (userId) => `rkjr-cart-${userId}`;

const normalizeProduct = (product) => ({
    id: String(product.id),
    title: product.title || product.name,
    price: typeof product.price === 'number'
        ? product.price
        : Number(String(product.price).replace(/[^0-9.]/g, '')),
    image: product.image,
    category: product.category || 'Fashion',
});

const loadStoredCart = (userId) => {
    if (!userId) return [];

    try {
        const storedItems = localStorage.getItem(getCartKey(userId));
        return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
        return [];
    }
};

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (!user.isAuth) {
            setItems([]);
            return;
        }

        setItems(loadStoredCart(user.id));
    }, [user.id, user.isAuth]);

    const persistItems = (ownerId, nextItems) => {
        if (!ownerId) return;
        localStorage.setItem(getCartKey(ownerId), JSON.stringify(nextItems));
    };

    const addToCart = (product, owner = user) => {
        if (!owner?.id) {
            return { ok: false, requiresAuth: true };
        }

        const normalizedProduct = normalizeProduct(product);
        const sourceItems = owner.id === user.id ? items : loadStoredCart(owner.id);
        const existingItem = sourceItems.find((item) => item.id === normalizedProduct.id);

        const nextItems = existingItem
            ? sourceItems.map((item) => (
                item.id === normalizedProduct.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ))
            : [...sourceItems, { ...normalizedProduct, quantity: 1 }];

        persistItems(owner.id, nextItems);

        if (owner.id === user.id) {
            setItems(nextItems);
        }

        return { ok: true };
    };

    const updateQuantity = (productId, quantity) => {
        const nextItems = quantity <= 0
            ? items.filter((item) => item.id !== productId)
            : items.map((item) => (
                item.id === productId
                    ? { ...item, quantity }
                    : item
            ));

        setItems(nextItems);
        persistItems(user.id, nextItems);
    };

    const removeFromCart = (productId) => {
        const nextItems = items.filter((item) => item.id !== productId);
        setItems(nextItems);
        persistItems(user.id, nextItems);
    };

    const clearCart = (ownerId = user.id) => {
        localStorage.removeItem(getCartKey(ownerId));
        if (ownerId === user.id) {
            setItems([]);
        }
    };

    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    const placeOrder = async () => {
        if (!user.isAuth) {
            throw new Error('Please sign in to place an order.');
        }

        if (items.length === 0) {
            throw new Error('Your cart is empty.');
        }

        const orderPayload = {
            userId: user.id,
            customerName: `${user.firstName} ${user.lastName}`.trim() || user.userName || user.email,
            email: user.email,
            role: user.role,
            status: 'pending',
            total: Number(subtotal.toFixed(2)),
            createdAt: new Date().toISOString(),
            items,
        };

        const response = await fetch(ENDPOINTS.ORDERS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderPayload),
        });

        if (!response.ok) {
            throw new Error('Failed to place order.');
        }

        const createdOrder = await response.json();
        clearCart(user.id);
        return createdOrder;
    };

    const value = useMemo(() => ({
        items,
        itemCount,
        subtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        placeOrder,
    }), [items, itemCount, subtotal, user.id, user.isAuth, user.email, user.firstName, user.lastName, user.role, user.userName]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
