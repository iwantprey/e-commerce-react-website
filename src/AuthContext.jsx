import React, { createContext, useState } from "react";
import { ENDPOINTS } from './apiConfig';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ email: '', isAuth: false });

    const login = async (email, password) => {
        const response = await fetch(ENDPOINTS.LOGIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Invalid credentials');
        }

        const data = await response.json();
        setUser({ email: email, isAuth: true });
        return data;
    };

    const signUp = async (userData) => {
        const response = await fetch(ENDPOINTS.SIGNUP, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Registration failed. Email might already be in use.');
        }

        return await response.json();
    };

    const updateUser = async (updatedData) => {
        const response = await fetch(`${ENDPOINTS.SIGNUP}/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error('Update failed');
        }

        const data = await response.json();
        setUser({ ...data, isAuth: true });
        return data;
    };

    const logout = () => {
        setUser({ email: '', isAuth: false });
    };

    return (
        <AuthContext.Provider value={{ user, login, signUp, updateUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};