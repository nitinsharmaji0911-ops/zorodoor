"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { useCart } from "@/lib/contexts/CartContext";
import { useWishlist } from "@/lib/contexts/WishlistContext";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { itemCount } = useCart();
    const router = useRouter();
    const { wishlist } = useWishlist();

    const navLinks = [
        { label: "Hoodies", href: "/shop?category=hoodies" },
        { label: "T-Shirts", href: "/shop?category=t-shirts" },
        { label: "Lower", href: "/shop?category=lower" },
    ];

    return (
        <>
            <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border transition-colors duration-300">
                <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                    <div className="flex items-center justify-between h-20 relative">

                        {/* 1. Logo */}
                        <Link href="/" className="flex-shrink-0 z-10">
                            <div className="relative h-12 w-48">
                                <Image
                                    src="/logo.png"
                                    alt="ZORODOOR"
                                    fill
                                    className="object-contain object-left dark:invert"
                                    priority
                                />
                            </div>
                        </Link>

                        {/* 2. Desktop Navigation - Centered Absolute */}
                        {/* CRITICAL FIX: Ensure this is visually hidden on mobile with 'hidden' class and only 'flex' on lg screens */}
                        <div className="hidden lg:flex items-center gap-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="relative text-sm font-bold text-foreground tracking-wide uppercase group py-2"
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>

                        {/* 3. Icons & Search - Right Aligned */}
                        <div className="flex items-center gap-6 z-10">
                            {/* Search - Desktop Only */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (searchQuery.trim()) {
                                        router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
                                    }
                                }}
                                className="hidden md:flex relative group items-center"
                            >
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    // Peer class allows sibling elements to style based on this input's state
                                    className="peer w-40 focus:w-64 transition-all duration-300 bg-transparent border-b border-foreground/20 py-1 pl-0 pr-8 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary"
                                />
                                <button type="submit" className="absolute right-0 p-1">
                                    <Search
                                        size={18}
                                        className="text-foreground"
                                    />
                                </button>

                                {/* Top Search / Suggestions Dropdown */}
                                <div className="absolute top-full left-0 w-64 bg-background border border-border shadow-xl rounded-lg mt-2 py-3 px-4 opacity-0 invisible peer-focus:opacity-100 peer-focus:visible hover:opacity-100 hover:visible transition-all duration-200 z-50">
                                    <span className="text-xs font-bold text-primary dark:text-foreground/60 uppercase tracking-wider mb-2 block">Top Searches</span>
                                    <div className="flex flex-col gap-2">
                                        {["Oversized Hoodies", "Graphic Tees", "Demon Slayer", "Berserk"].map((term) => (
                                            <button
                                                key={term}
                                                type="button"
                                                onMouseDown={(e) => e.preventDefault()} // Prevents input blur
                                                onClick={() => {
                                                    setSearchQuery(term);
                                                    router.push(`/shop?search=${encodeURIComponent(term)}`);
                                                    (document.activeElement as HTMLElement)?.blur();
                                                }}
                                                className="text-left text-sm text-foreground hover:text-primary transition-colors w-full py-1"
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </form>

                            {/* Action Icons */}
                            <div className="flex items-center gap-5">
                                <Link href="/wishlist" className="relative group">
                                    <Heart size={22} className="text-foreground group-hover:text-primary transition-colors" />
                                    {wishlist.length > 0 && (
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                                    )}
                                </Link>

                                <Link href="/cart" className="relative group">
                                    <ShoppingCart size={22} className="text-foreground group-hover:text-primary transition-colors" />
                                    {itemCount > 0 && (
                                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full font-bold">
                                            {itemCount}
                                        </span>
                                    )}
                                </Link>

                                <Link href="/account" className="hidden sm:block group">
                                    <User size={22} className="text-foreground group-hover:text-primary transition-colors" />
                                </Link>

                                {/* Mobile Menu Toggle */}
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="lg:hidden text-foreground hover:text-primary transition-colors"
                                    aria-label="Toggle menu"
                                >
                                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay - Separate from Nav structure to avoid layout conflicts */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-background pt-24 px-6 lg:hidden animate-in fade-in slide-in-from-top-10 duration-200">
                    <div className="flex flex-col space-y-6">
                        <div className="relative mb-8">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary"
                            />
                            <Search
                                size={18}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50"
                            />
                        </div>

                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className="pt-8 border-t border-border">
                            <Link
                                href="/account"
                                className="flex items-center gap-3 text-lg font-medium text-foreground"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <User size={20} />
                                My Account
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
