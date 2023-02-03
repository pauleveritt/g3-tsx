import h, { JSX } from "vhtml";
// @ts-ignore
import Image from "@11ty/eleventy-img";
import { imageOptions } from "./config";

export type ImageProps = {
  src: string;
  alt?: string;
  className: string;
};

const Thumbnail = ({ src, alt, className }: ImageProps): JSX.Element => {
  // fire and forget
  Image(src, imageOptions);

  const attributes = {
    class: className,
    alt,
    sizes: "100vw",
    loading: "lazy",
    decoding: "async",
  };

  const metadata = Image.statsSync(src, imageOptions);
  const html = Image.generateHTML(metadata, attributes);

  return <span dangerouslySetInnerHTML={{ __html: html }}></span>;
};

export default Thumbnail;
