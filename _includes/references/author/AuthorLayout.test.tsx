import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { AuthorLayout } from "./AuthorLayout.11ty";
import fixtures from "../../fixtures";
import { RenderProps } from "../../../src/models";

test("should render AuthorLayout", () => {
  const renderProps: RenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    page: {
      fileSlug: fixtures.authors[0].slug,
      url: "/some-url/",
    },
  };
  fixtures.context.getResources = () =>
    Array.from(fixtures.resolvedCollections.allResources.values());
  document.body.innerHTML = AuthorLayout.call(fixtures.context, renderProps);
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Resource",
  });
  expect(links.length).to.equal(8);
  expect(links[0].href).to.equal("/tips/some-tip/");
});
