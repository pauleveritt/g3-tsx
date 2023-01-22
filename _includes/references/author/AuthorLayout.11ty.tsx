// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { AuthorReference } from "./AuthorModels";
import { Collections } from "../../models";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { BaseResource } from "../../resources/ResourceModels";

export type AuthorLayoutResource = {
  title: string;
  slug: string;
  thumbnail?: string;
};
export type AuthorLayoutProps = {
  children: string[];
  referenceResources: AuthorLayoutResource[];
  subtitle?: string;
  thumbnail?: string;
  title: string;
};

export function AuthorLayout({
  children,
  subtitle,
  thumbnail,
  title,
  referenceResources,
}: AuthorLayoutProps): JSX.Element {
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
          <a href={resource.slug}>{resource.title}</a>
        </li>
      ))}
    </ul>
  );
  const xxxChildren = <div dangerouslySetInnerHTML={{ __html: children[0] }} />;

  return (
    <ReferenceLayout
      title={title}
      subtitle={subtitle}
      figure={[figure]}
      listing={[listing]}
      content={xxxChildren}
    />
  );
}

export type AuthorRenderProps = {
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
}: AuthorRenderProps): JSX.Element {
  const { authorReferences } = collections;
  const author: AuthorReference = authorReferences[page.fileSlug];
  const { title, subtitle, thumbnail } = author;
  const referenceResources: AuthorLayoutResource[] = collections.all
    .filter((resource) => {
      // @ts-ignore
      return resource.author === author.label;
    })
    .sort((r1: BaseResource, r2: BaseResource) => {
      if (r1.title < r2.title) {
        return -1;
      }
      if (r1.title > r2.title) {
        return 1;
      }
      return 0;
    })
    .map((resource) => {
      return {
        title: resource.title,
        slug: resource.slug,
        thumbnail: resource.thumbnail,
      };
    });

  return (
    <AuthorLayout
      title={title}
      subtitle={subtitle}
      thumbnail={thumbnail}
      referenceResources={referenceResources}
    >
      {content}
    </AuthorLayout>
  );
}
/*

Tomorrow
- Move the resource listing sorting filtering into a separate function
- Write a test for that
- Fix "should render AuthorLayout" to grabe the listings
 */
