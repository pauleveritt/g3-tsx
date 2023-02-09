import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { SiteCollections } from "../../models";
import { TopicReference } from "./TopicModels";
import { RenderContext } from "../../../src/models";

export type TopicsLayoutProps = {
  topics: TopicReference[];
  title: string;
  subtitle?: string;
  content: string;
};

export function TopicsLayout({
  topics,
  title,
  subtitle,
  content,
}: TopicsLayoutProps): JSX.Element {
  const figure = undefined;
  const listing = (
    <ul>
      {topics.map((topic) => {
        return (
          <li>
            <a aria-label="resource" href={topic.url}>
              {topic.title}
            </a>
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

export type TopicsRenderProps = {
  collections: SiteCollections;
  content: string;
  title: string;
  subtitle?: string;
};

export function render(
  this: RenderContext,
  { content, title, subtitle }: TopicsRenderProps
): JSX.Element {
  const topics = this.getReferences("topic") as TopicReference[];
  return (
    <TopicsLayout
      topics={topics}
      title={title}
      subtitle={subtitle}
      content={content}
    />
  );
}
