import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import SidebarSteps, { SidebarStepsProps } from "./SidebarSteps.11ty";

const props: SidebarStepsProps = {
  currentSlug: "/some-href-2",
  steps: [
    {
      label: "Some Label 1",
      href: "/some-href-1",
    },
    {
      label: "Some Label 2",
      href: "/some-href-2",
    },
    {
      label: "Some Label 3",
      href: "/some-href-3",
    },
  ],
};

test("SidebarSteps", () => {
  document.body.innerHTML = SidebarSteps(props);
  const span: HTMLSpanElement = screen.getByText("2");
  expect(span.className).to.equal("steps-marker is-info");
  expect(screen.getByText("Some Label 3")).to.exist;
});
