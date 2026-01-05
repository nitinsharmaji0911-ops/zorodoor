"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
}

export interface Order {
    id: string;
    date: string;
    status: "processing" | "shipped" | "delivered" | "cancelled";
    total: number;
    items: number;
}

interface UserContextType {
    user: User | null;
    isAuthenticated: boolean;
    orders: Order[];
    login: (email: string, password: string) => boolean;
    logout: () => void;
    updateUser: (data: Partial<User>) => void;
    addOrder: (order: Order) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock user for demo purposes
const MOCK_USER: User = {
    id: "user_001",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    address: "123 Streetwear Ave",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
};

const MOCK_ORDERS: Order[] = [
    {
        id: "ORD-001",
        date: "2026-01-01",
        status: "delivered",
        total: 299.97,
        items: 3,
    },
    {
        id: "ORD-002",
        date: "2026-01-03",
        status: "shipped",
        total: 149.99,
        items: 1,
    },
];

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem("zorodoor-user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
            setOrders(MOCK_ORDERS);
        }
    }, []);

    const login = (email: string, password: string): boolean => {
        // Mock authentication - in production, this would call an API
        if (email && password) {
            setUser(MOCK_USER);
            setIsAuthenticated(true);
            setOrders(MOCK_ORDERS);
            localStorage.setItem("zorodoor-user", JSON.stringify(MOCK_USER));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        setOrders([]);
        localStorage.removeItem("zorodoor-user");
    };

    const updateUser = (data: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...data };
            setUser(updatedUser);
            localStorage.setItem("zorodoor-user", JSON.stringify(updatedUser));
        }
    };

    const addOrder = (order: Order) => {
        setOrders(prev => [order, ...prev]);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                isAuthenticated,
                orders,
                login,
                logout,
                updateUser,
                addOrder,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within UserProvider");
    }
    return context;
}
