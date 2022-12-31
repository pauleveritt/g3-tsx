import { expect, test } from "vitest";
import { render, TipLayoutProps } from "./tip.11ty";
import { makeDocument } from "./fixtures";

const props: TipLayoutProps = {
  title: "Some Tip",
  content: `<a id="link42" href="/">Some Link</a>`,
};
test("render Tip Layout", () => {
  const thisDocument = makeDocument(render(props));
  const title = thisDocument.querySelector("title");
  expect(title && title.textContent).to.equal("Some Tip - PyCharm Guide");
});
