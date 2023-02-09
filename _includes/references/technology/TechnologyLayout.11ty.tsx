// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { SiteCollections } from "../../models";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { RenderContext } from "../../../src/models";
import { Resource } from "../../../src/ResourceModels";
import { TechnologyReference } from "./TechnologyModels";

export type TechnologyLayoutProps = {
  children: string[];
  referenceResources: Resource[];
  subtitle?: string;
  thumbnail?: string;
  title: string;
};

export function TechnologyLayout({
  children,
  subtitle,
  thumbnail,
  title,
  referenceResources,
}: TechnologyLayoutProps): JSX.Element {
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
  ) as TechnologyReference;
  if (!technology) {
    throw new Error(`Technology "${page.fileSlug}" not in collection`);
  }

  const linkedResources = this.getResources().filter(
    (ci) => ci.technologies && ci.technologies.includes(technology.label)
  ) as Resource[];

  return (
    <TechnologyLayout
      title={technology.title}
      subtitle={technology.subtitle}
      referenceResources={linkedResources}
    >
      {content}
    </TechnologyLayout>
  );
}
