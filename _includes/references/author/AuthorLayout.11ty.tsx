// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { AuthorReference } from "./AuthorModels";
import { Collections, EleventyCollectionItem } from "../../models";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";

export type AuthorLayoutResource = {
  title: string;
  url: string;
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
    .filter((ci) => {
      // @ts-ignore
      return ci.data.author === author.label;
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
        url: ci.page.url,
        thumbnail: ci.data.thumbnail,
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
