import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
    size?: "sm" | "md" | "lg" | "xl";
    loading?: boolean;
    children: React.ReactNode;
}

export default function Button({
    variant = "primary",
    size = "md",
    loading = false,
    className,
    disabled,
    children,
    ...props
}: ButtonProps) {
    const baseStyles =
        "inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const variants = {
        primary:
            "bg-[#8B7355] text-white hover:bg-[#725F49] hover:shadow-lg hover:shadow-[#8B7355]/20 active:scale-[0.98] rounded-full",
        secondary:
            "bg-[#F5F2ED] text-[#2C2420] hover:bg-[#EBE7E0] hover:text-[#8B7355] active:scale-[0.98] rounded-full",
        outline:
            "bg-transparent border-2 border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white active:scale-[0.98] rounded-full",
        ghost:
            "bg-transparent text-[#2C2420] hover:text-[#8B7355] hover:bg-[#F5F2ED]/50",
        link:
            "text-[#2C2420] hover:text-[#8B7355] underline-offset-4 hover:underline p-0 h-auto font-medium"

    };

    const sizes = {
        sm: "px-4 py-1.5 text-xs h-8",
        md: "px-8 py-3 text-sm h-12",
        lg: "px-10 py-4 text-base h-14",
        xl: "px-12 py-5 text-lg h-16 font-bold",
    };

    return (
        <button
            className={cn(
                baseStyles,
                variants[variant],
                variant !== 'link' && sizes[size],
                loading && "opacity-70 cursor-wait",
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Processing</span>
                </div>
            ) : (
                children
            )}
        </button>
    );
}
