"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

import { register } from "@/app/actions/auth";

export default function RegisterPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            showToast("Passwords do not match", "error");
            return;
        }

        setIsLoading(true);

        try {
            const result = await register(undefined, formData);
            if (result === "Success") {
                showToast("Account created successfully!", "success");
                router.push("/login"); // Redirect to login after registration
            } else {
                showToast(result || "Failed to register", "error");
            }
        } catch (error) {
            showToast("An unexpected error occurred", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[--color-primary-bg] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[--color-bg-secondary] border border-[--color-border] rounded-2xl p-8 shadow-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[--color-text-primary] mb-2">Create Account</h1>
                    <p className="text-[--color-text-secondary]">Join the revolution</p>
                </div>

                {/* Social Login */}
                <div className="space-y-3 mb-6">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full relative flex items-center justify-center gap-2 bg-white text-black border-gray-300 hover:bg-gray-50"
                        onClick={() => {
                            window.location.href = "/api/auth/signin/google?callbackUrl=/account";
                        }}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Sign up with Google
                    </Button>
                </div>

                <div className="flex items-center my-8">
                    <div className="flex-1 border-t border-[--color-border]"></div>
                    <span className="px-4 text-sm text-[--color-text-secondary]">Or continue with email</span>
                    <div className="flex-1 border-t border-[--color-border]"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[--color-text-secondary] mb-1">Full Name</label>
                        <Input
                            name="name"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

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
                            placeholder="Create a password"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[--color-text-secondary] mb-1">Confirm Password</label>
                        <Input
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Sign Up"}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-[--color-text-secondary]">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[--color-accent-cyan] hover:underline font-bold">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
