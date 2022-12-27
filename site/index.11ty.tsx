// @ts-ignore
import h from "vhtml";

// export const data = {
//   title: "Eleventy 11ty.js Extensions",
// };

interface Context {
  log(message: string): void;
}

interface Data {
  readonly siteTitle: string;
}

export function render(this: Context, { siteTitle }: Data) {
  this.log(`\n\n\n ########## ${siteTitle}`);
  return (
    <html lang="en">
      <head>
        <title>{siteTitle}</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@1.5.0/css/pico.min.css"
          integrity="sha256-TMMCiSUqLaqob0cQkqOwl6oJLd2X5WKYJ4ML+BQRQOA="
          crossorigin="anonymous"
        ></link>
      </head>
      <body>
        <main className="container">
          <h1>{siteTitle}</h1>
          <p>
            Example repo to show the value of{" "}
            <a href="https://github.com/11ty/eleventy/issues/2248">
              11ty/eleventy#2248
            </a>
            .
          </p>
        </main>
      </body>
    </html>
  );
}
