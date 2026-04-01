"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Logo";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [toast, setToast] = useState<{message: string, type: string} | null>(null);

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setToast({ message: "Thanks for subscribing to our newsletter!", type: "success" });
            setEmail("");
            setTimeout(() => setToast(null), 3000);
        }
    };

    return (
        <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] mt-20">
            {toast && (
                <div className="fixed bottom-4 right-4 bg-[#111] border border-[#222] text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3">
                    <span className="text-[#10B981] font-black">✓</span> 
                    <span className="text-sm font-bold tracking-wide">{toast.message}</span>
                </div>
            )}
            
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-block mb-8 hover:opacity-80 transition-opacity">
                            <Logo inverted width={200} />
                        </Link>
                        <p className="text-[#888] text-sm font-medium mb-6 leading-relaxed">
                            "If Its Boring Its Not Mine." Brutal self-expression through streetwear. Where anime meets fashion.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.instagram.com/zorodoor/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#222] flex items-center justify-center text-[#888] hover:text-[#FF3B30] hover:border-[#FF3B30] transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="https://x.com/zorodoor" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#222] flex items-center justify-center text-[#888] hover:text-[#FF3B30] hover:border-[#FF3B30] transition-colors">
                                <Twitter size={18} />
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=61582452247727" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#222] flex items-center justify-center text-[#888] hover:text-[#FF3B30] hover:border-[#FF3B30] transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="http://youtube.com/@zorodoor" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#222] flex items-center justify-center text-[#888] hover:text-[#FF3B30] hover:border-[#FF3B30] transition-colors">
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-[#666] font-black tracking-[0.2em] text-xs uppercase mb-5">
                            SHOP
                        </h3>
                        <ul className="space-y-3 font-medium">
                            <li><Link href="/products" className="text-[#888] hover:text-white text-sm transition-colors">Hoodies</Link></li>
                            <li><Link href="/products" className="text-[#888] hover:text-white text-sm transition-colors">T-Shirts</Link></li>
                            <li><Link href="/products" className="text-[#888] hover:text-white text-sm transition-colors">Lowers</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-[#666] font-black tracking-[0.2em] text-xs uppercase mb-5">
                            SUPPORT
                        </h3>
                        <ul className="space-y-3 font-medium">
                            <li><Link href="/about" className="text-[#888] hover:text-white text-sm transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="text-[#888] hover:text-white text-sm transition-colors">Contact</Link></li>
                            <li><Link href="/size-guide" className="text-[#888] hover:text-white text-sm transition-colors">Size Guide</Link></li>
                            <li><Link href="/shipping" className="text-[#888] hover:text-white text-sm transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/privacy" className="text-[#888] hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-[#888] hover:text-white text-sm transition-colors">Terms of Service</Link></li>
                            <li><Link href="/faq" className="text-[#888] hover:text-white text-sm transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-[#666] font-black tracking-[0.2em] text-xs uppercase mb-5">
                            NEWSLETTER
                        </h3>
                        <p className="text-[#888] text-sm font-medium mb-4 leading-relaxed">
                            Subscribe to get special offers and updates.
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-[#111] border border-[#222] text-white text-sm font-medium px-4 py-3 rounded-xl outline-none focus:border-[#FF3B30] placeholder-[#555] transition-colors"
                            />
                            <button type="submit" className="w-full bg-white text-[#111] font-black uppercase tracking-widest text-xs px-4 py-3 rounded-xl hover:bg-[#FF3B30] hover:text-white transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="mt-16 pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#555] text-xs font-semibold">
                        © {new Date().getFullYear()} Zorodoor. "If Its Boring Its Not Mine." All rights reserved. Built for brutal self-expression.
                    </p>
                    <div className="text-xs font-semibold text-[#555]">
                        Designed & Developed by{" "}
                        <a href="https://www.linkedin.com/in/nitin-sharma-503645290/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FF3B30] transition-colors underline underline-offset-4 decoration-[#333]">
                            Nitin Sharma
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
