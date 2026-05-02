import { client, isSanityConfigured } from "./client";

export async function getSiteSettings() {
  if (!isSanityConfigured) return null;
  return client.fetch(`*[_type == "siteSettings"][0] {
    whatsappNumber,
    email,
    location
  }`);
}

export async function getCategories() {
  if (!isSanityConfigured) return [];
  return client.fetch(`*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    image
  }`);
}

export async function getCategoryBySlug(slug: string) {
  if (!isSanityConfigured) return null;
  return client.fetch(
    `*[_type == "category" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      image
    }`,
    { slug }
  );
}

export async function getProducts() {
  if (!isSanityConfigured) return [];
  return client.fetch(`*[_type == "product"] | order(name asc) {
    _id,
    name,
    slug,
    brand,
    model,
    condition,
    priceRange,
    images,
    featured,
    category->{title, slug}
  }`);
}

export async function getProductsByCategory(categorySlug: string) {
  if (!isSanityConfigured) return [];
  return client.fetch(
    `*[_type == "product" && category->slug.current == $categorySlug] | order(name asc) {
      _id,
      name,
      slug,
      brand,
      model,
      condition,
      priceRange,
      images,
      category->{title, slug}
    }`,
    { categorySlug }
  );
}

export async function getProductBySlug(slug: string) {
  if (!isSanityConfigured) return null;
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      brand,
      model,
      year,
      condition,
      description,
      features,
      specifications,
      includedAccessories,
      images,
      countryOfOrigin,
      priceRange,
      targetBuyer,
      category->{title, slug}
    }`,
    { slug }
  );
}

export async function getFeaturedProducts() {
  if (!isSanityConfigured) return [];
  return client.fetch(`*[_type == "product" && featured == true][0...6] {
    _id,
    name,
    slug,
    brand,
    model,
    condition,
    priceRange,
    images,
    category->{title, slug}
  }`);
}
