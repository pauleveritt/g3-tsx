import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { AuthorLayout, AuthorRenderProps, render } from "./AuthorLayout.11ty";
import fixtures from "../../fixtures";

test("should make AuthorLayout", () => {
  const author = fixtures.authors[0];
  const children = fixtures.content;
  const referenceResources = Array.from(
    fixtures.collections.allResources.values()
  );
  document.body.innerHTML = AuthorLayout({
    title: author.title,
    subtitle: author.subtitle,
    thumbnail: author.thumbnail,
    children: [children],
    referenceResources,
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
      url: "/some-url/",
    },
  };
  document.body.innerHTML = render.call(fixtures.context, renderProps);
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "resource",
  });
  expect(links.length).to.equal(1);
  expect(links[0].href).to.equal("/tips/some-tip/");
});
