import React from "react";

export default function ShippingPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8 text-[--color-text-primary]">
                Shipping & Returns
            </h1>
            <div className="prose prose-invert max-w-none text-[--color-text-secondary] space-y-8">

                {/* Shipping Section */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-[--color-text-primary]">Shipping Protocol</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium text-[--color-text-primary]">Processing Time</h3>
                            <p>All orders are processed within 2-3 business days. We do not ship on weekends.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-[--color-text-primary]">India Shipping</h3>
                            <p>Standard delivery takes 5-7 business days via our logistics partners (Delhivery/BlueDart).</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-[--color-text-primary]">Tracking</h3>
                            <p>You will receive a tracking ID via email/SMS once the order is dispatched.</p>
                        </div>
                    </div>
                </section>

                <hr className="border-[--color-border]" />

                {/* Returns Section */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-[--color-text-primary]">Returns & Exchanges</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium text-[--color-text-primary]">7-Day Return Window</h3>
                            <p>You have 7 days after receiving your item to request a return.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-[--color-text-primary]">Condition</h3>
                            <p>To be eligible, your item must be in the same condition that you received it, unworn, unwashed, with tags, and in its original packaging.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-[--color-text-primary]">Exceptions</h3>
                            <p>Sale items and Limited Drops are FINAL SALE unless damaged.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-[--color-text-primary]">How to Return</h3>
                            <p>To start a return, contact us at: <a href="mailto:support@zorodoor.store" className="text-[--color-accent-cyan] hover:underline">support@zorodoor.store</a></p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
