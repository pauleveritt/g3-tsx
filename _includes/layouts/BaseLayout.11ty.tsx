// @ts-ignore
import h, { JSX } from "vhtml";
import Navbar from "../navbar/Navbar.11ty";
import site from "../site.json";
import Footer from "../footer/Footer.11ty";

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
        <script
          defer
          src="https://use.fontawesome.com/releases/v6.0.0-beta3/js/all.js"
        ></script>
        <link rel="stylesheet" href="/assets/videojs/video-js.min.css" />
        <link
          href="https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css"
          rel="stylesheet"
        />
        <script defer src="/assets/videojs/video.min.js"></script>
        <script defer src="/assets/videojs/Youtube.min.js"></script>
        <link rel="shortcut icon" href="/assets/favicon.ico" />
      </head>
      <body>
        <Navbar></Navbar>
        {children}
        <Footer copyright={copyright}></Footer>
      </body>
    </html>
  );
};

export const render = (data: any): JSX.Element => {
  return <BaseLayout pageTitle={data.title}>{data.children}</BaseLayout>;
};
