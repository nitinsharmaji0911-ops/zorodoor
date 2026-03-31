'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, KeyRound } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function SettingsPage() {
  const router = useRouter()
  const supabase = createClient()

  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })
    if (password.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters.' })
      setLoading(false)
      return
    }
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: 'Password updated successfully!' })
      setPassword('')
    }
    setLoading(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div>
      <h1 className="text-3xl font-black uppercase tracking-tight mb-7">Settings</h1>

      <div className="bg-white border border-[#EAEAEA] rounded-2xl p-6 mb-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-[#999] mb-5">Update Password</p>
        <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-sm">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#555] mb-2">New Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full border border-[#DDD] rounded-xl px-4 py-3.5 font-medium text-sm outline-none focus:border-[#111] transition-colors"
            />
          </div>
          {message.text && (
            <div className={`text-xs font-bold p-3 rounded-xl ${message.type === 'error' ? 'bg-[#FEE2E2] text-[#DC2626]' : 'bg-[#D1FAE5] text-[#059669]'}`}>
              {message.text}
            </div>
          )}
          <button type="submit" disabled={loading}
            className="bg-[#111] text-white font-black uppercase tracking-widest text-xs px-7 py-3.5 rounded-xl hover:bg-[#FF3B30] transition-colors disabled:opacity-60">
            {loading ? 'Updating...' : 'Save Password'}
          </button>
        </form>
      </div>

      <div className="bg-white border border-[#EAEAEA] rounded-2xl p-6 flex items-center justify-between gap-4">
        <div>
          <p className="font-black uppercase tracking-tight">Sign Out</p>
          <p className="text-[#888] text-sm font-medium mt-0.5">Log out of your account on this device.</p>
        </div>
        <button onClick={handleSignOut}
          className="flex items-center gap-2 bg-[#FAFAFA] border border-[#EAEAEA] text-[#DC2626] font-black uppercase tracking-widest text-xs px-5 py-3.5 rounded-xl hover:bg-[#FEE2E2] hover:border-[#DC2626] transition-colors shrink-0">
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </div>
  )
}
