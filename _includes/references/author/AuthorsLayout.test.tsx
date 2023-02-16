import { expect, it, test } from "vitest";
import { AuthorsLayout, render } from "./AuthorsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../../fixtures";
import { RenderProps } from "../../../src/models";

it("should make AuthorsLayout", () => {
  const authors = fixtures.authors;
  const title = "All Authors";
  const subtitle = "Some author subtitle text";
  const content = fixtures.content;
  document.body.innerHTML = AuthorsLayout({
    authors,
    title,
    subtitle,
    content,
  });
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Author",
  });
  expect(links[0].href).to.equal("/authors/sa/");
});

test("should render AuthorsLayout", () => {
  const renderProps: RenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    data: {
      title: "Authors",
      subtitle: "Some stuff",
    },
    page: {
      url: "/authors",
      fileSlug: "some-slug",
    },
  };
  fixtures.context.getReferences = () => fixtures.authors;
  document.body.innerHTML = render.call(fixtures.context, renderProps);
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Author",
  });
  expect(links[0].href).to.equal("/authors/sa/");
});
