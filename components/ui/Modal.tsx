"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = "md",
}: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleEscape);
        }
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizes = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className={cn(
                    "relative w-full bg-[--color-primary-bg-secondary] border border-[--color-border] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200",
                    sizes[size]
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                {title && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[--color-border]">
                        <h2 className="text-xl font-bold text-[--color-text-primary]">
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-[--color-text-secondary] hover:text-[--color-text-primary] transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                )}

                {/* Close button (if no title) */}
                {!title && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 text-[--color-text-secondary] hover:text-[--color-text-primary] transition-colors"
                    >
                        <X size={24} />
                    </button>
                )}

                {/* Content */}
                <div className="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
