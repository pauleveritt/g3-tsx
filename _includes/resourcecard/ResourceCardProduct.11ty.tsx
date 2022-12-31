// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

type ResourceCardProduct = {
  label: string;
  slug: string;
};

export type ResourceCardProducts = ResourceCardProduct[];
export type ResourceCardProductProps = {
  items: ResourceCardProducts;
};
const ResourceCardProduct = ({
  items,
}: ResourceCardProductProps): JSX.Element => {
  return (
    <>
      {items.map((product) => (
        <span className="bio-common-card-references">
          <span className="tag is-rounded">
            <a href={product.slug} className="has-text-info">
              {product.label}
            </a>
          </span>
        </span>
      ))}
    </>
  );
};

export default ResourceCardProduct;
