// Product image with lazy loading and a placeholder when the
// catalogue row has no image.
import { PackageCheck } from 'lucide-react';

export function ProductImage({ product, eager = false }) {
  if (product?.img) {
    return (
      <img
        src={product.img}
        alt={product.name || 'Product image'}
        loading={eager ? 'eager' : 'lazy'}
      />
    );
  }
  return (
    <span className="image-placeholder">
      <PackageCheck />
    </span>
  );
}
