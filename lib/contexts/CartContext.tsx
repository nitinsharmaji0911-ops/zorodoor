"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export interface CartItem {
    id?: string; // Database ID (only for authenticated users)
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
    isLoading: boolean;
    addItem: (item: Omit<CartItem, 'id'>) => Promise<void>;
    removeItem: (productId: string, size: string) => Promise<void>;
    updateQuantity: (productId: string, size: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    applyDiscount: (code: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const [items, setItems] = useState<CartItem[]>([]);
    const [discount, setDiscount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMigrated, setHasMigrated] = useState(false);

    const isAuthenticated = status === "authenticated";

    // Load cart on mount and when authentication changes
    useEffect(() => {
        if (status === "loading") return;

        if (isAuthenticated) {
            // Load from database
            loadCartFromDatabase();
        } else {
            // Load from localStorage for guests
            loadCartFromLocalStorage();
        }
    }, [isAuthenticated, status]);

    // Migrate localStorage cart to database when user logs in
    useEffect(() => {
        if (isAuthenticated && !hasMigrated) {
            migrateLocalStorageToDatabase();
            setHasMigrated(true);
        }
    }, [isAuthenticated, hasMigrated]);

    // Save to localStorage for guests only
    useEffect(() => {
        if (!isAuthenticated && status !== "loading") {
            localStorage.setItem("zorodoor-cart", JSON.stringify(items));
        }
    }, [items, isAuthenticated, status]);

    const loadCartFromLocalStorage = () => {
        try {
            const savedCart = localStorage.getItem("zorodoor-cart");
            if (savedCart) {
                setItems(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error("Error loading cart from localStorage:", error);
        }
    };

    const loadCartFromDatabase = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/cart");

            if (response.ok) {
                const data = await response.json();
                setItems(data.items || []);
            } else if (response.status === 401) {
                // Not authenticated, fallback to localStorage
                loadCartFromLocalStorage();
            }
        } catch (error) {
            console.error("Error loading cart from database:", error);
            // Fallback to localStorage on error
            loadCartFromLocalStorage();
        } finally {
            setIsLoading(false);
        }
    };

    const migrateLocalStorageToDatabase = async () => {
        try {
            const savedCart = localStorage.getItem("zorodoor-cart");
            if (!savedCart) return;

            const localItems: CartItem[] = JSON.parse(savedCart);
            if (localItems.length === 0) return;

            console.log("Migrating cart from localStorage to database...");

            // Add each item to database
            for (const item of localItems) {
                await fetch("/api/cart", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        productId: item.productId,
                        quantity: item.quantity,
                        size: item.size,
                        color: item.color,
                    }),
                });
            }

            // Clear localStorage after successful migration
            localStorage.removeItem("zorodoor-cart");

            // Reload cart from database
            await loadCartFromDatabase();

            console.log("Cart migration completed!");
        } catch (error) {
            console.error("Error migrating cart:", error);
        }
    };

    const addItem = async (newItem: Omit<CartItem, 'id'>) => {
        if (isAuthenticated) {
            // Add to database
            try {
                setIsLoading(true);
                const response = await fetch("/api/cart", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        productId: newItem.productId,
                        quantity: newItem.quantity,
                        size: newItem.size,
                        color: newItem.color,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setItems(data.items || []);
                }
            } catch (error) {
                console.error("Error adding item to cart:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            // Add to localStorage (guest user)
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
        }
    };

    const removeItem = async (productId: string, size: string) => {
        if (isAuthenticated) {
            // Remove from database
            try {
                const item = items.find(i => i.productId === productId && i.size === size);
                if (!item?.id) return;

                setIsLoading(true);
                const response = await fetch(`/api/cart/${item.id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    setItems(prev => prev.filter(i => i.id !== item.id));
                }
            } catch (error) {
                console.error("Error removing item from cart:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            // Remove from localStorage
            setItems((prevItems) =>
                prevItems.filter(
                    (item) => !(item.productId === productId && item.size === size)
                )
            );
        }
    };

    const updateQuantity = async (productId: string, size: string, quantity: number) => {
        if (quantity <= 0) {
            await removeItem(productId, size);
            return;
        }

        if (isAuthenticated) {
            // Update in database
            try {
                const item = items.find(i => i.productId === productId && i.size === size);
                if (!item?.id) return;

                setIsLoading(true);
                const response = await fetch(`/api/cart/${item.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ quantity }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setItems(data.items || []);
                }
            } catch (error) {
                console.error("Error updating cart item:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            // Update in localStorage
            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.productId === productId && item.size === size
                        ? { ...item, quantity: Math.min(quantity, 10) }
                        : item
                )
            );
        }
    };

    const clearCart = async () => {
        if (isAuthenticated) {
            // Clear from database
            try {
                setIsLoading(true);
                await fetch("/api/cart", { method: "DELETE" });
                setItems([]);
                setDiscount(0);
            } catch (error) {
                console.error("Error clearing cart:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            // Clear from localStorage
            setItems([]);
            setDiscount(0);
        }
    };

    const applyDiscount = (code: string): boolean => {
        const discountCodes: Record<string, number> = {
            WELCOME10: 0.1,
            ZORO20: 0.2,
            BRUTAL30: 0.3,
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
                isLoading,
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
