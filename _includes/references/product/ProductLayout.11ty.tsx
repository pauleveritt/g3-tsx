// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { Collections, EleventyCollectionItem } from "../../models";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { ProductReference } from "./ProductModels";

export type ProductLayoutResource = {
  title: string;
  slug: string;
  thumbnail?: string;
};
export type ProductLayoutProps = {
  children: string[];
  referenceResources: ProductLayoutResource[];
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
          <a aria-label="resource" href={resource.slug}>
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
  collections: Collections;
  content: string;
  page: {
    fileSlug: string;
  };
};

export function render({
  collections,
  content,
  page,
}: ProductRenderProps): JSX.Element {
  const { productReferences } = collections;
  const product: ProductReference = productReferences[page.fileSlug];
  const { title, subtitle, thumbnail } = product;
  const referenceResources: ProductLayoutResource[] = collections.all
    .filter((ci) => {
      // @ts-ignore
      return product.label in ci.data.product;
    })
    .sort((ci1: EleventyCollectionItem, ci2: EleventyCollectionItem) => {
      if (ci1.data.title < ci2.data.title) {
        return -1;
      }
      if (ci1.data.title > ci2.data.title) {
        return 1;
      }
      return 0;
    })
    .map((ci) => {
      return {
        title: ci.data.title,
        slug: ci.page.fileSlug,
        thumbnail: ci.data.thumbnail,
      };
    });

  return (
    <ProductLayout
      title={title}
      subtitle={subtitle}
      thumbnail={thumbnail}
      referenceResources={referenceResources}
    >
      {content}
    </ProductLayout>
  );
}
