"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroImage {
  image: any;
  alt?: string;
  url: string;
}

interface Props {
  images: HeroImage[];
  whatsappUrl: string;
}

const INTERVAL = 5000;

export default function HeroCarousel({ images, whatsappUrl }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative overflow-hidden text-white" style={{ minHeight: "480px" }}>
      {/* Slides */}
      {images.length > 0 ? (
        images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={img.url}
              alt={img.alt || "Hero image"}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />
            {/* dark overlay so text stays readable */}
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))
      ) : (
        /* fallback gradient when no images uploaded */
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light" />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
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

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
