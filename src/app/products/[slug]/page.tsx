import { getProductBySlug, getProducts } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 30;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const products = await getProducts();
    return products.map((p: any) => ({ slug: p.slug.current }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const product = await getProductBySlug(slug);
    if (!product) return { title: "Product Not Found" };
    return {
      title: `${product.name} - TEG Equipment`,
      description: product.description?.slice(0, 160),
    };
  } catch {
    return { title: "Product - TEG Equipment" };
  }
}

const conditionLabel: Record<string, string> = {
  new: "New",
  used: "Used",
  refurbished: "Refurbished",
  "used-refurbished": "Used / Refurbished",
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let product: any = null;

  try {
    product = await getProductBySlug(slug);
  } catch {
    notFound();
  }

  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-primary">Products</Link>
        {product.category && (
          <>
            <span className="mx-2">/</span>
            <Link
              href={`/categories/${product.category.slug.current}`}
              className="hover:text-primary"
            >
              {product.category.title}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          {product.images && product.images.length > 0 ? (
            <div className="space-y-4">
              <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-muted">
                <Image
                  src={urlFor(product.images[0]).width(800).height(600).url()}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(1, 5).map((img: any, i: number) => (
                    <div key={i} className="aspect-square relative rounded overflow-hidden bg-muted">
                      <Image
                        src={urlFor(img).width(200).height(200).url()}
                        alt={`${product.name} image ${i + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center">
              <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {product.category && (
            <span className="text-xs text-accent font-medium uppercase tracking-wide">
              {product.category.title}
            </span>
          )}
          <h1 className="text-3xl font-bold text-foreground mt-1">
            {product.name}
          </h1>

          <div className="flex flex-wrap gap-3 mt-4">
            {product.brand && (
              <span className="px-3 py-1 bg-muted text-sm rounded-full">
                {product.brand}
              </span>
            )}
            {product.model && (
              <span className="px-3 py-1 bg-muted text-sm rounded-full">
                {product.model}
              </span>
            )}
            {product.condition && (
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                {conditionLabel[product.condition] || product.condition}
              </span>
            )}
            {product.year && (
              <span className="px-3 py-1 bg-muted text-sm rounded-full">
                {product.year}
              </span>
            )}
          </div>

          {product.priceRange && (
            <p className="text-2xl font-bold text-primary mt-6">
              {product.priceRange}
            </p>
          )}

          {product.description && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Key Features
              </h2>
              <ul className="space-y-2">
                {product.features.map((f: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Specifications
              </h2>
              <div className="border border-border rounded-lg overflow-hidden">
                {product.specifications.map((spec: any, i: number) => (
                  <div
                    key={i}
                    className={`flex ${i % 2 === 0 ? "bg-muted" : "bg-white"}`}
                  >
                    <span className="w-1/3 px-4 py-2 font-medium text-sm text-foreground">
                      {spec.label}
                    </span>
                    <span className="w-2/3 px-4 py-2 text-sm text-gray-600">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Accessories */}
          {product.includedAccessories && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Included Accessories
              </h2>
              <p className="text-gray-600">{product.includedAccessories}</p>
            </div>
          )}

          {product.countryOfOrigin && (
            <p className="text-sm text-gray-500 mt-4">
              Origin: {product.countryOfOrigin}
            </p>
          )}

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-md transition-colors"
            >
              Inquire on WhatsApp
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-3 rounded-md transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
