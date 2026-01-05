import React from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Mail, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-8 text-[--color-text-primary] text-center">
                Contact Us
            </h1>
            <p className="text-[--color-text-secondary] text-center mb-12 max-w-2xl mx-auto">
                Have questions? We're here to help. Reach out to us regarding orders,
                collaborations, or just to say hey.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div>
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[--color-text-secondary] mb-2">
                                Name
                            </label>
                            <Input type="text" id="name" placeholder="Your Name" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[--color-text-secondary] mb-2">
                                Email
                            </label>
                            <Input type="email" id="email" placeholder="your@email.com" required />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-[--color-text-secondary] mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows={5}
                                className="w-full px-4 py-2 bg-[--color-bg-secondary] border border-[--color-border] rounded-md focus:outline-none focus:ring-2 focus:ring-[--color-accent-cyan] text-[--color-text-primary]"
                                placeholder="How can we help?"
                                required
                            ></textarea>
                        </div>
                        <Button variant="primary" className="w-full">
                            Send Message
                        </Button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col justify-start space-y-8 mt-4 md:mt-0">
                    <div className="bg-[--color-bg-secondary] p-6 rounded-lg border border-[--color-border]">
                        <div className="flex items-start space-x-4">
                            <Mail className="text-[--color-accent-cyan] mt-1" size={24} />
                            <div>
                                <h3 className="text-lg font-semibold text-[--color-text-primary] mb-1">Email Us</h3>
                                <p className="text-[--color-text-secondary] mb-2">For general inquiries:</p>
                                <a href="mailto:zorodoorstore@gmail.com" className="text-[--color-accent-cyan] hover:underline block">zorodoorstore@gmail.com</a>
                                <a href="mailto:support@zorodoor.store" className="text-[--color-accent-cyan] hover:underline block">support@zorodoor.store</a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[--color-bg-secondary] p-6 rounded-lg border border-[--color-border]">
                        <div className="flex items-start space-x-4">
                            <MapPin className="text-[--color-accent-cyan] mt-1" size={24} />
                            <div>
                                <h3 className="text-lg font-semibold text-[--color-text-primary] mb-1">Our Office</h3>
                                <p className="text-[--color-text-secondary]">
                                    Butibori industries, B-10, Vyankatesh city,<br />
                                    Butibori, Maharashtra 441108,<br />
                                    India
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
