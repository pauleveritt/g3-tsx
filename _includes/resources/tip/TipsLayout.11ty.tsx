import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { Tip } from "./TipModels";
import { RenderContext, RenderProps } from "../../../src/models";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";

export type TipsLayoutProps = {
  tips: Tip[];
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

export function render(
  this: RenderContext,
  { content, data }: RenderProps
): JSX.Element {
  const tips = this.getResources("tip");
  return (
    <TipsLayout
      tips={tips}
      title={data.title}
      subtitle={data.subtitle}
      content={content}
    />
  );
}
