import { MetadataRoute } from "next";
import { createClient }  from "@/lib/supabase/server";
import { CATEGORIES }    from "@/lib/constants/categories";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sikandar-library.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                     lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE_URL}/library`,        lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/halaqa`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/marja`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/ilm-assistant`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/knowledge-tree`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/heritage`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE_URL}/about`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/trust-policy`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url:             `${BASE_URL}/library/${cat.slug}`,
    lastModified:    new Date(),
    changeFrequency: "weekly" as const,
    priority:        0.7,
  }));

  // Dynamic book pages
  let bookPages: MetadataRoute.Sitemap = [];
  try {
    const supabase = createClient();
    const { data: books } = await supabase
      .from("books")
      .select("slug, updated_at")
      .eq("verification_status", "verified");

    if (books) {
      bookPages = books.map((book) => ({
        url:             `${BASE_URL}/book/${book.slug}`,
        lastModified:    new Date(book.updated_at),
        changeFrequency: "monthly" as const,
        priority:        0.6,
      }));
    }
  } catch {
    // Supabase not configured yet during build
  }

  return [...staticPages, ...categoryPages, ...bookPages];
}
