import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { AuthorLayout, AuthorRenderProps, render } from "./AuthorLayout.11ty";
import fixtures from "../../fixtures";

test("should make AuthorLayout", () => {
  const author = fixtures.authors[0];
  const children = fixtures.content;
  document.body.innerHTML = AuthorLayout({
    title: author.title,
    subtitle: author.subtitle,
    thumbnail: author.thumbnail,
    children: [children],
    referenceResources: [],
  });
  const results = screen.getAllByText(author.title);
  expect(results).to.exist;
});

test("should render AuthorLayout", () => {
  const renderProps: AuthorRenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    page: {
      fileSlug: fixtures.authors[0].slug,
    },
  };
  document.body.innerHTML = render(renderProps);
  expect(screen.getByText("Some Author")).to.exist;
});
