import React from "react";

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-8 text-[--color-text-primary] text-center">
                About Zorodoor
            </h1>
            <div className="prose prose-invert max-w-none text-[--color-text-secondary]">
                <p className="mb-6 text-xl text-center font-medium text-[--color-text-primary]">
                    "We are a premium e-commerce brand dedicated to delivering quality products and exceptional customer service."
                </p>

                <hr className="my-8 border-[--color-border]" />

                <p className="mb-6">
                    Zorodoor operates with a singular vision: to blend the raw energy of anime culture with the sophisticated silhouettes of modern streetwear. We don't just sell clothes; we provide a canvas for your brutal self-expression.
                </p>

                <p className="mb-6">
                    Based in India, we take pride in our roots while aiming for a global impact. Each piece is designed to withstand the trends, offering timeless, oversized fits that speak volumes without saying a word.
                </p>

                <p className="mb-6">
                    Whether it's our heavyweight hoodies or our signature graphic tees, every item is a testament to our commitment to quality. Join us on this journey.
                </p>
            </div>
        </div>
    );
}
