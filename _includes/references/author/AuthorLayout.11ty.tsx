// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { AuthorReference } from "./AuthorModels";
import { Collections } from "../../models";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { Resource } from "../../resources/ResourceModels";

export type AuthorLayoutProps = {
  children: string[];
  referenceResources: Resource[];
  subtitle?: string;
  thumbnail?: string;
  title: string;
};

export function AuthorLayout({
  children,
  subtitle,
  thumbnail,
  title,
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
    <div>
      This reference's resources would go here.
      {/*{resources && resources*/}
      {/*    .sort((r1: Resource, r2: Resource) => {*/}
      {/*      if (r1.title < r2.title) {*/}
      {/*        return -1;*/}
      {/*      }*/}
      {/*      if (r1.title > r2.title) {*/}
      {/*        return 1;*/}
      {/*      }*/}
      {/*      return 0;*/}
      {/*    })*/}
      {/*    .map(resource => (*/}
      {/*        <ResourceCard*/}
      {/*            key={resource.slug}*/}
      {/*            thumbnail={resource.thumbnail}*/}
      {/*            resourceType={resource.resourceType}*/}
      {/*            media={{href: resource.slug, title: resource.title, subtitle: resource.subtitle}}*/}
      {/*            technologies={{items: resource.technologies}}*/}
      {/*            topics={{items: resource.topics}}*/}
      {/*            date={{date: resource.date}}*/}
      {/*        />*/}
      {/*    ))*/}
      {/*}*/}
    </div>
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
  const referenceResources: Resource[] = [];

  /*
   * NEXT
   * - Get collection.all fixture to have actual resources
   * - Make a AuthorLayoutResource type
   * - Then have this flatten collections.all into array of that
   * */

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
