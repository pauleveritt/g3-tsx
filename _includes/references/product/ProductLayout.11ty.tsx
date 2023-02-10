// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { SiteCollections } from "../../models";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { RenderContext } from "../../../src/models";
import { ProductReference } from "./ProductModels";
import { Resource } from "../../../src/ResourceModels";

export type ProductLayoutProps = {
  children: string[];
  referenceResources: Resource[];
  subtitle?: string;
  thumbnail?: string;
  title: string;
};

export function ProductLayout({
  children,
  subtitle,
  thumbnail,
  title,
  referenceResources,
}: ProductLayoutProps): JSX.Element {
  const figure = (
    <div className="image is-rounded is-96x96">
      <img
        alt=""
        className="bio-resourcecard-logo"
        height="96"
        width="96"
        src={thumbnail}
      />
    </div>
  );
  const listing = (
    <ul>
      {referenceResources.map((resource) => (
        <li>
          <a aria-label="Resource" href={resource.url}>
            {resource.title}
          </a>
        </li>
      ))}
    </ul>
  );
  const content = <div dangerouslySetInnerHTML={{ __html: children[0] }} />;

  return (
    <ReferenceLayout
      title={title}
      subtitle={subtitle}
      figure={[figure]}
      listing={[listing]}
      content={content}
    />
  );
}

export type ProductRenderProps = {
  collections: SiteCollections;
  content: string;
  page: {
    fileSlug: string;
  };
};

export function render(
  this: RenderContext,
  { collections, content, page }: ProductRenderProps
): JSX.Element {
  const product = collections.allReferences.get(
    page.fileSlug
  ) as ProductReference;
  if (!product) {
    throw new Error(`Product "${page.fileSlug}" not in collection`);
  }

  const referenceResources: Resource[] = this.getResources().filter(
    (ci) => ci.products && ci.products.includes(product.label)
  );

  return (
    <ProductLayout
      title={product.title}
      subtitle={product.subtitle}
      referenceResources={referenceResources}
    >
      {content}
    </ProductLayout>
  );
}
