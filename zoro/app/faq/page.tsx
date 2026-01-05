import React from "react";

export default function FAQPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-10 text-[--color-text-primary] text-center">
                Frequently Asked Questions
            </h1>

            <div className="space-y-8">
                <div className="border-b border-[--color-border] pb-6">
                    <h3 className="text-lg font-semibold text-[--color-text-primary] mb-2">
                        How long does shipping take?
                    </h3>
                    <p className="text-[--color-text-secondary]">
                        Standard shipping takes 5-7 business days. International shipping can take 10-15 business days depending on the destination.
                    </p>
                </div>

                <div className="border-b border-[--color-border] pb-6">
                    <h3 className="text-lg font-semibold text-[--color-text-primary] mb-2">
                        What is your return policy?
                    </h3>
                    <p className="text-[--color-text-secondary]">
                        We offer a 30-day return policy for all unworn items in their original packaging. Return shipping costs are the responsibility of the customer unless the item is defective.
                    </p>
                </div>

                <div className="border-b border-[--color-border] pb-6">
                    <h3 className="text-lg font-semibold text-[--color-text-primary] mb-2">
                        Do you ship internationally?
                    </h3>
                    <p className="text-[--color-text-secondary]">
                        Yes, we ship to most countries worldwide. Shipping rates will be calculated at checkout.
                    </p>
                </div>

                <div className="border-b border-[--color-border] pb-6">
                    <h3 className="text-lg font-semibold text-[--color-text-primary] mb-2">
                        How should I wash my Zorodoor hoodie?
                    </h3>
                    <p className="text-[--color-text-secondary]">
                        We recommend washing inside out with cold water and hanging to dry to preserve the print quality and fabric life.
                    </p>
                </div>
            </div>
        </div>
    );
}
