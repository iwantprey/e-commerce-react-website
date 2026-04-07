import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { ENDPOINTS } from '../apiConfig';
import '../styles/ProfilePage.css';
import '../styles/OrdersPage.css';

const OrdersPage = () => {
    const { user, isAdmin } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!user.isAuth) return;

        const query = isAdmin ? ENDPOINTS.ORDERS : `${ENDPOINTS.ORDERS}?userId=${user.id}`;

        fetch(query)
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
                setLoading(false);
            })
            .catch(() => {
                setMessage('Unable to load orders right now.');
                setLoading(false);
            });
    }, [isAdmin, user.id, user.isAuth]);

    if (!user.isAuth) {
        return <Navigate to="/login" replace state={{ authMessage: 'Please sign in to view your orders.' }} />;
    }

    const updateStatus = async (orderId, status) => {
        const response = await fetch(`${ENDPOINTS.ORDERS}/${orderId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            setMessage('Unable to update order status.');
            return;
        }

        const updatedOrder = await response.json();
        setOrders((currentOrders) => currentOrders.map((order) => (
            order.id === updatedOrder.id ? updatedOrder : order
        )));
    };

    return (
        <div className="profileWrapper">
            <div className="profileCard ordersCard">
                <div className="sectionHeader">
                    <h1 className="sectionTitle">{isAdmin ? 'Admin Orders' : 'Your Orders'}</h1>
                    <p className="sectionSubtitle">
                        {isAdmin ? 'Manage all customer orders from one place.' : 'Track the orders you have placed.'}
                    </p>
                </div>

                {message && <p className="error">{message}</p>}

                {loading ? (
                    <p>Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p className="emptyOrders">No orders found yet.</p>
                ) : (
                    <div className="ordersTableWrapper">
                        <table className="ordersTable">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Placed</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>#{order.id}</td>
                                        <td>{order.customerName || order.email}</td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>{order.items?.map((item) => `${item.title} x${item.quantity}`).join(', ')}</td>
                                        <td>${Number(order.total).toFixed(2)}</td>
                                        <td>
                                            {isAdmin ? (
                                                <select
                                                    className="statusSelect"
                                                    value={order.status}
                                                    onChange={(event) => updateStatus(order.id, event.target.value)}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            ) : (
                                                <span className={`orderStatus ${order.status}`}>{order.status}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
