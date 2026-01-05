import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-9xl font-bold text-[--color-accent-cyan] mb-4 opacity-20">
                404
            </h1>
            <h2 className="text-3xl font-bold text-[--color-text-primary] mb-6 -mt-16">
                Page Not Found
            </h2>

            <p className="text-[--color-text-secondary] max-w-md mb-8">
                The page you are looking for keeps drifting away. It might have been removed or never existed in this timeline.
            </p>

            <Link href="/">
                <Button variant="primary">Back to Home</Button>
            </Link>
        </div>
    );
}
