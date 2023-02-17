// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import BottomNav from "../../pagenav/BottomNav.11ty";
import TopNav from "../../pagenav/TopNav.11ty";
import SeeAlso from "../../seealso/SeeAlso.11ty";
import { Playlist } from "./PlaylistModels";
import SidebarLayout from "../../layouts/SidebarLayout.11ty";
import { Author } from "../../references/author/AuthorModels";
import MarkdownIt from "markdown-it";
import VideoPlayer from "../../video/VideoPlayer.11ty";
import { RenderContext, RenderProps } from "../../../src/models";
import TipSidebar from "../../sidebar/TipSidebar.11ty";
import { Product } from "../../references/product/ProductModels";
import { Technology } from "../../references/technology/TechnologyModels";
import { Topic } from "../../references/topic/TopicModels";

export function TipLayout(
  this: RenderContext,
  { collections, content, page }: RenderProps
): JSX.Element {
  const tip = collections.allResources.get(page.url) as Playlist;
  if (!tip) {
    throw new Error(`Tip "${page.url}" not in collection`);
  }
  // Unpack references and make it not undefined
  if (!tip.references) {
    throw new Error(`Tip ${tip.url} has no references.`);
  }
  const author = tip.references.author as Author;
  if (!author) {
    throw new Error(`Author "${tip.author}" not in collection`);
  }
  const technologies = tip.references.technologies
    ? (tip.references.technologies as Technology[])
    : [];
  const topics = tip.references.topics
    ? (tip.references.topics as Topic[])
    : [];

  // If there is a tip.leadin, markdown convert it
  let leadin;
  if (tip.leadin) {
    const md = new MarkdownIt("commonmark");
    leadin = md.render(tip.leadin as string);
  }
  // Top/Bottom Nav
  const topNav = TopNav({
    parent: { label: "Parent Label", slug: "parent-slug" },
    siblings: [
      { label: "Sibling 1", slug: "sibling-1" },
      { label: "Sibling 2", slug: "sibling-2" },
      { label: "xSibling 3", slug: "sibling-3" },
    ],
    currentSlug: "sibling-2",
  });
  const bottomNav = BottomNav({
    previous: { label: "Previous Tip", slug: "/previous" },
    next: { label: "Next Tip", slug: "/next" },
  });

  const sidebar = (
    <TipSidebar
      displayDate={tip.displayDate}
      author={author}
      products={tip.references.products as Product[]}
      technologies={technologies}
      topics={topics}
      hasBody={tip.hasBody}
      seealsos={tip.seealso}
      longVideo={tip.longVideo}
    />
  );

  // Main content
  const main = (
    <div style="margin-bottom: 3rem">
      <div className="columns">
        {tip.animatedGif && (
          <img
            src={tip.animatedGif.file}
            alt="Tip Screenshot"
            width="600"
            style="object-fit: contain; object-position: top"
          />
        )}
        {tip.screenshot && (
          <img
            src={tip.screenshot}
            alt="Tip Screenshot"
            width="600"
            style="object-fit: contain; object-position: top"
          />
        )}
        {tip.shortVideo && (
          <div>
            <VideoPlayer
              source={tip.shortVideo.url}
              poster={tip.shortVideo.poster}
            />
          </div>
        )}
        <div
          className="column content"
          style="display: flex; justify-content: space-between; flex-direction: column"
        >
          {leadin && <div dangerouslySetInnerHTML={{ __html: leadin }} />}
          <div>
            {content && (
              <a
                className="button is-light"
                href="#in-depth"
                style="width: auto"
              >
                Learn More
              </a>
            )}
            {tip.longVideo && (
              <a
                className="button is-light"
                href="#full-video"
                style="width: auto; margi-left: 0.5em"
              >
                <VideoPlayer
                  source={tip.longVideo.url}
                  poster={tip.longVideo.poster}
                />
              </a>
            )}
          </div>
        </div>
      </div>
      {content && (
        <>
          <header id="in-depth" className="is-size-3 is-bold">
            In Depth
          </header>
          <div className="columns">
            <div
              className="column is-11-desktop content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </>
      )}
      {tip.seealso && (
        <>
          <SeeAlso items={tip.seealso} />
        </>
      )}
    </div>
  );

  return (
    <SidebarLayout
      pageTitle={tip.title}
      subtitle={tip.subtitle}
      topNav={[topNav]}
      bottomNav={[bottomNav]}
      sidebar={[sidebar]}
    >
      <main>{main}</main>
    </SidebarLayout>
  );
}

export const render = TipLayout;
