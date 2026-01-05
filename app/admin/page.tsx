"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple hardcoded password for demo
        if (password === "admin123") {
            // Set a simple cookie or local storage token
            localStorage.setItem("admin_token", "true");
            router.push("/admin/dashboard");
        } else {
            setError("Invalid password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[--color-primary-bg] px-4">
            <div className="w-full max-w-md bg-[--color-bg-secondary] p-8 rounded-lg border border-[--color-border]">
                <h1 className="text-2xl font-bold text-[--color-text-primary] mb-6 text-center">
                    Admin Access
                </h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[--color-text-secondary] mb-1">
                            Passcode
                        </label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin passcode"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <Button type="submit" variant="primary" className="w-full">
                        Enter Dashboard
                    </Button>
                </form>
            </div>
        </div>
    );
}
