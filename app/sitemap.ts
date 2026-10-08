import type { MetadataRoute } from "next";
import { business } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: business.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
