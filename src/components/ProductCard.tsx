import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    slug: { current: string };
    brand?: string;
    model?: string;
    condition?: string;
    priceRange?: string;
    images?: any[];
    category?: { title: string; slug: { current: string } };
  };
}

const conditionLabel: Record<string, string> = {
  new: "New",
  used: "Used",
  refurbished: "Refurbished",
  "used-refurbished": "Used / Refurbished",
};

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl =
    product.images && product.images.length > 0
      ? urlFor(product.images[0]).width(400).height(300).url()
      : null;

  return (
    <Link
      href={`/products/${product.slug.current}`}
      className="group bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {product.condition && (
          <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
            {conditionLabel[product.condition] || product.condition}
          </span>
        )}
      </div>
      <div className="p-4">
        {product.category && (
          <span className="text-xs text-accent font-medium uppercase tracking-wide">
            {product.category.title}
          </span>
        )}
        <h3 className="font-semibold text-foreground mt-1 group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>
        {product.brand && (
          <p className="text-sm text-gray-500 mt-1">
            {product.brand}
            {product.model ? ` - ${product.model}` : ""}
          </p>
        )}
        {product.priceRange && (
          <p className="text-sm font-semibold text-primary mt-2">
            {product.priceRange}
          </p>
        )}
        <span className="inline-block mt-3 text-sm text-accent font-medium group-hover:underline">
          View Details →
        </span>
      </div>
    </Link>
  );
}
