// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { AuthorReference } from "./AuthorModels";
import { SiteCollections } from "../../models";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import Thumbnail from "../../Image.11ty";
import { RenderContext } from "../../../src/models";

export type AuthorLayoutResource = {
  title: string;
  url: string;
  thumbnail?: string;
};
export type AuthorLayoutProps = {
  children: string[];
  referenceResources: AuthorLayoutResource[];
  subtitle?: string;
  thumbnail: string;
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
      <Thumbnail
        src={thumbnail}
        className={"bio-resourcecard-logo"}
        alt={title}
      />
    </div>
  );
  const listing = (
    <ul>
      {referenceResources.map((resource) => (
        <li>
          <a aria-label="resource" href={resource.url}>
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

export type AuthorRenderProps = {
  collections: SiteCollections;
  content: string;
  page: {
    fileSlug: string;
    url: string;
  };
};

export function render(
  this: RenderContext,
  { collections, content, page }: AuthorRenderProps
): JSX.Element {
  // TODO Get a better test here
  // this.addTestCase(page.url, [byRole({ role: "link", text: "Paul Everitt" })]);

  const { authorReferences } = collections;
  const author: AuthorReference = authorReferences[page.fileSlug];
  const { title, subtitle, thumbnail } = author;
  const referenceResources: AuthorLayoutResource[] = Object.values(
    collections.authorReferences
  )
    .filter((ci) => {
      return ci.label === author.label;
    })
    .sort((ci1, ci2) => {
      if (ci1.title < ci2.title) {
        return -1;
      }
      if (ci1.title > ci2.title) {
        return 1;
      }
      return 0;
    })
    .map((ci) => {
      return {
        title: ci.title,
        url: ci.url,
        thumbnail: ci.thumbnail as string,
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
