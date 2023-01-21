// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import BottomNav from "../../pagenav/BottomNav.11ty";
import TopNav from "../../pagenav/TopNav.11ty";
import SeeAlso from "../../seealso/SeeAlso.11ty";
import { TipResource } from "./TipModels";
import SidebarLayout from "../../SidebarLayout.11ty";
import { Collections } from "../../models";
import { AuthorReference } from "../../references/author/AuthorModels";
import SidebarPublished from "../../sidebar/SidebarPublished.11ty";
import Sidebar from "../../sidebar/Sidebar.11ty";
import MarkdownIt from "markdown-it";

export type TipLayoutProps = {
  author: AuthorReference;
  children: string[];
  tip: TipResource;
  leadin?: string;
};

export function TipLayout({
  author,
  children,
  leadin,
  tip,
}: TipLayoutProps): JSX.Element {
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
  const sidebarPublished = (
    <SidebarPublished
      date={tip.date as Date}
      author={{ ...author }}
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
          {leadin && <div dangerouslySetInnerHTML={{ __html: leadin }} />}
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
            <div
              className="column is-11-desktop content"
              dangerouslySetInnerHTML={{ __html: children[0] }}
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

export type TipRenderProps = {
  collections: Collections;
  content: string;
  page: {
    fileSlug: string;
  };
};

export function render({
  collections,
  content,
  page,
}: TipRenderProps): JSX.Element {
  const { tipResources, authorReferences } = collections;
  const tip: TipResource = tipResources[page.fileSlug];
  const thisAuthor = tip.author as string;
  const author: AuthorReference = authorReferences[thisAuthor];

  // If there is a tip.leadin, markdown convert it
  const md = new MarkdownIt("commonmark");
  const leadin = md.render(tip.leadin as string);
  return (
    <TipLayout author={author} tip={tip} leadin={leadin}>
      {content}
    </TipLayout>
  );
}
