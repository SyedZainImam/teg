import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

interface CategoryCardProps {
  category: {
    title: string;
    slug: { current: string };
    description?: string;
    image?: any;
  };
  productCount?: number;
}

export default function CategoryCard({ category, productCount }: CategoryCardProps) {
  const imageUrl = category.image
    ? urlFor(category.image).width(600).height(400).url()
    : null;

  return (
    <Link
      href={`/categories/${category.slug.current}`}
      className="group relative bg-white border border-border rounded-lg overflow-hidden hover:shadow-xl transition-all"
    >
      <div className="aspect-[3/2] bg-muted relative overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={category.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
            <span className="text-white text-4xl font-bold opacity-30">
              {category.title.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold text-white">{category.title}</h3>
          {category.description && (
            <p className="text-white/80 text-sm mt-1 line-clamp-2">
              {category.description}
            </p>
          )}
          {productCount !== undefined && (
            <span className="text-white/60 text-xs mt-2 block">
              {productCount} {productCount === 1 ? "product" : "products"}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
