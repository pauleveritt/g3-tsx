// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import BottomNav from "../../pagenav/BottomNav.11ty";
import TopNav from "../../pagenav/TopNav.11ty";
import SeeAlso from "../../seealso/SeeAlso.11ty";
import { getTip } from "./TipModels";
import SidebarLayout from "../../SidebarLayout.11ty";
import { EleventyPage } from "../../models";
import { getAuthor } from "../../references/author/AuthorModels";
import SidebarPublished from "../../sidebar/SidebarPublished.11ty";
import Sidebar from "../../sidebar/Sidebar.11ty";

export function TipLayout(data: any): JSX.Element {
  const page: EleventyPage = data.page;
  const tip = getTip(data, page);

  // Convert the HTML string into a vdom thingy
  const rawLeadin = tip.leadin
    ? h("main", {
        dangerouslySetInnerHTML: { __html: tip.leadin },
      })
    : "";

  const rawContent = h("main", {
    dangerouslySetInnerHTML: { __html: data.content },
  });

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

  // Sidebars
  const thisAuthorData = data.collections.author[0];
  const thisAuthor = getAuthor(thisAuthorData.data, thisAuthorData.page);
  const thisThumbnail = thisAuthor.thumbnail ? thisAuthorData.thumbnail : "";
  const sidebarPublished = (
    <SidebarPublished
      date={data.date}
      author={{ ...thisAuthor, thumbnail: thisThumbnail }}
    ></SidebarPublished>
  );
  const sidebar = <Sidebar>{sidebarPublished}</Sidebar>;

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
        {tip.shortVideo && <div>Video Player Here</div>}
        <div
          className="column content"
          style="display: flex; justify-content: space-between; flex-direction: column"
        >
          <div dangerouslySetInnerHTML={{ __html: rawLeadin }} />
          <div>
            {tip.hasBody && (
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
                Full Video
              </a>
            )}
          </div>
        </div>
      </div>
      {tip.hasBody && (
        <>
          <header className="is-size-3 is-bold">In Depth</header>
          <div className="columns">
            <div className="column is-11-desktop content">{rawContent}</div>
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
