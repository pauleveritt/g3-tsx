import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { render, TutorialStepRenderProps } from "./TutorialStepLayout.11ty";
import fixtures from "../../fixtures";

test("should render TutorialLayout", () => {
  // @ts-ignore
  const renderProps: TutorialStepRenderProps = {
    collections: { ...fixtures.resolvedCollections, all: fixtures.all },
    page: {
      url: fixtures.tutorials[0].url,
    },
  };
  document.body.innerHTML = render.call(fixtures.context, renderProps);
  const cards = screen.getAllByRole("link", { name: "Hello" });
  expect(cards).to.exist;
});
