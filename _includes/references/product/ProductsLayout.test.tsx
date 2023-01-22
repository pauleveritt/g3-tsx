import { expect, it, test } from "vitest";
import {
  ProductsLayout,
  ProductsLayoutProduct,
  ProductsRenderProps,
  render,
} from "./ProductsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../../fixtures";

it("should make ProductsLayout", () => {
  const products: ProductsLayoutProduct[] = [
    { title: "Some Product", slug: "some-product" },
    { title: "Another Product", slug: "another-product" },
  ];
  const title = "All Products";
  const subtitle = "Some product subtitle text";
  const content = fixtures.content;
  document.body.innerHTML = ProductsLayout({
    products,
    title,
    subtitle,
    content,
  });
  const items: HTMLUListElement[] = screen.getAllByRole("link", {
    name: "product",
  });
  expect(items[0].textContent).to.equal(products[0].title);
  expect(screen.getByText("world")).to.exist;
});

test("should render ProductsLayout", () => {
  const title = "These Products";
  const subtitle = "Some products text";
  const renderProps: ProductsRenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    title,
    subtitle,
  };
  document.body.innerHTML = render(renderProps);
  const items: HTMLUListElement[] = screen.getAllByRole("link", {
    name: "product",
  });
  expect(items[0].textContent).to.equal("Some Product");
  expect(screen.getByText("world")).to.exist;
});
