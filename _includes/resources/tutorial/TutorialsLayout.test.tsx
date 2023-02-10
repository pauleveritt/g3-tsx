import { expect, test } from "vitest";
import { render, TutorialsRenderProps } from "./TutorialsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../../fixtures";

test("should render TutorialsLayout", () => {
  const title = "These Tutorials";
  const subtitle = "Some tips text";
  const renderProps: TutorialsRenderProps = {
    content: fixtures.content,
    title,
    subtitle,
  };
  fixtures.context.getResources = () =>
    Array.from(fixtures.resolvedCollections.allResources.values());
  document.body.innerHTML = render.call(fixtures.context, renderProps);
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Resource",
  });
  expect(links[0].href).to.equal("/tips/some-tip/");
});
