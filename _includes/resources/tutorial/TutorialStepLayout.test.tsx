import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { render } from "./TutorialStepLayout.11ty";
import fixtures from "../../fixtures";
import { RenderProps } from "../../../src/models";

test("should render TutorialLayout", () => {
  // @ts-ignore
  const renderProps: RenderProps = {
    collections: { ...fixtures.resolvedCollections, all: fixtures.all },
    page: {
      fileSlug: "slug",
      url: fixtures.tutorials[0].url,
    },
    content: `<a href="#">Hello</a>`,
  };
  document.body.innerHTML = render.call(fixtures.context, renderProps);
  const cards = screen.getAllByRole("link", { name: "Hello" });
  expect(cards).to.exist;
});
