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

      {/* How It Works Section */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Getting equipment from TEG is simple. Here&apos;s our straightforward process from inquiry to delivery.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              {
                step: "01",
                title: "Inquiry",
                desc: "Tell us what equipment you need via WhatsApp or our contact form. We respond within 24 hours.",
                icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
              },
              {
                step: "02",
                title: "Quotation",
                desc: "We send a detailed quote including equipment condition report, freight estimate, and documentation costs.",
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
              },
              {
                step: "03",
                title: "Payment",
                desc: "Secure international wire transfer or LC. We confirm payment and begin preparing your shipment.",
                icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
              },
              {
                step: "04",
                title: "Delivery",
                desc: "We handle export documentation, customs clearance, and freight — delivered to your door worldwide.",
                icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
              },
            ].map((item, i) => (
              <div key={item.step} className="relative text-center">
                {i < 3 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-0.5 bg-primary/20" />
                )}
                <div className="relative inline-flex">
                  <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
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
