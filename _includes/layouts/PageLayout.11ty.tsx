import h, { JSX } from "vhtml";
import { BaseLayout } from "./BaseLayout.11ty";
import { RenderContext } from "../../src/models";

export type PageLayoutProps = {
  title: string;
  children: string[];
};

export function PageLayout({ title, children }: PageLayoutProps): JSX.Element {
  return (
    <BaseLayout pageTitle={title}>
      <div className="bd-main bulmaio-body">
        <div className="bd-side-background" />
        <div className="bd-main-container container content">
          <h1>Hello {title}</h1>
          <div dangerouslySetInnerHTML={{ __html: children[0] }} />
        </div>
      </div>
    </BaseLayout>
  );
}

export type PageRenderProps = {
  content: string;
  title: string;
};

export function render(
  this: RenderContext,
  { content, title }: PageRenderProps
): JSX.Element {
  return <PageLayout title={title}>{content}</PageLayout>;
}
