// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { RenderContext, RenderProps } from "../../../src/models";
import { Resource } from "../../../src/ResourceModels";
import { TopicFrontmatter } from "./TopicModels";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";

export type TopicLayoutProps = {
  children: string[];
  linkedResources: Resource[];
  topic: TopicFrontmatter;
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

export function render(
  this: RenderContext,
  { collections, content, page }: RenderProps
): JSX.Element {
  const topic = collections.allReferences.get(
    page.fileSlug
  ) as TopicFrontmatter;
  if (!topic) {
    throw new Error(`Topic "${page.fileSlug}" not in collection`);
  }

  const linkedResources = this.getResources().filter(
    (ci) => ci.topics && ci.topics.includes(topic.label as string)
  ) as Resource[];

  return (
    <TopicLayout topic={topic} linkedResources={linkedResources}>
      {content}
    </TopicLayout>
  );
}
