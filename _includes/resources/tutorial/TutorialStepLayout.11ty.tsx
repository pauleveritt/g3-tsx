// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import SidebarLayout from "../../layouts/SidebarLayout.11ty";
import { Author } from "../../references/author/AuthorModels";
import SidebarPublished from "../../sidebar/SidebarPublished.11ty";
import Sidebar from "../../sidebar/Sidebar.11ty";
import { RenderContext, RenderProps } from "../../../src/models";
import { References } from "../../../src/ReferenceModels";
import { TutorialStep } from "./TutorialStepModels";
import VideoPlayer from "../../video/VideoPlayer.11ty";
import { Tutorial } from "./TutorialModels";
import SidebarStep from "../../sidebar/SidebarStep.11ty";

export function TutorialStepLayout(
  this: RenderContext,
  { collections, page, content }: RenderProps
): JSX.Element {
  const tutorialStep = collections.allResources.get(page.url) as TutorialStep;
  const parent = tutorialStep.parentTutorial as Tutorial;

  // Sidebars
  const references = tutorialStep.references as References;

  const longVideo = tutorialStep.longVideo && (
    <a
      className="button is-light"
      href="#full-video"
      style="width: auto; margi-left: 0.5em"
    >
      <VideoPlayer
        source={tutorialStep.longVideo.url}
        poster={tutorialStep.longVideo.poster}
      />
    </a>
  );

  // #### Sidebar
  const sidebarPublished = (
    <SidebarPublished
      displayDate={tutorialStep.displayDate}
      author={references.author as Author}
    ></SidebarPublished>
  );
  const sidebarSteps = parent.tutorialSteps && (
    <div className="bio-page-sidebar-references-group" style="margin-top: 1rem">
      <p className="menu-label bio-page-sidebar-published">Tutorial Steps</p>
      <ul className="steps has-content-centered is-vertical is-small">
        {parent.tutorialSteps.map((step, index) => (
          <SidebarStep
            label={step.title}
            target={step.url}
            marker={index + 1}
            isActive={step == tutorialStep}
          />
        ))}
      </ul>
    </div>
  );
  const sidebar = (
    <Sidebar>
      {sidebarPublished}
      {sidebarSteps}
    </Sidebar>
  );

  // Main
  const videoBottom = tutorialStep.videoBottom;
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
      pageTitle={tutorialStep.title}
      subtitle={tutorialStep.subtitle}
      sidebar={[sidebar]}
    >
      <main>{main}</main>
    </SidebarLayout>
  );
}

export const render = TutorialStepLayout;
