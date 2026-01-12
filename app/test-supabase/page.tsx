'use client';

import { useEffect, useState } from 'react';
import { supabase, supabaseConfig, testSupabaseConnection } from '@/lib/supabase';

export default function SupabaseTestPage() {
    const [envStatus, setEnvStatus] = useState<{
        url: string;
        hasKey: boolean;
    } | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<{
        success: boolean;
        message: string;
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check environment variables
        setEnvStatus(supabaseConfig);

        // Test connection
        testConnection();
    }, []);

    const testConnection = async () => {
        setLoading(true);
        const result = await testSupabaseConnection();
        setConnectionStatus(result);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Supabase Frontend Connection Test</h1>

                {/* Environment Variables */}
                <div className="bg-zinc-900 rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4">Environment Variables</h2>
                    {envStatus ? (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className={envStatus.url ? 'text-green-500' : 'text-red-500'}>
                                    {envStatus.url ? '✓' : '✗'}
                                </span>
                                <span className="font-mono">NEXT_PUBLIC_SUPABASE_URL:</span>
                                <span className="text-gray-400">{envStatus.url || 'Not found'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={envStatus.hasKey ? 'text-green-500' : 'text-red-500'}>
                                    {envStatus.hasKey ? '✓' : '✗'}
                                </span>
                                <span className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY:</span>
                                <span className="text-gray-400">{envStatus.hasKey ? 'Present' : 'Missing'}</span>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-400">Loading...</p>
                    )}
                </div>

                {/* Connection Test */}
                <div className="bg-zinc-900 rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4">Connection Test</h2>
                    {loading ? (
                        <p className="text-gray-400">Testing connection...</p>
                    ) : connectionStatus ? (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className={connectionStatus.success ? 'text-green-500' : 'text-red-500'}>
                                    {connectionStatus.success ? '✓' : '✗'}
                                </span>
                                <span className="font-bold">
                                    {connectionStatus.success ? 'Connection Successful' : 'Connection Failed'}
                                </span>
                            </div>
                            <p className="text-gray-400">{connectionStatus.message}</p>
                        </div>
                    ) : null}
                    <button
                        onClick={testConnection}
                        className="mt-4 bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Retest Connection
                    </button>
                </div>

                {/* API Keys Info */}
                <div className="bg-zinc-900 rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Frontend API Access</h2>
                    <div className="space-y-4 text-gray-300">
                        <p>
                            ✅ The Supabase client is now available for use in any frontend component.
                        </p>
                        <p className="text-sm">
                            Import it with: <code className="bg-black px-2 py-1 rounded">import {`{`} supabase {`}`} from '@/lib/supabase'</code>
                        </p>
                        <div className="mt-4">
                            <h3 className="font-bold mb-2">What you can do:</h3>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Query the database directly from frontend components</li>
                                <li>Subscribe to real-time changes</li>
                                <li>Upload files to Supabase Storage</li>
                                <li>Use Supabase Auth features</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    <a
                        href="/"
                        className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        ← Back to Home
                    </a>
                    <a
                        href="/shop"
                        className="bg-zinc-800 text-white px-6 py-3 rounded-lg hover:bg-zinc-700 transition-colors"
                    >
                        View Shop
                    </a>
                </div>
            </div>
        </div>
    );
}
