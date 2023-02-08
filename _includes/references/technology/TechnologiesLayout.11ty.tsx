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
  const listing: string[] =
    technologies &&
    Array.from(technologies).map((technology) => (
      <a className="bd-link" href={technology.url}>
        <h2 className="bd-link-name">
          <figure className="bd-link-figure">
            <div className="image is-64x64">
              <img
                src={technology.logo}
                alt={technology.title}
                className="bio-resourcecard-logo"
              />
            </div>
          </figure>
          {technology.title}
        </h2>
        {technology.subtitle && (
          <p className="bd-link-subtitle">{technology.subtitle}</p>
        )}
      </a>
    ));

  return (
    <ReferenceLayout
      title={title}
      subtitle={subtitle}
      figure={figure}
      listing={[listing.join("")]}
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
