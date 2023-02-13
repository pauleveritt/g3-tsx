// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { SiteCollections } from "../../models";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { RenderContext } from "../../../src/models";
import { Resource } from "../../../src/ResourceModels";
import { TechnologyFrontmatter } from "./TechnologyModels";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";

export type TechnologyLayoutProps = {
  children: string[];
  linkedResources: Resource[];
  subtitle?: string;
  logo?: string;
  title: string;
};

export function TechnologyLayout({
  children,
  subtitle,
  logo,
  title,
  linkedResources,
}: TechnologyLayoutProps): JSX.Element {
  const figure = (
    <div className="image is-rounded is-96x96">
      <img className="bio-resourcecard-logo" src={logo} alt="Logo" />
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

export type TechnologyRenderProps = {
  collections: SiteCollections;
  content: string;
  page: {
    fileSlug: string;
  };
};

export function render(
  this: RenderContext,
  { collections, content, page }: TechnologyRenderProps
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

  return (
    <TechnologyLayout
      title={technology.title}
      subtitle={technology.subtitle}
      logo={technology.logo}
      linkedResources={linkedResources}
    >
      {content}
    </TechnologyLayout>
  );
}
