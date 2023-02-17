// @ts-ignore
import h, { JSX } from "vhtml";
import Navbar from "../navbar/Navbar.11ty";
import site from "../site.json";
import Footer from "../footer/Footer.11ty";
import { RenderContext } from "../../src/models";

export type BaseLayoutProps = {
  pageTitle: string;
  children: string[];
};

export const BaseLayout = ({
  pageTitle,
  children,
}: BaseLayoutProps): JSX.Element => {
  const { siteTitle, copyright } = site;
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          {pageTitle} - {siteTitle}
        </title>
        <link rel="stylesheet" href="/assets/guide.css" />
        <link rel="icon" href="/assets/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/assets/favicon.ico" />
        <script
          defer
          src="https://use.fontawesome.com/releases/v6.0.0-beta3/js/all.js"
        ></script>
        <link
          href="https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.21.2/video-js.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar></Navbar>
        {children}
        <Footer copyright={copyright}></Footer>
        <script
          defer
          src="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.21.2/video.min.js"
        />
        <script
          defer
          src="https://cdnjs.cloudflare.com/ajax/libs/videojs-youtube/2.6.1/Youtube.min.js"
        />
      </body>
    </html>
  );
};

export type BaseLayoutRenderProps = {
  children: string[];
  title: string;
};

export function render(
  this: RenderContext,
  { title, children }: BaseLayoutRenderProps
): JSX.Element {
  return <BaseLayout pageTitle={title}>{children}</BaseLayout>;
}
