import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { render, TutorialRenderProps } from "./TutorialLayout.11ty";
import fixtures from "../../fixtures";

test("should render TutorialLayout", () => {
  // @ts-ignore
  const renderProps: TutorialRenderProps = {
    collections: { ...fixtures.resolvedCollections, all: fixtures.all },
    page: {
      url: fixtures.tutorials[0].url,
    },
  };
  document.body.innerHTML = render.call(fixtures.context, renderProps);
  const cards = screen.getAllByRole("link", { name: "Resource" });
  expect(cards && cards.length).to.equal(2);
});
