// @ts-ignore
import h from "vhtml";
import { Static, Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

export interface Context {
  log(message: string): void;
}

const Data = Type.Object({
  siteTitle: Type.String(),
});
export type Data = Static<typeof Data>;

export function render(thisData: Data) {
  if (!Value.Check(Data, thisData)) {
    const errors = [...Value.Errors(Data, thisData)];
    console.log(`\n\n\n ########## Invalid page data`, errors);
  }
  return (
    <html lang="en">
      <head>
        <title>{thisData.siteTitle}</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@1.5.0/css/pico.min.css"
          integrity="sha256-TMMCiSUqLaqob0cQkqOwl6oJLd2X5WKYJ4ML+BQRQOA="
          crossorigin="anonymous"
        ></link>
      </head>
      <body>
        <main className="container">
          <h1>{thisData.siteTitle}</h1>
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
