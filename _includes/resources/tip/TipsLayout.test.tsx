import { expect, test } from "vitest";
import {
  TipsLayout,
  TipsLayoutTip,
  TipsRenderProps,
  render,
} from "./TipsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../../fixtures";

test("should make TipsLayout", () => {
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

test("should render TipsLayout", () => {
  const renderProps: TipsRenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
  };
  document.body.innerHTML = render(renderProps);
  expect(screen.getByText("world")).to.exist;
});
