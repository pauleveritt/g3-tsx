import { expect, test } from "vitest";
import { render, TipLayoutProps } from "./tip.11ty";

const props: TipLayoutProps = {
  title: "Some Tip",
  content: `<a id="link42" href="/">Some Link</a>`,
};
test("render Tip Layout", () => {
  document.write(render(props));
  const link = document.getElementById("link42");
  expect(link).to.exist;
});
