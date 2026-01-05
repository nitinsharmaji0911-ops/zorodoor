"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    color?: string;
    image: string;
}

interface CartContextType {
    items: CartItem[];
    itemCount: number;
    total: number;
    discount: number;
    addItem: (item: CartItem) => void;
    removeItem: (productId: string, size: string) => void;
    updateQuantity: (productId: string, size: string, quantity: number) => void;
    clearCart: () => void;
    applyDiscount: (code: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [discount, setDiscount] = useState(0);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("zorodoor-cart");
        if (savedCart) {
            setItems(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("zorodoor-cart", JSON.stringify(items));
    }, [items]);

    const addItem = (newItem: CartItem) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) =>
                    item.productId === newItem.productId && item.size === newItem.size
            );

            if (existingItem) {
                return prevItems.map((item) =>
                    item.productId === newItem.productId && item.size === newItem.size
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                );
            }

            return [...prevItems, newItem];
        });
    };

    const removeItem = (productId: string, size: string) => {
        setItems((prevItems) =>
            prevItems.filter(
                (item) => !(item.productId === productId && item.size === size)
            )
        );
    };

    const updateQuantity = (productId: string, size: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId, size);
            return;
        }

        setItems((prevItems) =>
            prevItems.map((item) =>
                item.productId === productId && item.size === size
                    ? { ...item, quantity: Math.min(quantity, 10) } // Max 10 items
                    : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
        setDiscount(0);
    };

    const applyDiscount = (code: string): boolean => {
        // Simple discount codes
        const discountCodes: Record<string, number> = {
            WELCOME10: 0.1, // 10% off
            ZORO20: 0.2, // 20% off
            BRUTAL30: 0.3, // 30% off
        };

        const discountAmount = discountCodes[code.toUpperCase()];
        if (discountAmount) {
            setDiscount(discountAmount);
            return true;
        }
        return false;
    };

    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const total = subtotal * (1 - discount);

    return (
        <CartContext.Provider
            value={{
                items,
                itemCount,
                total,
                discount,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                applyDiscount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
}
