export type BlogCategory = "Automatisierung" | "CRM" | "Marketing" | "Funnelmate" | "Tipps & Tricks";

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  date: string;
  readingTime: string;
}

export const blogCategories: BlogCategory[] = [
  "Automatisierung",
  "CRM",
  "Marketing",
  "Funnelmate",
  "Tipps & Tricks",
];

export const blogPosts: BlogPost[] = [];
