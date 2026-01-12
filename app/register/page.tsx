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
