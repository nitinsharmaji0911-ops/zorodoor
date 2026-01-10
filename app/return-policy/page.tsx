import React from "react";

export default function ReturnPolicyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8 text-[--color-text-primary]">
                Return & Refund Policy
            </h1>
            <div className="prose prose-invert max-w-none text-[--color-text-secondary] space-y-8">
                <section>
                    <h2 className="text-xl font-semibold mb-3 text-[--color-text-primary]">Our Commitment</h2>
                    <p>
                        We want you to be completely satisfied with your Zorodoor purchase. If for any reason you are not, we offer a hassle-free return policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-[--color-text-primary]">7-Day Return Policy</h2>
                    <p>
                        You have 7 days after receiving your item to request a return. The item must be in the same condition that you received it, unworn, unwashed, with tags, and in its original packaging.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-[--color-text-primary]">Non-Returnable Items</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Gift cards</li>
                        <li>Sale items or Limited Drops (unless defective)</li>
                        <li>Intimate apparel (if applicable)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-[--color-text-primary]">Refund Process</h2>
                    <p>
                        Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-[--color-text-primary]">Exchanges</h2>
                    <p>
                        The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-[--color-text-primary]">Contact Us</h2>
                    <p>
                        To start a return or for any questions, please contact us at <a href="mailto:support@zorodoor.store" className="text-[--color-accent-cyan] hover:underline">support@zorodoor.store</a>.
                    </p>
                </section>
            </div>
        </div>
    );
}
