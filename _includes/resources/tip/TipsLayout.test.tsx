import { expect, test } from "vitest";
import { TipsLayout, TipsLayoutTip } from "./TipsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../../fixtures";

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
  const { children } = fixtures;
  document.body.innerHTML = TipsLayout({ tips, children });
  const items: HTMLUListElement[] = screen.getAllByRole("listitem", {
    name: "tip",
  });
  expect(items[0].textContent).to.equal(tips[0].title);
  expect(screen.getByText("world")).to.exist;
});
