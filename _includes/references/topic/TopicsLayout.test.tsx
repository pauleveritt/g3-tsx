import { expect, test } from "vitest";
import { TopicsLayout } from "./TopicsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../../fixtures";
import { RenderProps } from "../../../src/models";

test("should render TopicsLayout", () => {
  const title = "These Topics";
  const subtitle = "Some topics text";
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
  fixtures.context.getReferences = () => fixtures.topics;
  document.body.innerHTML = TopicsLayout.call(fixtures.context, renderProps);
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Topic",
  });
  expect(links[0].href).to.equal("/topics/at/");
});
