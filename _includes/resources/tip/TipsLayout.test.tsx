import { expect, test } from "vitest";
import { TipsLayout, TipsLayoutTip } from "./TipsLayout.11ty";
import { screen } from "@testing-library/dom";
import h from "vhtml";

test("should render TipsLayout", () => {
  const tips: TipsLayoutTip[] = [
    {
      title: "Some Title",
      slug: "some-slug",
      author: { title: "Some Author" },
    },
    {
      title: "Another Title",
      slug: "another-slug",
      author: { title: "Another Author" },
    },
  ];
  const content = `<p>Hello <em id="world">world</em>.</p>`;
  const children = [
    h("main", {
      dangerouslySetInnerHTML: { __html: content },
    }),
  ];
  document.body.innerHTML = TipsLayout({ tips, children });
  const items: HTMLUListElement[] = screen.getAllByRole("listitem", {
    name: "tip",
  });
  expect(items[0].textContent).to.equal(tips[0].title);
  expect(screen.getByText("world")).to.exist;
});
