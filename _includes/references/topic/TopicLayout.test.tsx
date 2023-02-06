import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { render, TopicLayout, TopicRenderProps } from "./TopicLayout.11ty";
import fixtures from "../../fixtures";

test("should make TopicLayout", () => {
  const topic = fixtures.technologies[0];
  const children = fixtures.content;
  document.body.innerHTML = TopicLayout({
    title: topic.title,
    subtitle: topic.subtitle,
    children: [children],
    referenceResources: [
      { title: "Some Title", url: "/tips/some-url/", thumbnail: "t1" },
      { title: "Another Title", url: "/tips/another-url/", thumbnail: "t2" },
    ],
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
  document.body.innerHTML = render.call(fixtures.context, renderProps);
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "resource",
  });
  expect(links.length).to.equal(2);
  expect(links[0].href).to.equal("/tips/another-tip/");
});
