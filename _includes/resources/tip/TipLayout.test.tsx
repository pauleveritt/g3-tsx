import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { TipLayout, TipRenderProps, render } from "./TipLayout.11ty";
import fixtures from "../../fixtures";

test("should make TipLayout", () => {
  const children = fixtures.content;
  document.body.innerHTML = TipLayout({
    tip: fixtures.tips[0],
    children: [children],
    author: fixtures.authors[0],
    leadin: "<p>Safe Leadin</p>",
  });
  const results = screen.getAllByRole("button");
  expect(results).to.exist;

  const authorLink: HTMLAnchorElement = screen.getByRole("link", {
    name: "Some Author",
  });
  expect(authorLink.href).to.equal("sa");
});

test("should render TipLayout", () => {
  const renderProps: TipRenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    page: {
      url: fixtures.tips[0].url,
    },
  };
  document.body.innerHTML = render(renderProps);
  expect(screen.getByText("Some Tip")).to.exist;
});
