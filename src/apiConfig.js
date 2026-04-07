/**
 * Centralized API Configuration
 * Replace BASE_URL with your actual backend or BaaS endpoint (e.g., Supabase, Firebase, or Express)
 */
export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const ENDPOINTS = {
    USERS: `${BASE_URL}/users`,
    PRODUCTS: `${BASE_URL}/products`,
    ORDERS: `${BASE_URL}/orders`,
};
