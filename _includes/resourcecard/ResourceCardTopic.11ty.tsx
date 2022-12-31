// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

type ResourceCardTopic = {
  label: string;
  slug: string;
};

export type ResourceCardTopics = ResourceCardTopic[];
export type ResourceCardTopicProps = {
  items: ResourceCardTopics;
};
const ResourceCardTopic = ({ items }: ResourceCardTopicProps): JSX.Element => {
  return (
    <>
      {items.map((topic) => (
        <span className="bio-common-card-references">
          <span className="tag is-rounded">
            <a href={topic.slug} className="has-text-primary">
              {topic.label}
            </a>
          </span>
        </span>
      ))}
    </>
  );
};

export default ResourceCardTopic;
