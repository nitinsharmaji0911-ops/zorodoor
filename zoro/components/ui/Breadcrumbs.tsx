import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="flex items-center space-x-2 text-sm">
            <Link
                href="/"
                className="text-[--color-text-secondary] hover:text-[--color-accent-cyan] transition-colors"
            >
                Home
            </Link>
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                return (
                    <React.Fragment key={index}>
                        <ChevronRight size={16} className="text-[--color-border]" />
                        {item.href && !isLast ? (
                            <Link
                                href={item.href}
                                className="text-[--color-text-secondary] hover:text-[--color-accent-cyan] transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-[--color-text-primary] font-medium">
                                {item.label}
                            </span>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
}
