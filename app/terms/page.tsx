import React from "react";

export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8 text-[--color-text-primary]">
                Terms of Service
            </h1>
            <div className="prose prose-invert max-w-none text-[--color-text-secondary] space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-3 text-[--color-text-primary]">Overview</h2>
                    <p>
                        By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by these terms.
                        We reserve the right to refuse service to anyone for any reason at any time.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-[--color-text-primary]">Pricing & Products</h2>
                    <p>
                        Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-[--color-text-primary]">Governing Law</h2>
                    <p>
                        These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-[--color-text-primary]">Contact Information</h2>
                    <p>
                        Questions about the Terms of Service should be sent to us at <a href="mailto:zorodoorstore@gmail.com" className="text-[--color-accent-cyan] hover:underline">zorodoorstore@gmail.com</a>.
                    </p>
                </section>
            </div>
        </div>
    );
}
