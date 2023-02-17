import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { Product } from "./ProductModels";
import { RenderContext, RenderProps } from "../../../src/models";
import Thumbnail from "../../Image.11ty";

export function ProductsLayout(
  this: RenderContext,
  { content, title, subtitle }: RenderProps
): JSX.Element {
  const products = this.getReferences("product") as Product[];
  const figure = undefined;
  const listing = (
    <nav className="bd-links bio-resourcecards">
      {products.map((product) => (
        <a
          aria-label={`Product`}
          className="bd-link"
          href={product.url}
          title={product.title}
        >
          <h2 className="bd-link-name">
            <figure className="bd-link-figure">
              <div className="image is-rounded is-64x64">
                <Thumbnail
                  src={product.logo}
                  alt={`${product.title} image`}
                  className="bio-resourcecard-logo"
                />
              </div>
            </figure>
            {product.title}
          </h2>
          {product.subtitle && (
            <p className="bd-link-subtitle">{product.subtitle}</p>
          )}
        </a>
      ))}
    </nav>
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
