import h, { JSX } from "vhtml";
import { Collections } from "../../models";

export type TipsLayoutTip = {
  title: string;
  slug: string;
  author: {
    title: string;
  };
};
export type TipsLayoutProps = {
  tips: TipsLayoutTip[];
  children: string[];
};

export function TipsLayout({ tips, children }: TipsLayoutProps): JSX.Element {
  return (
    <>
      <h1>Hello Tips</h1>
      <div id="subtitle" dangerouslySetInnerHTML={{ __html: children[0] }} />
      <ul>
        {tips?.map((tip) => {
          return <li aria-label="tip">{tip.title}</li>;
        })}
      </ul>
    </>
  );
}

export type TipsRenderProps = {
  collections: Collections;
  content: string;
};

export function render({ collections, content }: TipsRenderProps): JSX.Element {
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
  return <TipsLayout tips={tips}>{content}</TipsLayout>;
}
