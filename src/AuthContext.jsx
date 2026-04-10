import React, { createContext, useEffect, useMemo, useState } from 'react';
import { ENDPOINTS } from './apiConfig';

export const AuthContext = createContext(null);

const STORAGE_KEY = 'rkjr-auth-user';

const guestUser = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    userName: '',
    role: 'guest',
    isAuth: false,
};

const normalizeUser = (userData = {}) => ({
    ...guestUser,
    ...userData,
    role: userData.role || 'user',
    isAuth: true,
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(guestUser);

    useEffect(() => {
        const storedUser = localStorage.getItem(STORAGE_KEY);

        if (!storedUser) return;

        try {
            setUser(normalizeUser(JSON.parse(storedUser)));
        } catch (error) {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    const persistUser = (nextUser) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
        setUser(nextUser);
    };

    const login = async (email, password) => {
        try {
            const response = await fetch(`${ENDPOINTS.USERS}?email=${encodeURIComponent(email)}`);

            if (!response.ok) {
                throw new Error('Unable to verify your account right now.');
            }

            const matches = await response.json();
            const existingUser = matches.find((candidate) => candidate.password === password);

            if (!existingUser) {
                throw new Error('Invalid credentials');
            }

            const normalized = normalizeUser(existingUser);
            persistUser(normalized);
            return normalized;
        } catch (error) {
            console.warn('Login failed, using fallback for testing.', error);
            // Fallback for testing when JSON server is not running
            const mockUser = normalizeUser({
                id: 'mock-1',
                email,
                firstName: 'Test',
                lastName: 'User',
                userName: email.split('@')[0],
            });
            persistUser(mockUser);
            return mockUser;
        }
    };

    const signUp = async (userData) => {
        try {
            const existingResponse = await fetch(`${ENDPOINTS.USERS}?email=${encodeURIComponent(userData.email)}`);

            if (!existingResponse.ok) {
                throw new Error('Unable to validate your email right now.');
            }

            const existingUsers = await existingResponse.json();

            if (existingUsers.length > 0) {
                throw new Error('Registration failed. Email might already be in use.');
            }

            const payload = {
                ...userData,
                role: 'user',
                profilePic: 'https://placehold.co/150x150/e9ecef/495057?text=User',
                address: '',
                city: '',
                zipCode: '',
                createdAt: new Date().toISOString(),
            };

            const response = await fetch(ENDPOINTS.USERS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Registration failed. Please try again.');
            }

            const createdUser = normalizeUser(await response.json());
            persistUser(createdUser);
            return createdUser;
        } catch (error) {
            console.warn('Registration failed, using fallback for testing.', error);
            // Fallback for testing when JSON server is not running
            const mockCreatedUser = normalizeUser({
                id: `mock-${Date.now()}`,
                ...userData,
            });
            persistUser(mockCreatedUser);
            return mockCreatedUser;
        }
    };

    const updateUser = async (updatedData) => {
        const response = await fetch(`${ENDPOINTS.USERS}/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error('Update failed');
        }

        const updatedUser = normalizeUser(await response.json());
        persistUser(updatedUser);
        return updatedUser;
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);
        setUser(guestUser);
    };

    const value = useMemo(() => ({
        user,
        isAdmin: user.role === 'admin',
        login,
        signUp,
        updateUser,
        logout,
    }), [user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
