import { expect, it, test } from "vitest";
import {
  ProductsLayout,
  ProductsRenderProps,
  render,
} from "./ProductsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../../fixtures";

it("should make ProductsLayout", () => {
  const products = fixtures.products;
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
  expect(items[0].textContent).to.equal("Some Product");
  expect(screen.getByText("world")).to.exist;
});

test("should render ProductsLayout", () => {
  const title = "These Products";
  const subtitle = "Some products text";
  const renderProps: ProductsRenderProps = {
    content: fixtures.content,
    title,
    subtitle,
  };
  fixtures.context.getReferences = () => fixtures.products;
  document.body.innerHTML = render.call(fixtures.context, renderProps);
  const items: HTMLUListElement[] = screen.getAllByRole("link", {
    name: "product",
  });
  expect(items[0].textContent).to.equal("Some Product");
  expect(screen.getByText("world")).to.exist;
});
