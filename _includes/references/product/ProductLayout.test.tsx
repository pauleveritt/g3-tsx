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
  const referenceResources = Array.from(
    fixtures.collections.allResources.values()
  );
  document.body.innerHTML = ProductLayout({
    title: product.title,
    subtitle: product.subtitle,
    children: [children],
    referenceResources,
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
  fixtures.context.getResources = () =>
    Array.from(fixtures.resolvedCollections.allResources.values());
  document.body.innerHTML = render.call(fixtures.context, renderProps);
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Resource",
  });
  expect(links.length).to.equal(2);
  expect(links[0].href).to.equal("/tips/some-tip/");
});
