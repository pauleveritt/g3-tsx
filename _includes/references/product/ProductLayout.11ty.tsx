// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { RenderContext, RenderProps } from "../../../src/models";
import { ProductFrontmatter } from "./ProductModels";
import { Resource } from "../../../src/ResourceModels";

export function ProductLayout(
  this: RenderContext,
  { collections, content, page }: RenderProps
): JSX.Element {
  const product = collections.allReferences.get(
    page.fileSlug
  ) as ProductFrontmatter;
  if (!product) {
    throw new Error(`Product "${page.fileSlug}" not in collection`);
  }

  const linkedResources: Resource[] = this.getResources().filter(
    (ci) => ci.products && ci.products.includes(product.label as string)
  );

  const figure = (
    <div className="image is-rounded is-96x96">
      <img
        alt=""
        className="bio-resourcecard-logo"
        height="96"
        width="96"
        src={product.logo}
      />
    </div>
  );
  const listing = (
    <ul>
      {linkedResources.map((resource) => (
        <li>
          <a aria-label="Resource" href={resource.url}>
            {resource.title}
          </a>
        </li>
      ))}
    </ul>
  );
  const contentDiv = <div dangerouslySetInnerHTML={{ __html: content }} />;

  return (
    <ReferenceLayout
      title={product.title}
      subtitle={product.subtitle}
      figure={[figure]}
      listing={[listing]}
      content={contentDiv}
    />
  );
}

export const render = ProductLayout;
