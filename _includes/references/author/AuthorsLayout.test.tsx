import { expect, it, test } from "vitest";
import {
  AuthorsLayout,
  AuthorsRenderProps,
  render,
} from "./AuthorsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../../fixtures";

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
  const items: HTMLUListElement[] = screen.getAllByRole("link", {
    name: "Some Author",
  });
  expect(items[0].textContent).to.equal(authors[0].title);
  expect(screen.getByText("world")).to.exist;
});

test("should render AuthorsLayout", () => {
  const title = "These Authors";
  const subtitle = "Some authors text";
  const renderProps: AuthorsRenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    page: {
      url: "/authors",
    },
    title,
    subtitle,
  };
  fixtures.context.getReferences = () => fixtures.authors;
  document.body.innerHTML = render.call(fixtures.context, renderProps);
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Some Author",
  });
  expect(links.length).to.equal(1);
  expect(links[0].href).to.equal("/authors/sa/");
});
