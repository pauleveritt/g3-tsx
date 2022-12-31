// @ts-ignore
import h, { JSX } from "vhtml";
import Navbar from "../_includes/navbar/Navbar.11ty";
import site from "./site.json";
import Footer from "../_includes/footer/Footer.11ty";

export type BaseLayoutProps = {
  pageTitle: string;
  children: string[];
};
const BaseLayout = ({ pageTitle, children }: BaseLayoutProps): JSX.Element => {
  const { siteTitle, copyright } = site;
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          {pageTitle} - {siteTitle}
        </title>
        <link rel="stylesheet" href="/assets/bulma.css" />
        <link rel="icon" href="/assets/favicon.ico" type="image/x-icon" />
        <script
          defer
          src="https://use.fontawesome.com/releases/v6.0.0-beta3/js/all.js"
        ></script>
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

export default BaseLayout;
