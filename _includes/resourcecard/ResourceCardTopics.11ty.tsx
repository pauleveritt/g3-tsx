// noinspection ES6UnusedImports
import { h } from "nano-jsx";

export type ResourceCardTopic = {
  label: string;
  slug: string;
};

export type ResourceCardTopics = ResourceCardTopic[];
export type ResourceCardTopicProps = {
  items: ResourceCardTopics;
};
const ResourceCardTopics = ({ items }: ResourceCardTopicProps): JSX.Element => {
  return (
    <>
      {items.map((topic) => (
        <span class="bio-common-card-references">
          <span class="tag is-rounded">
            <a href={topic.slug} class="has-text-primary">
              {topic.label}
            </a>
          </span>
        </span>
      ))}
    </>
  );
};

export default ResourceCardTopics;
