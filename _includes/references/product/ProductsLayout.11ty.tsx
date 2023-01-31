import { h } from "nano-jsx";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { Collections } from "../../models";

export type ProductsLayoutProduct = {
  title: string;
  slug: string;
};
export type ProductsLayoutProps = {
  products: ProductsLayoutProduct[];
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
  collections: Collections;
  content: string;
  title: string;
  subtitle?: string;
};

export function render({
  collections,
  content,
  title,
  subtitle,
}: ProductsRenderProps): JSX.Element {
  // Flatten/de-normalize the joins, e.g. product
  const products: ProductsLayoutProduct[] = Object.values(
    collections.productReferences
  ).map((product) => {
    return {
      title: product.title,
      slug: product.slug,
    };
  });
  // TODO Add some sorting
  return (
    <ProductsLayout
      products={products}
      title={title}
      subtitle={subtitle}
      content={content}
    />
  );
}
