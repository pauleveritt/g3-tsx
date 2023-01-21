import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { TipLayout, TipRenderProps } from "./TipLayout.11ty";
import fixtures from "../../fixtures";
import { render } from "./TipsLayout.11ty";

test("should make TipsLayout", () => {
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
  expect(authorLink.href).to.equal("some-author");
});

test("should render TipLayout", () => {
  const renderProps: TipRenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    page: {
      fileSlug: fixtures.tips[0].slug,
    },
  };
  document.body.innerHTML = render(renderProps);
  expect(screen.getByText("world")).to.exist;
});
