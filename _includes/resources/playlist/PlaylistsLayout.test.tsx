import { expect, test } from "vitest";
import { PlaylistsLayout } from "./PlaylistsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../../fixtures";
import { RenderProps } from "../../../src/models";

test("should render TipsLayout", () => {
  const title = "These Tips";
  const subtitle = "Some tips text";
  const renderProps: RenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    title,
    subtitle,
    page: {
      fileSlug: "slug",
      url: "url",
    },
  };
  fixtures.context.getResources = () =>
    Array.from(fixtures.resolvedCollections.allResources.values());
  document.body.innerHTML = PlaylistsLayout.call(fixtures.context, renderProps);
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Resource",
  });
  expect(links[0].href).to.equal("/tips/some-tip/");
});
