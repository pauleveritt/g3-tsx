import h, { JSX } from "vhtml";
import { BaseLayout } from "./BaseLayout.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";

export type PageLayoutProps = {
  children: string[];
} & LayoutProps;

export function PageLayout(
  this: LayoutContext,
  { page, content, collections }: PageLayoutProps
): JSX.Element {
  const data = { title: "xxx" };
  return (
    <BaseLayout
      page={page}
      collections={collections}
      content={content}
      {...data}
    >
      <div className="bd-main bulmaio-body">
        <div className="bd-side-background" />
        <div className="bd-main-container container content">
          <h1>{data.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </BaseLayout>
  );
}

export const render = PageLayout;
