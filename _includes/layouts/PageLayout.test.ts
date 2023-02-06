import { expect, test } from "vitest";
import { PageRenderProps, render } from "./PageLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../fixtures";

test("should render PageLayout", () => {
  const renderProps: PageRenderProps = {
    title: "Some Page",
    content: "<p>Some content</p>",
  };
  document.body.innerHTML = render.call(fixtures.context, renderProps);
  expect(screen.getByText("Hello Some Page")).to.exist;
});
