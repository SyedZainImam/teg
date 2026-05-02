import { getCategoryBySlug, getProductsByCategory, getCategories } from "@/sanity/queries";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    return categories.map((c: any) => ({ slug: c.slug.current }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const category = await getCategoryBySlug(slug);
    if (category) {
      return {
        title: `${category.title} - TEG Equipment`,
        description: category.description,
      };
    }
  } catch {}
  return { title: "Category - TEG Equipment" };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let category: any = null;
  let products: any[] = [];

  try {
    category = await getCategoryBySlug(slug);
    products = (await getProductsByCategory(slug)) || [];
  } catch {}

  if (!category) notFound();

  const title = category.title;
  const description = category.description || "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-primary">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{title}</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        {description && (
          <p className="text-gray-500 mt-3 max-w-3xl">{description}</p>
        )}
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">
            No products in this category yet. Check back soon!
          </p>
          <Link href="/contact" className="text-accent hover:underline mt-4 inline-block">
            Contact us to inquire about available {title.toLowerCase()} →
          </Link>
        </div>
      )}
    </div>
  );
}
