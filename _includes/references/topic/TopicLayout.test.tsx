import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { render, TopicLayout, TopicRenderProps } from "./TopicLayout.11ty";
import fixtures from "../../fixtures";

test("should make TopicLayout", () => {
  const topic = fixtures.topics[0];
  const children = fixtures.content;
  const linkedResources = Array.from(
    fixtures.resolvedCollections.allResources.values()
  );
  document.body.innerHTML = TopicLayout({
    topic,
    children: [children],
    linkedResources,
  });
  const results = screen.getAllByText(topic.title);
  expect(results).to.exist;
});

test("should render TopicLayout", () => {
  const renderProps: TopicRenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    page: {
      fileSlug: fixtures.technologies[0].slug,
    },
  };
  fixtures.context.getResources = () =>
    Array.from(fixtures.resolvedCollections.allResources.values());
  document.body.innerHTML = render.call(fixtures.context, renderProps);
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Resource",
  });
  expect(links.length).to.equal(2);
  expect(links[0].href).to.equal("/tips/some-tip/");
});
