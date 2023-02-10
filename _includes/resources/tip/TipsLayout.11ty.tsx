import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { TipResource } from "./TipModels";
import { RenderContext } from "../../../src/models";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";

export type TipsLayoutProps = {
  tips: TipResource[];
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
    <>
      {tips.map((tip) => {
        return <ResourceCard resource={tip}></ResourceCard>;
      })}
    </>
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
  content: string;
  title: string;
  subtitle?: string;
};

export function render(
  this: RenderContext,
  { content, title, subtitle }: TipsRenderProps
): JSX.Element {
  const tips = this.getResources("tip");
  return (
    <TipsLayout
      tips={tips}
      title={title}
      subtitle={subtitle}
      content={content}
    />
  );
}
