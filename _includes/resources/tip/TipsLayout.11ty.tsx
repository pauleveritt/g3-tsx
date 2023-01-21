import h, { JSX } from "vhtml";
import { Collections } from "../../models";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";

export type TipsLayoutTip = {
  title: string;
  slug: string;
  author: {
    title: string;
  };
};
export type TipsLayoutProps = {
  tips: TipsLayoutTip[];
  title: string;
  subtitle?: string;
  content: string;
};

export function TipsLayout({
  tips,
  title,
  subtitle,
  content,
}: TipsLayoutProps): JSX.Element {
  const figure = undefined;
  const listing = (
    <ul>
      {tips?.map((tip) => {
        return (
          <li>
            <a href={tip.slug}>{tip.title}</a>
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

export type TipsRenderProps = {
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
}: TipsRenderProps): JSX.Element {
  // Flatten/de-normalize the joins, e.g. author
  const tips: TipsLayoutTip[] = Object.values(collections.tipResources).map(
    (tip) => {
      const authorResource = collections.authorReferences[tip.author];
      const author = { title: authorResource.title };
      return {
        title: tip.title,
        slug: tip.slug,
        author,
      };
    }
  );
  return (
    <TipsLayout
      tips={tips}
      title={title}
      subtitle={subtitle}
      content={content}
    />
  );
}
