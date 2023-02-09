// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { SiteCollections } from "../../models";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { RenderContext } from "../../../src/models";
import { Resource } from "../../../src/ResourceModels";
import { TopicReference } from "./TopicModels";

export type TopicLayoutProps = {
  children: string[];
  referenceResources: Resource[];
  subtitle?: string;
  thumbnail?: string;
  title: string;
};

export function TopicLayout({
  children,
  subtitle,
  thumbnail,
  title,
  referenceResources,
}: TopicLayoutProps): JSX.Element {
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

export type TopicRenderProps = {
  collections: SiteCollections;
  content: string;
  page: {
    fileSlug: string;
  };
};

export function render(
  this: RenderContext,
  { collections, content, page }: TopicRenderProps
): JSX.Element {
  const topic = collections.allReferences.get(page.fileSlug) as TopicReference;
  if (!topic) {
    throw new Error(`Topic "${page.fileSlug}" not in collection`);
  }

  const linkedResources = this.getResources().filter(
    (ci) => ci.topics && ci.topics.includes(topic.label)
  ) as Resource[];

  return (
    <TopicLayout
      title={topic.title}
      subtitle={topic.subtitle}
      referenceResources={linkedResources}
    >
      {content}
    </TopicLayout>
  );
}
