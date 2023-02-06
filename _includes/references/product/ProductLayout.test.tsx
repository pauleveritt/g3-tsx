import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import {
  ProductLayout,
  ProductRenderProps,
  render,
} from "./ProductLayout.11ty";
import fixtures from "../../fixtures";

test("should make ProductLayout", () => {
  const product = fixtures.products[0];
  const children = fixtures.content;
  document.body.innerHTML = ProductLayout({
    title: product.title,
    subtitle: product.subtitle,
    children: [children],
    referenceResources: [
      { title: "Some Title", url: "/products/some-slug/", thumbnail: "t1" },
      {
        title: "Another Title",
        url: "/products/another-slug/",
        thumbnail: "t2",
      },
    ],
  });
  const results = screen.getAllByText(product.title);
  expect(results).to.exist;
});

test("should render ProductLayout", () => {
  const renderProps: ProductRenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    page: {
      fileSlug: fixtures.products[0].slug,
    },
  };
  document.body.innerHTML = render.call(fixtures.context, renderProps);
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "resource",
  });
  expect(links.length).to.equal(1);
  expect(links[0].href).to.equal("/tips/another-tip/");
});
