import Button from "@/components/ui/Button";

export default function AdminSettingsPage() {
    const stripeConfigured = !!process.env.STRIPE_SECRET_KEY;
    const authConfigured = !!process.env.AUTH_SECRET;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-[#2C2420]">Settings</h2>
                <p className="text-[#6B5E52]">Configure your store.</p>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm border border-[#EBE7E0] p-8">
                <h3 className="text-xl font-bold text-[#2C2420] mb-6">System Status</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#F5F2ED] rounded-lg">
                        <div>
                            <p className="font-bold text-[#2C2420]">Payment Gateway (Stripe)</p>
                            <p className="text-sm text-[#6B5E52]">Handles checkout processing</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${stripeConfigured ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {stripeConfigured ? 'Configured' : 'Missing Keys'}
                        </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#F5F2ED] rounded-lg">
                        <div>
                            <p className="font-bold text-[#2C2420]">Authentication (NextAuth)</p>
                            <p className="text-sm text-[#6B5E52]">User login and security</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${authConfigured ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {authConfigured ? 'Configured' : 'Dev Mode Fallback'}
                        </span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#F5F2ED] rounded-lg">
                        <div>
                            <p className="font-bold text-[#2C2420]">Database (SQLite)</p>
                            <p className="text-sm text-[#6B5E52]">Local file-based database</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                            Connected
                        </span>
                    </div>
                </div>
            </div>

            {/* General Settings Form (Visual Only for now) */}
            <div className="bg-white rounded-xl shadow-sm border border-[#EBE7E0] p-8 opacity-50 pointer-events-none grayscale">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-[#2C2420]">Store Configuration</h3>
                    <span className="text-xs uppercase bg-gray-100 px-2 py-1 font-bold">Coming Soon</span>
                </div>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#6B5E52] mb-1">Store Name</label>
                        <input type="text" defaultValue="ZORODOOR" className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#6B5E52] mb-1">Support Email</label>
                        <input type="email" defaultValue="support@zorodoor.com" className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
                    </div>
                    <Button variant="primary" disabled>Save Changes</Button>
                </form>
            </div>
        </div>
    );
}
