'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Suspense } from 'react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()

      const { error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        setError(error.message)
      } else {
        router.push(redirect)
        router.refresh()
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${redirect}`,
      },
    })
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-10">
          <Link href="/" className="font-black text-3xl tracking-tighter text-[#111]">
            ZORO<span className="text-[#FF3B30]">DOOR</span>
          </Link>
          <h1 className="text-2xl font-black uppercase tracking-tight mt-6 mb-2 text-[#111]">Sign In</h1>
          <p className="text-[#888] font-medium text-sm">Welcome back. Access your drops and orders.</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#EAEAEA] rounded-3xl p-8 shadow-sm">
          {/* Google OAuth */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-[#EAEAEA] rounded-xl py-3.5 font-bold text-sm text-[#111] hover:border-[#111] hover:bg-[#F9F9F9] transition-all mb-6"
          >
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>

          <div className="relative flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#EAEAEA]" />
            <span className="text-[#999] text-xs font-bold uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-[#EAEAEA]" />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#555] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full border border-[#DDD] rounded-xl px-4 py-3.5 font-medium text-sm outline-none focus:border-[#111] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#555] mb-2">Password</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full border border-[#DDD] rounded-xl px-4 py-3.5 font-medium text-sm outline-none focus:border-[#111] transition-colors pr-12"
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999]">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-[#FEE2E2] text-[#DC2626] text-xs font-bold p-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#111] text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-[#FF3B30] transition-colors flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
            >
              {loading ? 'Signing in...' : <><span>Sign In</span><ArrowRight size={14} /></>}
            </button>
          </form>
        </div>

        <p className="text-center text-sm font-medium text-[#888] mt-6">
          Don't have an account?{' '}
          <Link href="/register" className="text-[#111] font-bold hover:text-[#FF3B30] transition-colors">
            Create One Free
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
