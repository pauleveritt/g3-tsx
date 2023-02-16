// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import SidebarLayout from "../../layouts/SidebarLayout.11ty";
import { SiteCollections } from "../../models";
import { Author } from "../../references/author/AuthorModels";
import SidebarPublished from "../../sidebar/SidebarPublished.11ty";
import Sidebar from "../../sidebar/Sidebar.11ty";
import { RenderContext, RenderProps } from "../../../src/models";
import { References } from "../../../src/ReferenceModels";
import { TutorialStep } from "./TutorialStepModels";
import VideoPlayer from "../../video/VideoPlayer.11ty";

export function render(
  this: RenderContext,
  { collections, page, content }: RenderProps
): JSX.Element {
  const tutorialstep = collections.allResources.get(page.url) as TutorialStep;
  // Sidebars
  const references = tutorialstep.references as References;
  const sidebarPublished = (
    <SidebarPublished
      date={tutorialstep.date as Date}
      author={references.author as Author}
    ></SidebarPublished>
  );
  const sidebar = <Sidebar>{sidebarPublished}</Sidebar>;

  const longVideo = tutorialstep.longVideo && (
    <a
      className="button is-light"
      href="#full-video"
      style="width: auto; margi-left: 0.5em"
    >
      <VideoPlayer
        source={tutorialstep.longVideo.url}
        poster={tutorialstep.longVideo.poster}
      />
    </a>
  );

  // Main
  const videoBottom = tutorialstep.videoBottom;
  const main = (
    <>
      {longVideo && !videoBottom && (
        <div style="margin-bottom: 2rem">{longVideo}</div>
      )}
      {content ? (
        <div className="columns">
          <div
            className="column is-11-desktop content"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      ) : null}
      {longVideo && videoBottom && (
        <div style="margin-bottom: 2rem">{longVideo}</div>
      )}
    </>
  );

  return (
    <SidebarLayout
      pageTitle={tutorialstep.title}
      subtitle={tutorialstep.subtitle}
      sidebar={[sidebar]}
    >
      <main>{main}</main>
    </SidebarLayout>
  );
}
