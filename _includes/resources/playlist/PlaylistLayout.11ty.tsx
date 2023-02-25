// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { Playlist, PlaylistFrontmatter } from "./PlaylistModels";
import { SidebarLayout } from "../../layouts/SidebarLayout.11ty";
import { LayoutContext, LayoutProps } from "../../../src/models";
import Sidebar from "../../sidebar/Sidebar.11ty";
import VideoPlayer from "../../video/VideoPlayer.11ty";
import { SidebarPublishedProps } from "../../sidebar/SidebarPublished.11ty";

export type PlaylistLayoutData = LayoutProps & PlaylistFrontmatter;

export function PlaylistLayout(
  this: LayoutContext,
  data: PlaylistLayoutData
): JSX.Element {
  const { collections, content, page } = data;
  const playlist = collections.allResources.get(page.url) as Playlist;
  if (!playlist) {
    throw new Error(`Playlist "${page.url}" not in collection`);
  }

  const { all } = data.collections;

  // Main content
  // TODO playlist needs to resolve its author
  // const published: SidebarPublishedProps = {
  //     playlist.,
  //     displayDate,
  // };

  const main = (
    <>
      <div
        className="content"
        style="margin-bottom: 3rem"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      {playlist.playlistResources.map((item: any, index: number) => {
        const thisItem = all.find((allItem) => allItem.page.url === item.url);
        const itemContent = thisItem ? thisItem.content : "";
        const isVisible = index == 0 ? "" : "display:none";
        return (
          <div id={item.anchor} style={isVisible} class="playlist-item">
            <h2 className="is-size-2">{item.title}</h2>
            {item.subtitle && <p className="subtitle is-4">{item.subtitle}</p>}
            {item.animatedGif && (
              <img
                src={item.animatedGif.file}
                alt="Tip Screenshot"
                width="600"
                style="object-fit: contain; object-position: top"
              />
            )}
            {item.screenshot && (
              <img
                src={item.screenshot}
                alt="Tip Screenshot"
                width="600"
                style="object-fit: contain; object-position: top"
              />
            )}
            {item.shortVideo && (
              <VideoPlayer
                source={item.shortVideo.url}
                poster={item.shortVideo?.poster}
              ></VideoPlayer>
            )}
            {itemContent && (
              <div
                class="content"
                style="margin-top: 3rem"
                dangerouslySetInnerHTML={{ __html: itemContent }}
              ></div>
            )}
          </div>
        );
      })}
    </>
  );

  const sidebar = (
    <Sidebar>
      <p className="menu-label">Playlist items</p>
      <ul className="steps has-content-centered is-vertical is-small">
        {playlist.playlistResources.map((item, index) => (
          <li className="steps-segment" style="flex-grow: 0">
            <a
              aria-label="Playlist Item"
              className="has-text-dark playlist-item-toggle"
              style="width: auto"
              href={`#${item.anchor}`}
            >
              <span className="steps-marker is-primary">{index + 1}</span>
              <div className="steps-content">
                <p> {item.title}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Sidebar>
  );

  return (
    <SidebarLayout
      pageTitle={playlist.title}
      subtitle={playlist.subtitle}
      sidebar={[sidebar]}
      {...data}
    >
      <main>{main}</main>
    </SidebarLayout>
  );
}

export const render = PlaylistLayout;
