import { getProducts, getCategories } from "@/sanity/queries";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export const metadata = {
  title: "All Products - TEG Equipment",
  description: "Browse our complete inventory of refurbished biomedical equipment, lab parts, and industrial machinery.",
};

export default async function ProductsPage() {
  let products: any[] = [];
  let categories: any[] = [];

  try {
    products = (await getProducts()) || [];
    categories = (await getCategories()) || [];
  } catch {
    // Sanity not connected
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">All Products</span>
      </nav>

      <h1 className="text-3xl font-bold text-foreground mb-2">All Equipment</h1>
      <p className="text-gray-500 mb-8">
        Browse our complete inventory of professional-grade equipment.
      </p>

      {/* Category filters */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/products"
            className="px-4 py-2 bg-primary text-white text-sm rounded-md font-medium"
          >
            All
          </Link>
          {categories.map((cat: any) => (
            <Link
              key={cat._id}
              href={`/categories/${cat.slug.current}`}
              className="px-4 py-2 bg-muted text-foreground text-sm rounded-md font-medium hover:bg-primary hover:text-white transition-colors"
            >
              {cat.title}
            </Link>
          ))}
        </div>
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">
            No products listed yet. Products will appear here once added via the CMS.
          </p>
          <Link href="/contact" className="text-accent hover:underline mt-4 inline-block">
            Contact us to inquire about available equipment →
          </Link>
        </div>
      )}
    </div>
  );
}
