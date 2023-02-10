import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { ProductReference } from "./ProductModels";
import { RenderContext } from "../../../src/models";

export type ProductsLayoutProps = {
  products: ProductReference[];
  title: string;
  subtitle?: string;
  content: string;
};

export function ProductsLayout({
  products,
  title,
  subtitle,
  content,
}: ProductsLayoutProps): JSX.Element {
  const figure = undefined;
  const listing = (
    <ul>
      {products.map((product) => {
        return (
          <li>
            <a aria-label="product" href={product.slug}>
              {product.title}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <ReferenceLayout
      title={title}
      subtitle={subtitle}
      figure={figure}
      listing={[listing]}
      content={content}
    />
  );
}

export type ProductsRenderProps = {
  content: string;
  title: string;
  subtitle?: string;
};

export function render(
  this: RenderContext,
  { content, title, subtitle }: ProductsRenderProps
): JSX.Element {
  const products = this.getReferences("product") as ProductReference[];
  return (
    <ProductsLayout
      products={products}
      title={title}
      subtitle={subtitle}
      content={content}
    />
  );
}
