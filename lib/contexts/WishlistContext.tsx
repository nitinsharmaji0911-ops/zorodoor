"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export interface WishlistItem {
    id: string;
    name: string;
    price: number;
    image: string;
}

interface WishlistContextType {
    wishlist: WishlistItem[];
    isLoading: boolean;
    addToWishlist: (item: WishlistItem) => Promise<void>;
    removeFromWishlist: (id: string) => Promise<void>;
    isInWishlist: (id: string) => boolean;
    clearWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
    undefined
);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMigrated, setHasMigrated] = useState(false);

    const isAuthenticated = status === "authenticated";

    // Load wishlist on mount and when authentication changes
    useEffect(() => {
        if (status === "loading") return;

        if (isAuthenticated) {
            loadWishlistFromDatabase();
        } else {
            loadWishlistFromLocalStorage();
        }
    }, [isAuthenticated, status]);

    // Migrate localStorage wishlist to database when user logs in
    useEffect(() => {
        if (isAuthenticated && !hasMigrated) {
            migrateLocalStorageToDatabase();
            setHasMigrated(true);
        }
    }, [isAuthenticated, hasMigrated]);

    // Save to localStorage for guests only
    useEffect(() => {
        if (!isAuthenticated && status !== "loading") {
            localStorage.setItem("zorodoor-wishlist", JSON.stringify(wishlist));
        }
    }, [wishlist, isAuthenticated, status]);

    const loadWishlistFromLocalStorage = () => {
        try {
            const savedWishlist = localStorage.getItem("zorodoor-wishlist");
            if (savedWishlist) {
                setWishlist(JSON.parse(savedWishlist));
            }
        } catch (error) {
            console.error("Error loading wishlist from localStorage:", error);
        }
    };

    const loadWishlistFromDatabase = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/wishlist");

            if (response.ok) {
                const data = await response.json();
                setWishlist(data || []);
            } else if (response.status === 401) {
                loadWishlistFromLocalStorage();
            }
        } catch (error) {
            console.error("Error loading wishlist from database:", error);
            loadWishlistFromLocalStorage();
        } finally {
            setIsLoading(false);
        }
    };

    const migrateLocalStorageToDatabase = async () => {
        try {
            const savedWishlist = localStorage.getItem("zorodoor-wishlist");
            if (!savedWishlist) return;

            const localItems: WishlistItem[] = JSON.parse(savedWishlist);
            if (localItems.length === 0) return;

            console.log("Migrating wishlist from localStorage to database...");

            for (const item of localItems) {
                await fetch("/api/wishlist", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ productId: item.id }),
                });
            }

            localStorage.removeItem("zorodoor-wishlist");
            await loadWishlistFromDatabase();

            console.log("Wishlist migration completed!");
        } catch (error) {
            console.error("Error migrating wishlist:", error);
        }
    };

    const addToWishlist = async (item: WishlistItem) => {
        if (isAuthenticated) {
            try {
                setIsLoading(true);
                const response = await fetch("/api/wishlist", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ productId: item.id }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setWishlist(data || []);
                }
            } catch (error) {
                console.error("Error adding to wishlist:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setWishlist((prev) => {
                if (prev.find((i) => i.id === item.id)) {
                    return prev;
                }
                return [...prev, item];
            });
        }
    };

    const removeFromWishlist = async (id: string) => {
        if (isAuthenticated) {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/wishlist/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    setWishlist(prev => prev.filter(item => item.id !== id));
                }
            } catch (error) {
                console.error("Error removing from wishlist:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setWishlist((prev) => prev.filter((item) => item.id !== id));
        }
    };

    const isInWishlist = (id: string): boolean => {
        return wishlist.some((item) => item.id === id);
    };

    const clearWishlist = async () => {
        if (isAuthenticated) {
            try {
                setIsLoading(true);
                await fetch("/api/wishlist", { method: "DELETE" });
                setWishlist([]);
            } catch (error) {
                console.error("Error clearing wishlist:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setWishlist([]);
        }
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                isLoading,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                clearWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within WishlistProvider");
    }
    return context;
}
