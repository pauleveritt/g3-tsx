import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { RenderContext } from "../../../src/models";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";

export type TutorialsRenderProps = {
  content: string;
  title: string;
  subtitle?: string;
};

export function render(
  this: RenderContext,
  { content, title, subtitle }: TutorialsRenderProps
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
      title={title}
      subtitle={subtitle}
      figure={figure}
      listing={[listing]}
      content={content}
    />
  );
}
