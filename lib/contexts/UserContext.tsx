"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

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
    status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    total: number;
    items: any[];
}

interface UserContextType {
    user: User | null;
    isAuthenticated: boolean;
    orders: Order[];
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    updateUser: (data: Partial<User>) => void;
    addOrder: (order: Order) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const [orders, setOrders] = useState<Order[]>([]);

    // Map session user to our User interface
    const user: User | null = session?.user ? {
        id: session.user.id || "",
        firstName: session.user.name?.split(" ")[0] || "",
        lastName: session.user.name?.split(" ").slice(1).join(" ") || "",
        email: session.user.email || "",
        // Other fields would need to be fetched from a profile API if stored in DB but not in session
    } : null;

    const isAuthenticated = status === "authenticated";

    // Fetch orders when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            fetchOrders();
        } else {
            setOrders([]);
        }
    }, [isAuthenticated]);

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/orders");
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (error) {
            console.error("Failed to fetch orders", error);
        }
    };

    const login = async (email: string, password: string): Promise<boolean> => {
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
        return !result?.error;
    };

    const logout = () => {
        signOut({ callbackUrl: "/" });
    };

    const updateUser = (data: Partial<User>) => {
        // In a real app, this would make a PATCH request to /api/user/profile
        // For now, next-auth session update is complex, so we'll just log it
        console.log("Update user not fully implemented yet", data);
    };

    const addOrder = (order: Order) => {
        // Optimistic update
        setOrders(prev => [order, ...prev]);
        // Ideally reload from server
        fetchOrders();
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
