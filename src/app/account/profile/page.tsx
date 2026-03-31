'use client'

import { useState, useEffect, useRef } from 'react'
import { Camera, Check, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type Toast = { message: string; type: 'success' | 'error' }

export default function ProfilePage() {
  const router = useRouter()
  const supabase = createClient()
  const avatarRef = useRef<HTMLInputElement>(null)

  const [loading,   setLoading]   = useState(true)
  const [saving,    setSaving]    = useState(false)
  const [toast,     setToast]     = useState<Toast | null>(null)
  const [fullName,  setFullName]  = useState('')
  const [phone,     setPhone]     = useState('')
  const [email,     setEmail]     = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  const displayInitial = (fullName.trim() || email || 'U').charAt(0).toUpperCase()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/login'); return }
      setEmail(user.email || '')
      setFullName(user.user_metadata?.full_name || '')
      setPhone(user.user_metadata?.phone || '')
      setAvatarUrl(user.user_metadata?.avatar_url || null)
      setLoading(false)
    })
  }, [])

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName.trim(), phone: phone.trim() }
    })
    error ? showToast(error.message, 'error') : showToast('Profile updated!', 'success')
    setSaving(false)
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) { showToast('Image must be under 2MB', 'error'); return }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const ext  = file.name.split('.').pop()
    const path = `avatars/${user.id}.${ext}`

    const { error: uploadError } = await supabase.storage.from('avatars').upload(path, file, { upsert: true })
    if (uploadError) { showToast('Upload failed — ensure the "avatars" bucket exists in Supabase Storage.', 'error'); return }

    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path)
    const { error: updateError } = await supabase.auth.updateUser({ data: { avatar_url: publicUrl } })
    if (updateError) { showToast(updateError.message, 'error') } else { setAvatarUrl(publicUrl); showToast('Avatar updated!', 'success') }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <div className="w-7 h-7 border-2 border-[#111] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl font-bold text-sm
          ${toast.type === 'success' ? 'bg-[#0a0a0a] text-white' : 'bg-[#FEE2E2] text-[#DC2626] border border-[#DC2626]/20'}`}>
          {toast.type === 'success' ? <Check size={15} className="text-[#10B981]" /> : <AlertCircle size={15} />}
          {toast.message}
        </div>
      )}

      <h1 className="text-3xl font-black uppercase tracking-tight mb-7">My Profile</h1>

      {/* Avatar card */}
      <div className="bg-white border border-[#EAEAEA] rounded-2xl p-6 mb-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-[#999] mb-5">Avatar</p>
        <div className="flex items-center gap-5">
          <div className="relative group flex-shrink-0">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-18 h-18 w-[72px] h-[72px] rounded-full object-cover border-2 border-[#EAEAEA]" />
            ) : (
              <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#111] to-[#333] flex items-center justify-center text-white text-2xl font-black">
                {displayInitial}
              </div>
            )}
            <button type="button" onClick={() => avatarRef.current?.click()}
              className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <Camera size={18} className="text-white" />
            </button>
            <input ref={avatarRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
          </div>
          <div>
            <p className="font-black text-sm">{fullName || 'Your Name'}</p>
            <p className="text-[#888] text-xs font-medium mt-0.5">{email}</p>
            <button type="button" onClick={() => avatarRef.current?.click()}
              className="mt-3 text-xs font-black uppercase tracking-widest text-[#111] border border-[#DDD] px-4 py-2 rounded-lg hover:border-[#111] hover:bg-[#F9F9F9] transition-colors">
              Change Photo
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="bg-white border border-[#EAEAEA] rounded-2xl p-6">
        <p className="text-[10px] font-black uppercase tracking-widest text-[#999] mb-5">Personal Details</p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#555] mb-2">Full Name</label>
            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
              placeholder="Your full name"
              className="w-full border border-[#DDD] rounded-xl px-4 py-3.5 font-medium text-sm focus:border-[#111] transition-colors bg-white" />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#555] mb-2">
              Email <span className="text-[#BBB] normal-case font-medium tracking-normal ml-1">(cannot be changed here)</span>
            </label>
            <input type="email" value={email} readOnly
              className="w-full border border-[#EAEAEA] rounded-xl px-4 py-3.5 font-medium text-sm text-[#999] bg-[#FAFAFA] cursor-not-allowed" />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#555] mb-2">Phone Number</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full border border-[#DDD] rounded-xl px-4 py-3.5 font-medium text-sm focus:border-[#111] transition-colors bg-white" />
          </div>
        </div>

        <div className="border-t border-[#F0F0F0] mt-6 pt-5 flex items-center justify-between gap-4">
          <p className="text-xs text-[#AAA] font-medium">Saved directly to your Supabase auth profile.</p>
          <button type="submit" disabled={saving}
            className="bg-[#111] text-white font-black uppercase tracking-widest text-xs px-7 py-3.5 rounded-xl hover:bg-[#FF3B30] transition-colors disabled:opacity-60 flex items-center gap-2 shrink-0">
            {saving
              ? <><span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</>
              : <><Check size={13} />Save Changes</>
            }
          </button>
        </div>
      </form>
    </div>
  )
}
