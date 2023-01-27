import h, { JSX } from "vhtml";
// @ts-ignore
import Image from "@11ty/eleventy-img";

export type ImageProps = {
  src: string,
  alt? : string,
  width: number,
  sizes?: number[],
  className?: string
};

const GuideImage = ({ src, alt, width, sizes, className }: ImageProps): JSX.Element => {
  let options = {
    widths: [ width, "auto" ],
    formats: [ "webp", "png" ],
    outputDir: "./public/assets/img/",
    urlPath: "/assets/img/"
  };

  // default to a size of just the width passed in
  sizes = sizes ? sizes : [ width ];

  (async () => await Image(src, options))();
  let attributes = {
    class: className,
    alt,
    sizes,
    loading: "lazy",
    decoding: "async"
  };

  let metadata = Image.statsSync(src, options);
  let html = Image.generateHTML(metadata, attributes);

  return <div dangerouslySetInnerHTML={{__html: html}}></div>
};

export default GuideImage;