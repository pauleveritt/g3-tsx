import { expect, test } from "vitest";
import { render, TipsLayout } from "./TipsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../../fixtures";
import { RenderProps } from "../../../src/models";

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
  const renderProps: RenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    data: {
      title,
      subtitle,
    },
    page: {
      fileSlug: "slug",
      url: "url",
    },
  };
  fixtures.context.getResources = () =>
    Array.from(fixtures.resolvedCollections.allResources.values());
  document.body.innerHTML = render.call(fixtures.context, renderProps);
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Resource",
  });
  expect(links[0].href).to.equal("/tips/some-tip/");
});
