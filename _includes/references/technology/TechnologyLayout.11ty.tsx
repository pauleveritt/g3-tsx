// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { RenderContext, RenderProps } from "../../../src/models";
import { Resource } from "../../../src/ResourceModels";
import { TechnologyFrontmatter } from "./TechnologyModels";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";

export function TechnologyLayout(
  this: RenderContext,
  { collections, content, page }: RenderProps
): JSX.Element {
  const technology = collections.allReferences.get(
    page.fileSlug
  ) as TechnologyFrontmatter;
  if (!technology) {
    throw new Error(`Technology "${page.fileSlug}" not in collection`);
  }

  const linkedResources = this.getResources().filter(
    (ci) =>
      ci.technologies && ci.technologies.includes(technology.label as string)
  ) as Resource[];

  const figure = (
    <div className="image is-rounded is-96x96">
      <img className="bio-resourcecard-logo" src={technology.logo} alt="Logo" />
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
      title={technology.title}
      subtitle={technology.subtitle}
      figure={[figure]}
      listing={[listing]}
      content={contentDiv}
    />
  );
}

export const render = TechnologyLayout;
