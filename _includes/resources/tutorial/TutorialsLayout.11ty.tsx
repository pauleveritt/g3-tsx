import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { RenderContext, RenderProps } from "../../../src/models";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";

export function render(
  this: RenderContext,
  { content, data }: RenderProps
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
      title={data.title}
      subtitle={data.subtitle}
      figure={figure}
      listing={[listing]}
      content={content}
    />
  );
}
