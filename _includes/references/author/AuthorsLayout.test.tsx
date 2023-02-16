import { expect, test } from "vitest";
import { AuthorsLayout } from "./AuthorsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../../fixtures";
import { RenderProps } from "../../../src/models";

test("should render AuthorsLayout", () => {
  const renderProps: RenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    title: "Authors",
    subtitle: "Some stuff",
    page: {
      url: "/authors",
      fileSlug: "some-slug",
    },
  };
  fixtures.context.getReferences = () => fixtures.authors;
  document.body.innerHTML = AuthorsLayout.call(fixtures.context, renderProps);
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Author",
  });
  expect(links[0].href).to.equal("/authors/sa/");
});
