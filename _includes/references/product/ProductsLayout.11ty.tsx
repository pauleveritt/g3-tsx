import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { SiteCollections } from "../../models";
import { ProductReference } from "./ProductModels";
import { RenderContext } from "../../../src/models";

export type ProductsLayoutProps = {
  products: Iterable<ProductReference>;
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
      {Array.from(products).map((product) => {
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
  collections: SiteCollections;
  content: string;
  title: string;
  subtitle?: string;
};

export function render(
  this: RenderContext,
  { collections, content, title, subtitle }: ProductsRenderProps
): JSX.Element {
  return (
    <ProductsLayout
      products={collections.productReferences.values()}
      title={title}
      subtitle={subtitle}
      content={content}
    />
  );
}
