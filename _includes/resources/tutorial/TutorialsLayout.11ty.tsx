import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { RenderContext, RenderProps } from "../../../src/models";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";

export function TutorialsLayout(
  this: RenderContext,
  { content, title, subtitle }: RenderProps
): JSX.Element {
  const tutorials = this.getResources("tutorial");
  const figure = undefined;
  const listing = (
    <>
      {tutorials.map((tutorial) => {
        return <ResourceCard resource={tutorial}></ResourceCard>;
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

export const render = TutorialsLayout;
