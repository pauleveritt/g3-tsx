import { expect, test } from "vitest";
import { ProductsLayout } from "./ProductsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../../fixtures";
import { ProductLayoutProps } from "./ProductLayout.11ty";

test("should render ProductsLayout", () => {
  const renderProps: ProductLayoutProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    ...fixtures.productItems[0].data,
    page: { ...fixtures.productItems[0].page },
  };
  fixtures.context.getReferences = () => fixtures.products;
  document.body.innerHTML = ProductsLayout.call(fixtures.context, renderProps);
  const items: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Product",
  });
  expect(items[0].title).to.equal("Some Product");
});
