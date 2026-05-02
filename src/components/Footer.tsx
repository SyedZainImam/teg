import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-xl font-bold mb-4">TEG</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Technical Equipment Group - Your trusted source for quality
              refurbished biomedical equipment, laboratory parts, and industrial
              machinery.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/categories/biomedical" className="hover:text-white transition-colors">
                  Biomedical Equipment
                </Link>
              </li>
              <li>
                <Link href="/categories/lab-parts" className="hover:text-white transition-colors">
                  Lab Parts &amp; Supplies
                </Link>
              </li>
              <li>
                <Link href="/categories/utilities-machinery" className="hover:text-white transition-colors">
                  Utilities Machinery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="mailto:info@tegequipment.com" className="hover:text-white transition-colors">
                  info@tegequipment.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/1234567890" className="hover:text-white transition-colors">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} TEG - Technical Equipment Group. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
