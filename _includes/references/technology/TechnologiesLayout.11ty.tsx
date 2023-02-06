import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { SiteCollections } from "../../models";
import { TechnologyReference } from "./TechnologyModels";
import { RenderContext } from "../../../src/models";

export type TechnologiesLayoutProps = {
  technologies: Iterable<TechnologyReference>;
  title: string;
  subtitle?: string;
  content: string;
};

export function TechnologiesLayout({
  technologies,
  title,
  subtitle,
  content,
}: TechnologiesLayoutProps): JSX.Element {
  const figure = undefined;
  const listing = (
    <ul>
      {Array.from(technologies).map((technology) => {
        return (
          <li>
            <a href={technology.url}>{technology.title}</a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <ReferenceLayout
      title={title}
      subtitle={subtitle}
      figure={figure}
      listing={[listing]}
      content={content}
    />
  );
}

export type TechnologiesRenderProps = {
  collections: SiteCollections;
  content: string;
  title: string;
  subtitle?: string;
};

export function render(
  this: RenderContext,
  { collections, content, title, subtitle }: TechnologiesRenderProps
): JSX.Element {
  return (
    <TechnologiesLayout
      technologies={collections.technologyReferences.values()}
      title={title}
      subtitle={subtitle}
      content={content}
    />
  );
}
