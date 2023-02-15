import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { render, TipRenderProps } from "./TipLayout.11ty";
import fixtures from "../../fixtures";

test("should render TipLayout", () => {
  // @ts-ignore
  const renderProps: TipRenderProps = {
    collections: { ...fixtures.resolvedCollections, all: fixtures.all },
    content: fixtures.content,
    page: {
      url: fixtures.tips[0].url,
    },
  };
  document.body.innerHTML = render.call(fixtures.context, renderProps);
  expect(screen.getByText("Some Tip")).to.exist;
});
