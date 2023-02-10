// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { SiteCollections } from "../../models";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { RenderContext } from "../../../src/models";
import { Resource } from "../../../src/ResourceModels";
import { Topic } from "./TopicModels";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";

export type TopicLayoutProps = {
  children: string[];
  linkedResources: Resource[];
  topic: Topic;
};

export function TopicLayout({
  children,
  topic,
  linkedResources,
}: TopicLayoutProps): JSX.Element {
  const figure = (
    <figure className="media-left">
      <span className={`icon is-large has-text-${topic.accent}`}>
        <i className={`${topic.icon} fa-3x`} />
      </span>
    </figure>
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
      title={topic.title}
      subtitle={topic.subtitle}
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
  const topic = collections.allReferences.get(page.fileSlug) as Topic;
  if (!topic) {
    throw new Error(`Topic "${page.fileSlug}" not in collection`);
  }

  const linkedResources = this.getResources().filter(
    (ci) => ci.topics && ci.topics.includes(topic.label)
  ) as Resource[];

  return (
    <TopicLayout topic={topic} linkedResources={linkedResources}>
      {content}
    </TopicLayout>
  );
}
