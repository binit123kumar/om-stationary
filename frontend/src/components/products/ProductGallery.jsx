// Product detail media panel: main image plus every catalogue image.
import { PackageCheck } from 'lucide-react';
import { useState } from 'react';

export function ProductGallery({ product }) {
  const images = product?.images?.length ? product.images : (product?.img ? [product.img] : []);
  const [selected, setSelected] = useState(0);

  if (!images.length) {
    return (
      <div className="product-media">
        <span className="image-placeholder"><PackageCheck /></span>
        <span className="image-caption">OM Stationary catalogue</span>
      </div>
    );
  }

  return (
    <div className="product-media">
      <img src={images[selected]} alt={product?.name || 'Product image'} />
      {images.length > 1 && (
        <div className="product-thumbs">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              className={index === selected ? 'thumb selected' : 'thumb'}
              onClick={() => setSelected(index)}
              aria-label={`Show image ${index + 1}`}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      )}
      <span className="image-caption">OM Stationary catalogue</span>
    </div>
  );
}
