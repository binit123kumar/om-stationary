// Heart toggle that saves/removes a product from the wishlist.
import { Heart } from 'lucide-react';

export function ProductWishlistButton({ saved, productId, toggleWishlist }) {
  return (
    <button
      type="button"
      className={saved ? 'wishlist-toggle saved' : 'wishlist-toggle'}
      aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
      onClick={() => toggleWishlist?.(productId)}
    >
      <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
    </button>
  );
}
