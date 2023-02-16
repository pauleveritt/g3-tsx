// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import Thumbnail from "../../Image.11ty";
import { RenderContext, RenderProps } from "../../../src/models";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";
import { Resource } from "../../../src/ResourceModels";
import { AuthorFrontmatter } from "./AuthorModels";

export function AuthorLayout(
  this: RenderContext,
  { collections, content, page }: RenderProps
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

  const figure = (
    <div className="image is-rounded is-96x96">
      <Thumbnail
        src={author.thumbnail}
        className={"bio-resourcecard-logo"}
        alt={author.title}
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
  const contentDiv = <div dangerouslySetInnerHTML={{ __html: content }} />;

  return (
    <ReferenceLayout
      title={author.title}
      subtitle={author.subtitle}
      figure={[figure]}
      listing={[listing]}
      content={contentDiv}
    />
  );
}
