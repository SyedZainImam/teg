import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCategories, getSiteSettings } from "@/sanity/queries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const revalidate = 30;

export const metadata: Metadata = {
  title: "TEG - Technical Equipment Group",
  description:
    "Quality refurbished biomedical equipment, laboratory parts, and industrial machinery. Trusted supplier of used medical devices, HPLC parts, air compressors, and diesel generators.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let categories: any[] = [];
  let settings: any = null;
  try {
    categories = (await getCategories()) || [];
    settings = await getSiteSettings();
  } catch {}

  const whatsapp = settings?.whatsappNumber || "";
  const email = settings?.email || "";
  const location = settings?.location || "";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header categories={categories} whatsapp={whatsapp} />
        <main className="flex-1">{children}</main>
        <Footer categories={categories} whatsapp={whatsapp} email={email} location={location} />
      </body>
    </html>
  );
}
