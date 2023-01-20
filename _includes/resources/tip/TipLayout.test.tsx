import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { TipLayout } from "./TipLayout.11ty";
import { TipResource } from "./TipModels";
import { AuthorReference } from "../../references/author/AuthorModels";

test("TipLayout", () => {
  const tip: TipResource = {
    title: "Some Title",
    slug: "some-slug",
    resourceType: "tip",
  };
  const content = "<p>some content</p>";
  const author: AuthorReference = {
    title: "Some Author",
    slug: "some-slug",
    resourceType: "author",
    label: "sa",
    resources: [],
    referenceResources: [],
  };

  document.body.innerHTML = TipLayout(tip, content, author);
  const results = screen.getAllByRole("button");
  expect(results).to.exist;

  const authorLink: HTMLAnchorElement = screen.getByRole("link", {
    name: "Some Author",
  });
  expect(authorLink.href).to.equal("some-slug");
});
