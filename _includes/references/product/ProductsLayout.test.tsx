import { expect, test } from "vitest";
import { ProductsLayout } from "./ProductsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../../fixtures";
import { RenderProps } from "../../../src/models";

test("should render ProductsLayout", () => {
  const title = "These Products";
  const subtitle = "Some products text";
  const renderProps: RenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    title,
    subtitle,
    page: {
      fileSlug: "slug",
      url: "url",
    },
  };
  fixtures.context.getReferences = () => fixtures.products;
  document.body.innerHTML = ProductsLayout.call(fixtures.context, renderProps);
  const items: HTMLUListElement[] = screen.getAllByRole("link", {
    name: "product",
  });
  expect(items[0].textContent).to.equal("Some Product");
  expect(screen.getByText("world")).to.exist;
});
