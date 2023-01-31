// noinspection ES6UnusedImports
import { h } from "nano-jsx";

export type ResourceCardProduct = {
  label: string;
  slug: string;
};

export type ResourceCardProductsProps = {
  items: ResourceCardProduct[];
};
const ResourceCardProducts = ({
  items,
}: ResourceCardProductsProps): JSX.Element => {
  return (
    <>
      {items.map((product) => (
        <span class="bio-common-card-references">
          <span class="tag is-rounded">
            <a href={product.slug} class="has-text-info">
              {product.label}
            </a>
          </span>
        </span>
      ))}
    </>
  );
};

export default ResourceCardProducts;
