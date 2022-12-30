// @ts-ignore
import h, { JSX } from "vhtml";
import Navbar from "./navbar/Navbar.11ty";

type BaseLayoutProps = {
  pageTitle: string;
  siteTitle: string;
  children: string[];
};
const BaseLayout = ({
  pageTitle,
  siteTitle,
  children,
}: BaseLayoutProps): JSX.Element => (
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
      <main class="section">
        <h1 class="title"></h1>
        <div class="container content">{children}</div>
      </main>
    </body>
  </html>
);

export default BaseLayout;
