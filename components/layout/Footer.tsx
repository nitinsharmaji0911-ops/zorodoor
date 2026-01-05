"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

export default function Footer() {
    const [email, setEmail] = useState("");
    const { showToast } = useToast();

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            showToast("Thanks for subscribing to our newsletter!", "success");
            setEmail("");
        }
    };

    return (
        <footer className="bg-[--color-primary-bg-secondary] border-t border-[--color-border] mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold text-[--color-text-primary] mb-4">
                            ZORO<span className="text-[--color-accent-cyan]">DOOR</span>
                        </h2>
                        <p className="text-[--color-text-secondary] text-sm mb-4">
                            Brutal self-expression through streetwear. Where anime meets
                            fashion.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.instagram.com/zorodoor/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[--color-text-secondary] hover:text-[--color-accent-cyan] transition-colors"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://x.com/zorodoor"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[--color-text-secondary] hover:text-[--color-accent-cyan] transition-colors"
                            >
                                <Twitter size={20} />
                            </a>
                            <a
                                href="https://www.facebook.com/profile.php?id=61582452247727"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[--color-text-secondary] hover:text-[--color-accent-cyan] transition-colors"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="http://youtube.com/@zorodoor"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[--color-text-secondary] hover:text-[--color-accent-cyan] transition-colors"
                            >
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-[--color-text-primary] font-semibold mb-4">
                            SHOP
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/shop?category=hoodies"
                                    className="text-[--color-text-secondary] hover:text-[--color-accent-cyan] text-sm transition-colors"
                                >
                                    Hoodies
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/shop?category=t-shirts"
                                    className="text-[--color-text-secondary] hover:text-[--color-accent-cyan] text-sm transition-colors"
                                >
                                    T-Shirts
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/shop?category=lowers"
                                    className="text-[--color-text-secondary] hover:text-[--color-accent-cyan] text-sm transition-colors"
                                >
                                    Lowers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-[--color-text-primary] font-semibold mb-4">
                            SUPPORT
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-[--color-text-secondary] hover:text-[--color-accent-cyan] text-sm transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-[--color-text-secondary] hover:text-[--color-accent-cyan] text-sm transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/size-guide"
                                    className="text-[--color-text-secondary] hover:text-[--color-accent-cyan] text-sm transition-colors"
                                >
                                    Size Guide
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/shipping"
                                    className="text-[--color-text-secondary] hover:text-[--color-accent-cyan] text-sm transition-colors"
                                >
                                    Shipping & Returns
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-[--color-text-secondary] hover:text-[--color-accent-cyan] text-sm transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-[--color-text-secondary] hover:text-[--color-accent-cyan] text-sm transition-colors"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faq"
                                    className="text-[--color-text-secondary] hover:text-[--color-accent-cyan] text-sm transition-colors"
                                >
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-[--color-text-primary] font-semibold mb-4">
                            NEWSLETTER
                        </h3>
                        <p className="text-[--color-text-secondary] text-sm mb-4">
                            Subscribe to get special offers and updates.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Button type="submit" variant="primary" className="w-full">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="mt-12 pt-8 border-t border-[--color-border] text-center">
                    <p className="text-[--color-text-secondary] text-sm">
                        © {new Date().getFullYear()} Zorodoor. All rights reserved. Built
                        for brutal self-expression.
                    </p>
                    <div className="mt-4 text-xs text-[--color-text-secondary]">
                        Designed & Developed by{" "}
                        <a
                            href="https://www.linkedin.com/in/nitin-sharma-503645290/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[--color-accent-cyan] hover:underline"
                        >
                            Nitin Sharma
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
