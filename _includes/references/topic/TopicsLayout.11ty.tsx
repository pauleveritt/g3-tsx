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
  const listing: string[] = topics.map((topic) => (
    <a className="bd-link" href={topic.url}>
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
