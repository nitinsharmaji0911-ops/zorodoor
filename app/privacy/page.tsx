import React from "react";

export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8 text-[--color-text-primary]">
                Privacy Policy
            </h1>
            <div className="prose prose-invert max-w-none text-[--color-text-secondary] space-y-6">
                <p className="italic">Last updated: December 11, 2025</p>

                <p>
                    Zorodoor operates this store and website to provide a curated shopping experience. Powered by Shopify, this policy describes how we collect, use, and disclose personal information when you use our Services.
                </p>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-[--color-text-primary]">Personal Information We Collect</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Contact details (name, address, email, phone).</li>
                        <li>Financial information (payment card details, transaction history).</li>
                        <li>Account information (usernames, preferences).</li>
                        <li>Device and usage information (IP address, browser type, interaction data).</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-[--color-text-primary]">How We Use Your Information</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>To provide and improve Services (processing orders, fulfillment, shipping).</li>
                        <li>Marketing and advertising.</li>
                        <li>Security and fraud prevention.</li>
                        <li>Legal compliance and communication with users.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-[--color-text-primary]">Disclosures to Third Parties</h2>
                    <p>
                        Information is shared with Shopify, service providers (payment processors, shipping), and business partners for marketing. We may also disclose data for legal reasons or business transactions.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-[--color-text-primary]">Contact Information</h2>
                    <p>
                        If you have questions, please contact us at:
                    </p>
                    <address className="not-italic mt-2">
                        Email: <a href="mailto:zorodoorstore@gmail.com" className="text-[--color-accent-cyan] hover:underline">zorodoorstore@gmail.com</a><br />
                        Address: Butibori industries, B-10, Vyankatesh city, Butibori, MH, 441108, IN
                    </address>
                </section>
            </div>
        </div>
    );
}
