import { test } from "vitest";
import fixtures from "../../fixtures";
import { RenderProps } from "../../../src/models";
import { TutorialStepLayout } from "./TutorialStepLayout.11ty";

test("should render TutorialStepLayout", () => {
  // @ts-ignore
  const renderProps: RenderProps = {
    collections: { ...fixtures.resolvedCollections, all: fixtures.all },
    page: {
      fileSlug: "slug",
      url: fixtures.tutorialSteps[0].url,
    },
  };
  document.body.innerHTML = TutorialStepLayout.call(
    fixtures.context,
    renderProps
  );
  // const cards = screen.getAllByRole("link", { name: "Resource" });
  // expect(cards && cards.length).to.equal(2);
});
