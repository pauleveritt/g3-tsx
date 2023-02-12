import { expect, it, test } from "vitest";
import { render, TopicsLayout, TopicsRenderProps } from "./TopicsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../../fixtures";

it("should make TopicsLayout", () => {
  const topics = fixtures.topics;
  const title = "All Topics";
  const subtitle = "Some topic subtitle text";
  const content = fixtures.content;
  document.body.innerHTML = TopicsLayout({
    topics,
    title,
    subtitle,
    content,
  });
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Topic",
  });
  expect(links[0].href).to.equal("/topics/at/");
});

test("should render TopicsLayout", () => {
  const title = "These Topics";
  const subtitle = "Some topics text";
  const renderProps: TopicsRenderProps = {
    content: fixtures.content,
    title,
    subtitle,
  };
  fixtures.context.getReferences = () => fixtures.topics;
  document.body.innerHTML = render.call(fixtures.context, renderProps);
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Topic",
  });
  expect(links[0].href).to.equal("/topics/at/");
});
