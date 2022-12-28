// @ts-ignore
import h from "vhtml";
import { Static, Type } from "https://esm.sh/@sinclair/typebox";

const Data = Type.Object({
  siteTitle: Type.String(),
});
type Data = Static<typeof Data>;

interface Context {
  log(message: string): void;
}

const TITLE = "Hello TSX";

export function render(this: Context, { siteTitle }: Data) {
  return (
    <html lang="en">
      <body> {siteTitle}</body>
    </html>
  );
}
