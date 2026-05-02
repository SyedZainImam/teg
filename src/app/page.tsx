import Link from "next/link";
import { getCategories, getFeaturedProducts, getSiteSettings } from "@/sanity/queries";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";

export const revalidate = 30;

export default async function Home() {
  let categories: any[] = [];
  let featuredProducts: any[] = [];
  let settings: any = null;

  try {
    categories = (await getCategories()) || [];
    featuredProducts = (await getFeaturedProducts()) || [];
    settings = await getSiteSettings();
  } catch {}

  const whatsappUrl = settings?.whatsappNumber ? `https://wa.me/${settings.whatsappNumber}` : "";

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Quality Equipment,
              <br />
              <span className="text-white/80">Trusted Worldwide</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl">
              Refurbished biomedical devices, laboratory parts, and industrial
              machinery — sourced, tested, and delivered with confidence.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-accent hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-md transition-colors"
              >
                Browse Equipment
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-md transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">
            Our Equipment Categories
          </h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Browse our inventory across three specialized categories of
            professional-grade equipment.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat: any) => (
            <CategoryCard key={cat._id} category={cat} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="bg-muted py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">
                Featured Equipment
              </h2>
              <Link
                href="/products"
                className="text-accent hover:underline font-medium"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why TEG Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">
          Why Choose TEG?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Tested & Verified",
              desc: "Every unit is inspected, tested, and comes with a detailed condition report before shipping.",
              icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
            },
            {
              title: "Global Sourcing",
              desc: "Equipment sourced from North America and Europe, ensuring quality standards and reliable origins.",
              icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            },
            {
              title: "End-to-End Support",
              desc: "From sourcing to freight and customs documentation — we handle the entire supply chain.",
              icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d={item.icon}
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Looking for Specific Equipment?</h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            Tell us what you need and we&apos;ll source it for you. Get a custom
            quote with freight and documentation included.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-md transition-colors"
            >
              Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-md transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
