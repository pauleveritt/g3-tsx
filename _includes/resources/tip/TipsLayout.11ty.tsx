import h, { JSX } from "vhtml";
import { SiteCollections } from "../../models";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { TipResource } from "./TipModels";
import { RenderContext } from "../../../src/models";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";

export type TipsLayoutProps = {
  tips: Iterable<TipResource>;
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
    <ul>
      {Array.from(tips).map((tip) => {
        return <ResourceCard resource={tip}></ResourceCard>;
      })}
    </ul>
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
  collections: SiteCollections;
  content: string;
  title: string;
  subtitle?: string;
};

export function render(
  this: RenderContext,
  { collections, content, title, subtitle }: TipsRenderProps
): JSX.Element {
  return (
    <TipsLayout
      tips={collections.tipResources.values()}
      title={title}
      subtitle={subtitle}
      content={content}
    />
  );
}
