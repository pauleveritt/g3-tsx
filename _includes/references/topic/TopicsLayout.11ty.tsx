import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { Topic } from "./TopicModels";
import { RenderContext, RenderProps } from "../../../src/models";

export type TopicsLayoutProps = {
  topics: Topic[];
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
  const listing: string[] = topics.map((topic) => (
    <a aria-label={`Topic`} className="bd-link" href={topic.url}>
      <h2 className="bd-link-name">
        <figure className="bd-link-figure">
          <span
            data-testid={`sto-accent`}
            className={`bd-link-icon has-text-${topic.accent}`}
          >
            <i data-testid={`sto-icon`} className={topic.icon} />
          </span>
        </figure>
        {topic.title}
      </h2>
      {topic.subtitle && <p className="bd-link-subtitle">{topic.subtitle}</p>}
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
  const topics = this.getReferences("topic") as Topic[];
  return (
    <TopicsLayout
      topics={topics}
      title={data.title}
      subtitle={data.subtitle}
      content={content}
    />
  );
}
