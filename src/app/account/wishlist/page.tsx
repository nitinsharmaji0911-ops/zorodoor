import { Metadata } from 'next'
import WishlistClient from './WishlistClient'

export const metadata: Metadata = {
  title: 'My Wishlist | ZORODOOR',
  description: 'Your saved Zorodoor drops.',
}

export default function WishlistPage() {
  return (
    <div>
      <h1 className="text-3xl font-black uppercase tracking-tight mb-1">Wishlist</h1>
      <p className="text-[#888] font-medium text-sm mb-7">Your saved drops. Don&apos;t wait too long — limited stock.</p>

      <WishlistClient />
    </div>
  )
}
