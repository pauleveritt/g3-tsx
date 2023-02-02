// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { Collections, EleventyCollectionItem } from "../../models";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { TechnologyReference } from "./TechnologyModels";

export type TechnologyLayoutResource = {
  title: string;
  url: string;
  thumbnail?: string;
};
export type TechnologyLayoutProps = {
  children: string[];
  referenceResources: TechnologyLayoutResource[];
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
  collections: Collections;
  content: string;
  page: {
    fileSlug: string;
  };
};

export function render({
  collections,
  content,
  page,
}: TechnologyRenderProps): JSX.Element {
  const { technologyReferences } = collections;
  const technology: TechnologyReference = technologyReferences[page.fileSlug];
  const { title, subtitle } = technology;
  const referenceResources: TechnologyLayoutResource[] = collections.all
    .filter((ci) => {
      // @ts-ignore
      return (
        ci.data.technologies && ci.data.technologies.includes(technology.label)
      );
    })
    .sort((ci1: EleventyCollectionItem, ci2: EleventyCollectionItem) => {
      if (ci1.data.title < ci2.data.title) {
        return -1;
      }
      if (ci1.data.title > ci2.data.title) {
        return 1;
      }
      return 0;
    })
    .map((ci) => {
      return {
        title: ci.data.title,
        url: ci.page.url,
        thumbnail: ci.data.thumbnail,
      };
    });

  return (
    <TechnologyLayout
      title={title}
      subtitle={subtitle}
      referenceResources={referenceResources}
    >
      {content}
    </TechnologyLayout>
  );
}
