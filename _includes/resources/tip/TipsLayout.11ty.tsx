import h, { JSX } from "vhtml";
import { TipResource } from "./TipModels";
import { AuthorReference } from "../../references/author/AuthorModels";

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
      <div id="subtitle">{children}</div>
      <ul>
        {tips?.map((tip) => {
          return <li aria-label="tip">{tip.title}</li>;
        })}
      </ul>
    </>
  );
}

export function render({ collections, content }: any): JSX.Element {
  const tipResources: TipResource[] = Object.values(collections.tipResources);
  const authorReferences: { [name: string]: AuthorReference } =
    collections.authorReferences;
  const tips: TipsLayoutTip[] = tipResources.map((tip) => {
    const authorResource = authorReferences[tip.author];
    const author = { title: authorResource.title };
    return {
      title: tip.title,
      slug: tip.slug,
      author,
    };
  });
  const rawContent = h("main", {
    dangerouslySetInnerHTML: { __html: content },
  });
  return <TipsLayout tips={tips}>{rawContent}</TipsLayout>;
}
