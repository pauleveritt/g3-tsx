// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import BaseLayout from "./components/BaseLayout.11ty";

export function render(): JSX.Element {
  return (
    <BaseLayout pageTitle={`This title`} siteTitle={`The Site`}>
      <div>
        <span>
          First <strong>child</strong>
        </span>
      </div>
    </BaseLayout>
  );
  // return (
  //   <html lang="en">
  //     <head>
  //       <title>{siteTitle}</title>
  //       <link rel="stylesheet"></link>
  //     </head>
  //     <body>
  //       <h1>{siteTitle}</h1>
  //       <main className="container">{content}</main>
  //     </body>
  //   </html>
  // );
}
