import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { TutorialLayout } from "./TutorialLayout.11ty";
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
  };
  document.body.innerHTML = TutorialLayout.call(fixtures.context, renderProps);
  const cards = screen.getAllByRole("link", { name: "Resource" });
  expect(cards && cards.length).to.equal(3);
});
