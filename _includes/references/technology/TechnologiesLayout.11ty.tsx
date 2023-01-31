import { h } from "nano-jsx";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { Collections } from "../../models";

export type TechnologiesLayoutTechnology = {
  title: string;
  slug: string;
};
export type TechnologiesLayoutProps = {
  technologies: TechnologiesLayoutTechnology[];
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
  collections: Collections;
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
  const technologies: TechnologiesLayoutTechnology[] = Object.values(
    collections.technologyReferences
  ).map((technology) => {
    return {
      title: technology.title,
      slug: technology.slug,
    };
  });
  return (
    <TechnologiesLayout
      technologies={technologies}
      title={title}
      subtitle={subtitle}
      content={content}
    />
  );
}
