import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { Product } from "./ProductModels";
import { RenderContext, RenderProps } from "../../../src/models";

export function ProductsLayout(
  this: RenderContext,
  { content, title, subtitle }: RenderProps
): JSX.Element {
  const products = this.getReferences("product") as Product[];
  const figure = undefined;
  const listing = (
    <ul>
      {products.map((product) => {
        return (
          <li>
            <a aria-label="product" href={product.url}>
              {product.title}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <ReferenceLayout
      title={title as string}
      subtitle={subtitle}
      figure={figure}
      listing={[listing]}
      content={content}
    />
  );
}

export const render = ProductsLayout;
