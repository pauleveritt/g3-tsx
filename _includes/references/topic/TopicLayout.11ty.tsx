// noinspection ES6UnusedImports
import { h } from "nano-jsx";
import { Collections, EleventyCollectionItem } from "../../models";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { TopicReference } from "./TopicModels";

export type TopicLayoutResource = {
  title: string;
  url: string;
  thumbnail?: string;
};
export type TopicLayoutProps = {
  children: string[];
  referenceResources: TopicLayoutResource[];
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
    <div class="image is-rounded is-96x96">
      <img
        alt=""
        class="bio-resourcecard-logo"
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
}: TopicRenderProps): JSX.Element {
  const { topicReferences } = collections;
  const topic: TopicReference = topicReferences[page.fileSlug];
  const { title, subtitle, thumbnail } = topic;
  const referenceResources: TopicLayoutResource[] = collections.all
    .filter((ci) => {
      // @ts-ignore
      return ci.data.technologies && ci.data.technologies.includes(topic.label);
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
    <TopicLayout
      title={title}
      subtitle={subtitle}
      thumbnail={thumbnail}
      referenceResources={referenceResources}
    >
      {content}
    </TopicLayout>
  );
}
