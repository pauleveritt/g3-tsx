import h, { JSX } from "vhtml";
import Image, { Metadata } from "@11ty/eleventy-img";
import { imageOptions } from "../src/registration";

export type ImageProps = {
  src: string;
  alt?: string;
  className?: string;
};

const Thumbnail = ({ src, alt, className }: ImageProps): JSX.Element => {
  // fire and forget
  Image(src, imageOptions);

  const attributes = {
    alt,
    class: className,
    sizes: "100vw",
    loading: "lazy",
    decoding: "async",
  } as any;

  const metadata = Image.statsSync(src, imageOptions);
  const html = Image.generateHTML(metadata, attributes);

  return <span dangerouslySetInnerHTML={{ __html: html }}></span>;
};

export function getThumbnailUrl(src?: string): string {
  if (src) {
    const metadata = Image.statsSync(src, imageOptions) as Metadata;
    if (metadata.webp && metadata.webp[0]) {
      return metadata.webp[0].url;
    }
  }
  // TODO: create fallback og:image here
  return "";
}

export default Thumbnail;
