import { expect, it, test } from "vitest";
import { render, TopicsLayout, TopicsRenderProps } from "./TopicsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../../fixtures";

it("should make TopicsLayout", () => {
  const topics = fixtures.collections.topicReferences.values();
  const title = "All Topics";
  const subtitle = "Some topic subtitle text";
  const content = fixtures.content;
  document.body.innerHTML = TopicsLayout({
    topics,
    title,
    subtitle,
    content,
  });
  const items: HTMLUListElement[] = screen.getAllByRole("link", {
    name: "resource",
  });
  expect(items[0].textContent).to.equal("Some Topic");
  expect(screen.getByText("world")).to.exist;
});

test("should render TopicsLayout", () => {
  const title = "These Topics";
  const subtitle = "Some topics text";
  const renderProps: TopicsRenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    title,
    subtitle,
  };
  document.body.innerHTML = render(renderProps);
  const items: HTMLUListElement[] = screen.getAllByRole("link", {
    name: "resource",
  });
  expect(items[0].textContent).to.equal("Some Topic");
  expect(screen.getByText("world")).to.exist;
});
