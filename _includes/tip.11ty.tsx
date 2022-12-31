// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import BaseLayout from "./BaseLayout.11ty";

export type TipLayoutProps = {
  content: string;
  title: string;
};

export function render({ title, content }: TipLayoutProps): JSX.Element {
  const rawContent = h("main", {
    dangerouslySetInnerHTML: { __html: content },
  });
  return <BaseLayout pageTitle={title}>{rawContent}</BaseLayout>;
}
