import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    success?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, success, type = "text", id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-[--color-text-primary] mb-2"
                    >
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    id={inputId}
                    ref={ref}
                    className={cn(
                        "w-full px-4 py-3 bg-[--color-primary-bg-secondary] border rounded-lg text-[--color-text-primary] placeholder:text-[--color-text-secondary] transition-all duration-200 outline-none focus:ring-2",
                        error
                            ? "border-[--color-error] focus:ring-[--color-error]"
                            : success
                                ? "border-[--color-success] focus:ring-[--color-success]"
                                : "border-[--color-border] focus:border-[--color-accent-cyan] focus:ring-[--color-accent-cyan]",
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-[--color-error]">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
