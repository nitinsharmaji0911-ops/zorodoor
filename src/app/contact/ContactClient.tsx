"use client"

import { Mail, Instagram, MapPin } from 'lucide-react'

export default function ContactClient() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-[60vh]">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 border-b border-[#EAEAEA] pb-8">
        Contact Us
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight mb-6">Get In Touch</h2>
          <p className="text-[#555] font-medium mb-10 leading-relaxed">
            Have a question about a drop? Need help with an order? Reach out to us directly and our team will get back to you within 24 hours.
          </p>
          
          <div className="space-y-8">
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-3 font-bold uppercase tracking-widest text-xs text-[#999]">
                <Mail size={16} /> Email
              </span>
              <a href="mailto:support@zorodoor.in" className="text-xl font-bold text-[#111] hover:text-[#FF3B30] transition-colors">
                support@zorodoor.in
              </a>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-3 font-bold uppercase tracking-widest text-xs text-[#999]">
                <Instagram size={16} /> Instagram
              </span>
              <a href="https://instagram.com/zorodoor" target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-[#111] hover:text-[#FF3B30] transition-colors">
                @zorodoor
              </a>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-3 font-bold uppercase tracking-widest text-xs text-[#999]">
                <MapPin size={16} /> Studio HQ
              </span>
              <p className="text-base font-bold text-[#111]">
                ZORODOOR Studios<br />
                New Delhi, India
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-[#F9F9F9] p-8 rounded-3xl border border-[#EAEAEA]">
          <h2 className="text-xl font-black uppercase tracking-tight mb-6">Drop A Message</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#555] mb-2">Name</label>
              <input type="text" className="w-full bg-white border border-[#DDD] p-4 rounded-xl outline-none focus:border-[#111] transition-colors" placeholder="YOUR NAME" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#555] mb-2">Email</label>
              <input type="email" className="w-full bg-white border border-[#DDD] p-4 rounded-xl outline-none focus:border-[#111] transition-colors" placeholder="YOUR EMAIL" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-[#555] mb-2">Message</label>
              <textarea rows={4} className="w-full bg-white border border-[#DDD] p-4 rounded-xl outline-none focus:border-[#111] transition-colors" placeholder="HOW CAN WE HELP?"></textarea>
            </div>
            <button className="w-full bg-[#111] text-white font-black uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-[#FF3B30] transition-colors mt-2">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
