import h, { JSX } from "vhtml";
// @ts-ignore
import Image from "@11ty/eleventy-img";

export type ImageProps = {
  src: string;
  alt?: string;
  widths: number[];
  sizes?: string;
  formats: string[];
  className?: string;
};

const GuideImage = ({
  src,
  alt,
  widths,
  formats,
  sizes,
  className,
}: ImageProps): JSX.Element => {
  const options = {
    widths: widths,
    formats: formats,
    outputDir: "./public/assets/img/",
    urlPath: "/assets/img/",
  };

  // fire and forget
  Image(src, options);

  sizes = sizes ? sizes : "100vw";

  const attributes = {
    class: className,
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  const metadata = Image.statsSync(src, options);
  const html = Image.generateHTML(metadata, attributes);

  return <span dangerouslySetInnerHTML={{ __html: html }}></span>;
};

export default GuideImage;
