"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { authenticate } from "@/app/actions/auth";

export default function LoginPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);

        try {
            const result = await authenticate(undefined, formData);
            if (result === 'Invalid credentials.') {
                showToast("Invalid credentials", "error");
            } else {
                showToast("Welcome back!", "success");
                // Force refresh to update session state
                window.location.href = "/account";
            }
        } catch (error: any) {
            if (error.message === "NEXT_REDIRECT" || (error.digest && error.digest.startsWith("NEXT_REDIRECT"))) {
                window.location.href = "/account";
                return;
            }
            showToast("Something went wrong", "error");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[--color-primary-bg] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[--color-bg-secondary] border border-[--color-border] rounded-2xl p-8 shadow-xl">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-[--color-text-primary] mb-2">Welcome Back</h1>
                    <p className="text-[--color-text-secondary]">Sign in to access your orders</p>
                </div>



                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[--color-text-secondary] mb-1">Email</label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[--color-text-secondary] mb-1">Password</label>
                        <Input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-[--color-accent-cyan] focus:ring-[--color-accent-cyan] border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-[--color-text-secondary]">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-[--color-accent-cyan] hover:text-[--color-accent-cyan]/80">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-[--color-text-secondary]">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-[--color-accent-cyan] hover:underline font-bold">
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    );
}
