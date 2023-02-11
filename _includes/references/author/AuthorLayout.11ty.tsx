// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { SiteCollections } from "../../models";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import Thumbnail from "../../Image.11ty";
import { RenderContext } from "../../../src/models";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";
import { Resource } from "../../../src/ResourceModels";
import { AuthorFrontmatter } from "./AuthorModels";

export type AuthorLayoutProps = {
  children: string[];
  linkedResources: Resource[];
  subtitle?: string;
  thumbnail: string;
  title: string;
};

export function AuthorLayout({
  children,
  subtitle,
  thumbnail,
  title,
  linkedResources,
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
    <>
      {linkedResources.map((resource) => (
        <ResourceCard resource={resource}></ResourceCard>
      ))}
    </>
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

  const author = collections.allReferences.get(
    page.fileSlug
  ) as AuthorFrontmatter;
  if (!author) {
    throw new Error(`Author "${page.fileSlug}" not in collection`);
  }

  const linkedResources: Resource[] = this.getResources().filter(
    (ci) => ci.author === author.label
  );

  return (
    <AuthorLayout
      title={author.title}
      subtitle={author.subtitle}
      thumbnail={author.thumbnail}
      linkedResources={linkedResources}
    >
      {content}
    </AuthorLayout>
  );
}
