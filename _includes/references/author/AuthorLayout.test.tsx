import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { AuthorLayout, render } from "./AuthorLayout.11ty";
import fixtures from "../../fixtures";
import { RenderProps } from "../../../src/models";

test("should make AuthorLayout", () => {
  const author = fixtures.authors[0];
  const children = fixtures.content;
  const linkedResources = Array.from(
    fixtures.resolvedCollections.allResources.values()
  );
  document.body.innerHTML = AuthorLayout({
    title: author.title,
    subtitle: author.subtitle,
    thumbnail: author.thumbnail,
    children: [children],
    linkedResources,
  });
  const results = screen.getAllByText(author.title);
  expect(results).to.exist;
});

test("should render AuthorLayout", () => {
  const renderProps: RenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    data: {},
    page: {
      fileSlug: fixtures.authors[0].slug,
      url: "/some-url/",
    },
  };
  fixtures.context.getResources = () =>
    Array.from(fixtures.resolvedCollections.allResources.values());
  document.body.innerHTML = render.call(fixtures.context, renderProps);
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Resource",
  });
  expect(links.length).to.equal(5);
  expect(links[0].href).to.equal("/tips/some-tip/");
});
