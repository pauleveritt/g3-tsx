import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import {
  TechnologyLayout,
  TechnologyRenderProps,
  render,
} from "./TechnologyLayout.11ty";
import fixtures from "../../fixtures";

test("should make TechnologyLayout", () => {
  const technology = fixtures.technologies[0];
  const children = fixtures.content;
  document.body.innerHTML = TechnologyLayout({
    title: technology.title,
    subtitle: technology.subtitle,
    thumbnail: technology.thumbnail,
    children: [children],
    referenceResources: [
      { title: "Some Title", url: "/tips/some-url/", thumbnail: "t1" },
      { title: "Another Title", url: "/tips/another-url/", thumbnail: "t2" },
    ],
  });
  const results = screen.getAllByText(technology.title);
  expect(results).to.exist;
});

test("should render TechnologyLayout", () => {
  const renderProps: TechnologyRenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    page: {
      fileSlug: fixtures.technologies[0].slug,
    },
  };
  document.body.innerHTML = render(renderProps);
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "resource",
  });
  expect(links.length).to.equal(1);
  expect(links[0].href).to.equal("/tips/another-tip/");
});
