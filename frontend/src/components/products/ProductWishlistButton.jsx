import { Heart } from 'lucide-react';

export function ProductWishlistButton({ productId, saved, onToggle }) {
  return <button type="button" className={saved ? 'wishlist-toggle saved' : 'wishlist-toggle'} aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'} onClick={() => onToggle?.(productId)}>
    <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
  </button>;
}
