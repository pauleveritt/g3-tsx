import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import TipSidebar, { TipSidebarProps } from "./TipSidebar.11ty";

export const tipSidebarProps: TipSidebarProps = {
  date: "2023-01-01",
  author: {
    thumbnail: "some-author-thumbnail.png",
    slug: "some-author-slug",
    title: "Some Author Title",
  },
  products: [{ label: "Some Product Label", slug: "some-product-slug" }],
  technologies: [
    { label: "Some Technology Label", slug: "/some-technology-slug" },
  ],
  topics: [{ label: "Some Topic Label", slug: "/some-topic-slug" }],
  body: "The body",
  seealsos: [
    { title: "See Also 1", href: "/see-also-1" },
    { title: "See Also 2", href: "/see-also-2" },
  ],
};

test("TipSidebar", () => {
  document.body.innerHTML = TipSidebar(tipSidebarProps);

  // Published
  expect(screen.getByText("Some Author Title")).to.exist;

  // Technologies, Products, Topics
  expect(screen.getByText("Some Technology Label")).to.exist;
  expect(screen.getByText("Some Product Label")).to.exist;
  expect(screen.getByText("Some Topic Label")).to.exist;

  // Doclinks
  expect(screen.getByText("In Depth")).to.exist;
  expect(screen.getByText("See Also")).to.exist;
});
