import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import TopNav, { TopNavProps } from "./TopNav.11ty";
import fixtures from "../../fixtures";
import { Tutorial } from "./TutorialModels";

const parent = fixtures.resolvedCollections.allResources.get(
  "/tutorials/some-tutorial/"
) as Tutorial;
export const topNavProps: TopNavProps = {
  parent,
  currentStep: parent.tutorialSteps[1],
};

test("TopNav", () => {
  document.body.innerHTML = TopNav(topNavProps);

  expect(screen.getByRole("link", { name: "Parent Tutorial" })).to.exist;
  expect(screen.getByRole("link", { name: "Previous Step" })).to.exist;
  expect(screen.getByRole("link", { name: "Next Step" })).to.exist;
  const stepMenuItems = screen.getAllByRole("link", { name: "Step Menu Item" });
  expect(stepMenuItems).to.exist;
  if (stepMenuItems) {
    expect(stepMenuItems[0].className).to.equal("dropdown-item");
    expect(stepMenuItems[2].className).to.equal("dropdown-item");
    expect(stepMenuItems[1].className).to.equal("dropdown-item is-active");
  }
});
