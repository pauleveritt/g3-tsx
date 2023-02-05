import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { SiteCollections } from "../../models";
import { TechnologyReference } from "./TechnologyModels";

export type TechnologiesLayoutProps = {
  technologies: TechnologyReference[];
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
      {technologies.map((technology) => {
        return (
          <li>
            <a href={technology.slug}>{technology.title}</a>
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

export function render({
  collections,
  content,
  title,
  subtitle,
}: TechnologiesRenderProps): JSX.Element {
  // Flatten/de-normalize the joins, e.g. technology
  const technologies: TechnologyReference[] = Object.values(
    collections.technologyReferences
  );
  return (
    <TechnologiesLayout
      technologies={technologies}
      title={title}
      subtitle={subtitle}
      content={content}
    />
  );
}
