const localBanners: Record<string, string> = Object.fromEntries(
  Object.entries(import.meta.glob("@/assets/blog/*-banner.{jpg,png,webp}", { eager: true, import: "default" })).map(
    ([path, url]) => {
      const filename = path.split("/").pop() || "";
      const slug = filename.replace(/-banner\.\w+$/, "");
      return [slug, url as string];
    }
  )
);

export default localBanners;
