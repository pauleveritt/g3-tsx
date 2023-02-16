import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { Technology } from "./TechnologyModels";
import { RenderContext, RenderProps } from "../../../src/models";

export function TechnologiesLayout(
  this: RenderContext,
  { content, title, subtitle }: RenderProps
): JSX.Element {
  const technologies = this.getReferences("technology") as Technology[];

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
      title={title as string}
      subtitle={subtitle}
      figure={figure}
      listing={[listing.join("")]}
      content={content}
    />
  );
}

export const render = TechnologiesLayout;
