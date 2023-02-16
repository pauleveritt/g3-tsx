import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { Technology } from "./TechnologyModels";
import { RenderContext, RenderProps } from "../../../src/models";

export type TechnologiesLayoutProps = {
  technologies: Technology[];
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
  const listing: string[] = technologies.map((technology) => (
    <a aria-label={`Technology`} className="bd-link" href={technology.url}>
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

export function render(
  this: RenderContext,
  { content, data }: RenderProps
): JSX.Element {
  const technologies = this.getReferences("technology") as Technology[];

  return (
    <TechnologiesLayout
      technologies={technologies}
      title={data.title}
      subtitle={data.subtitle}
      content={content}
    />
  );
}
