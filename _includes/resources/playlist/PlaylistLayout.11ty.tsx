// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { Playlist } from "./PlaylistModels";
import { SidebarLayout } from "../../layouts/SidebarLayout.11ty";
import { LayoutContext, LayoutProps } from "../../../src/models";

export function PlaylistLayout(
  this: LayoutContext,
  data: LayoutProps
): JSX.Element {
  const { collections, content, page } = data;
  const tip = collections.allResources.get(page.url) as Playlist;
  if (!tip) {
    throw new Error(`Tip "${page.url}" not in collection`);
  }

  // Main content
  const main = (
    <div
      style="margin-bottom: 3rem"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );

  return (
    <SidebarLayout pageTitle={tip.title} subtitle={tip.subtitle} {...data}>
      <main>{main}</main>
    </SidebarLayout>
  );
}

export const render = PlaylistLayout;
