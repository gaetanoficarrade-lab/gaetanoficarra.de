/**
 * <Picture> – Performance-optimized image component.
 *
 * Loads modern formats (AVIF, then WebP) when supported, falling back to the
 * original. Vite resolves the imports at build time via ?url so unused formats
 * are NOT shipped if a browser doesn't request them.
 *
 * Usage:
 *   import portrait from "@/assets/gaetano-portrait.jpg";
 *   import portraitWebp from "@/assets/gaetano-portrait.webp";
 *   import portraitAvif from "@/assets/gaetano-portrait.avif";
 *   <Picture src={portrait} webp={portraitWebp} avif={portraitAvif}
 *            alt="..." width={500} height={500} fetchPriority="high" />
 */
import { ImgHTMLAttributes } from "react";

interface PictureProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  webp?: string;
  avif?: string;
  alt: string;
  width: number;
  height: number;
  /** "high" | "low" | "auto" */
  fetchPriority?: "high" | "low" | "auto";
  /** Defaults to "lazy" (use "eager" for above-the-fold) */
  loading?: "lazy" | "eager";
  /** Defaults to "async" */
  decoding?: "async" | "sync" | "auto";
  pictureClassName?: string;
}

const Picture = ({
  src,
  webp,
  avif,
  alt,
  width,
  height,
  className,
  pictureClassName,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  ...rest
}: PictureProps) => {
  return (
    <picture className={pictureClassName}>
      {avif && <source srcSet={avif} type="image/avif" />}
      {webp && <source srcSet={webp} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        decoding={decoding}
        // @ts-expect-error - fetchpriority is a valid HTML attribute
        fetchpriority={fetchPriority}
        {...rest}
      />
    </picture>
  );
};

export default Picture;
