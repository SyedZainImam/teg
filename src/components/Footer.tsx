import Link from "next/link";

interface Category {
  title: string;
  slug: { current: string };
}

interface FooterProps {
  categories?: Category[];
  whatsapp?: string;
  email?: string;
  location?: string;
}

export default function Footer({ categories = [], whatsapp = "", email = "", location = "" }: FooterProps) {
  const whatsappUrl = whatsapp ? `https://wa.me/${whatsapp}` : "";

  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-xl font-bold mb-4">TEG</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Titan Equipment Global Inc. - Your trusted source for quality
              refurbished biomedical equipment, laboratory parts, and industrial
              machinery.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {categories.map((cat) => (
                <li key={cat.slug.current}>
                  <Link
                    href={`/categories/${cat.slug.current}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                    {email}
                  </a>
                </li>
              )}
              {whatsappUrl && (
                <li>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    WhatsApp
                  </a>
                </li>
              )}
              {location && (
                <li>{location}</li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} TEG - Titan Equipment Global Inc. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
