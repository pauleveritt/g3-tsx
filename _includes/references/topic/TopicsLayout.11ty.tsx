import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { Collections } from "../../models";

export type TopicsLayoutTopic = {
  title: string;
  url: string;
};
export type TopicsLayoutProps = {
  topics: TopicsLayoutTopic[];
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
}: TopicsRenderProps): JSX.Element {
  // Flatten/de-normalize the joins, e.g. topic
  const topics: TopicsLayoutTopic[] = Object.values(
    collections.topicReferences
  ).map((topic) => {
    return {
      title: topic.title,
      url: topic.url,
    };
  });
  return (
    <TopicsLayout
      topics={topics}
      title={title}
      subtitle={subtitle}
      content={content}
    />
  );
}
