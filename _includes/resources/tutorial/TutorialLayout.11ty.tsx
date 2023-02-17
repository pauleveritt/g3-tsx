// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { Tutorial } from "./TutorialModels";
import SidebarLayout from "../../layouts/SidebarLayout.11ty";
import { Author } from "../../references/author/AuthorModels";
import SidebarPublished from "../../sidebar/SidebarPublished.11ty";
import Sidebar from "../../sidebar/Sidebar.11ty";
import { RenderContext, RenderProps } from "../../../src/models";
import { References } from "../../../src/ReferenceModels";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";
import { byRole } from "../../../src/TestCases";

export function TutorialLayout(
  this: RenderContext,
  { collections, page, content }: RenderProps
): JSX.Element {
  const tutorial = collections.allResources.get(page.url) as Tutorial;
  this.addTestCase(page.url, [byRole({ role: "link", text: "Paul Everitt" })]);

  // Sidebars
  const references = tutorial.references as References;
  const sidebarPublished = (
    <SidebarPublished
      displayDate={tutorial.displayDate}
      author={references.author as Author}
    ></SidebarPublished>
  );
  const sidebar = <Sidebar>{sidebarPublished}</Sidebar>;
  // Main content
  const listing = (
    <>
      {tutorial.tutorialSteps.map((resource) => (
        <ResourceCard resource={resource} />
      ))}
    </>
  );

  const main = (
    <>
      {content ? (
        <div className="columns">
          <div
            className="column is-11-desktop content"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      ) : null}
      {listing && <div className="bio-tutorial-steps-listing">{listing}</div>}
    </>
  );
  return (
    <SidebarLayout
      pageTitle={tutorial.title}
      subtitle={tutorial.subtitle}
      sidebar={[sidebar]}
    >
      <main>{main}</main>
    </SidebarLayout>
  );
}

export const render = TutorialLayout;
