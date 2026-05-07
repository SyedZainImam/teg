import Link from "next/link";

export const metadata = {
  title: "About - TEG Equipment",
  description: "Learn about Titan Equipment Global Inc. - your trusted partner for refurbished medical, lab, and industrial equipment.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">About TEG</h1>
          <p className="mt-4 text-white/70 max-w-2xl text-lg">
            Titan Equipment Global Inc. specializes in sourcing, testing, and
            exporting quality refurbished equipment to markets worldwide.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">What We Do</h2>
            <p className="text-gray-600 leading-relaxed">
              TEG bridges the gap between surplus equipment markets in North America
              and Europe and the growing demand in developing markets. We specialize
              in three core segments: biomedical equipment, laboratory parts and
              consumables, and industrial utilities machinery.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Process</h2>
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Source",
                  desc: "We identify and procure quality equipment from trusted dealers, hospitals, and manufacturers across North America and Europe.",
                },
                {
                  step: "2",
                  title: "Test & Verify",
                  desc: "Every unit is inspected, tested, and documented with serial numbers, accessories lists, condition reports, and test images or videos.",
                },
                {
                  step: "3",
                  title: "Ship & Support",
                  desc: "We handle freight logistics, customs documentation, and provide end-to-end support from purchase to delivery at your facility.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Who We Serve
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our customers include hospitals, diagnostic centers, pharmaceutical
              laboratories, industrial plants, engineering firms, and equipment
              dealers. We serve buyers across Pakistan and other emerging markets
              seeking reliable, cost-effective alternatives to new equipment.
            </p>
          </div>

          <div className="bg-muted p-8 rounded-lg text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Ready to get started?
            </h3>
            <p className="text-gray-500 mb-4">
              Contact us to discuss your equipment needs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-accent hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-md transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
