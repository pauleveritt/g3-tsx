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
  const title = "These Tips";
  const subtitle = "Some tips text";
  const content = fixtures.content;
  document.body.innerHTML = TipsLayout({ tips, title, subtitle, content });
  const items: HTMLUListElement[] = screen.getAllByRole("link", {
    name: "Some Title",
  });
  expect(items[0].textContent).to.equal(tips[0].title);
  expect(screen.getByText("world")).to.exist;
});

test("should render TipsLayout", () => {
  const title = "These Tips";
  const subtitle = "Some tips text";
  const renderProps: TipsRenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    title,
    subtitle,
  };
  document.body.innerHTML = render(renderProps);
  expect(screen.getByText("world")).to.exist;
});
