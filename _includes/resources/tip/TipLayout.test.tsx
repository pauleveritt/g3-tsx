import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { TipLayout } from "./TipLayout.11ty";
import fixtures from "../../fixtures";
import { RenderProps } from "../../../src/models";

test("should render TipLayout", () => {
  const renderProps: RenderProps = {
    collections: { ...fixtures.resolvedCollections, all: fixtures.all },
    content: "<p>The TipLayout</p>",
    page: {
      fileSlug: "slug",
      url: fixtures.tips[0].url,
    },
  };
  document.body.innerHTML = TipLayout.call(fixtures.context, renderProps);
  expect(screen.getByText("Some Tip")).to.exist;
  expect(screen.getByText("The TipLayout")).to.exist;
});
