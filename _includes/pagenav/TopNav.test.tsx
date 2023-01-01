import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import TopNav, { TopNavProps } from "./TopNav.11ty";

export const topNavProps: TopNavProps = {
  parent: { label: "Parent Label", slug: "parent-slug" },
  siblings: [
    { label: "Sibling 1", slug: "sibling-1" },
    { label: "Sibling 2", slug: "sibling-2" },
    { label: "Sibling 3", slug: "sibling-3" },
  ],
  currentSlug: "sibling-2",
};

test("TopNav", () => {
  document.body.innerHTML = TopNav(topNavProps);

  const parents: HTMLAnchorElement[] = screen.getAllByTitle("Parent Label");
  expect(parents[0].href).to.equal("parent-slug");
  expect(parents[1].href).to.equal("parent-slug");

  const previous: HTMLAnchorElement = screen.getByTitle("Sibling 1");
  expect(previous.href).to.equal("sibling-1");
  const next: HTMLAnchorElement = screen.getByTitle("Sibling 3");
  expect(next.href).to.equal("sibling-3");
});
