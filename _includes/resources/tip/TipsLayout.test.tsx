import { expect, test } from "vitest";
import { render, TipsLayout, TipsRenderProps } from "./TipsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../../fixtures";

test("should make TipsLayout", () => {
  const tips = Array.from(fixtures.resolvedCollections.allResources.values());
  const title = "These Tips";
  const subtitle = "Some tips text";
  const content = fixtures.content;
  document.body.innerHTML = TipsLayout({ tips, title, subtitle, content });
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Resource",
  });
  expect(links[0].href).to.equal("/tips/some-tip/");
});

test("should render TipsLayout", () => {
  const title = "These Tips";
  const subtitle = "Some tips text";
  const renderProps: TipsRenderProps = {
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
