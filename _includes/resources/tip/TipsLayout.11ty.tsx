import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { RenderContext, RenderProps } from "../../../src/models";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";

export function TipsLayout(
  this: RenderContext,
  { content, title, subtitle }: RenderProps
): JSX.Element {
  const tips = this.getResources("tip");
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
      title={title as string}
      subtitle={subtitle}
      figure={figure}
      listing={[listing]}
      content={content}
    />
  );
}

export const render = TipsLayout;
