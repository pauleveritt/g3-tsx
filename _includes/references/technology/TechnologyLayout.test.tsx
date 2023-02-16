import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { render, TechnologyLayout } from "./TechnologyLayout.11ty";
import fixtures from "../../fixtures";
import { RenderProps } from "../../../src/models";

test("should make TechnologyLayout", () => {
  const technology = fixtures.technologies[0];
  const children = fixtures.content;
  const linkedResources = Array.from(
    fixtures.resolvedCollections.allResources.values()
  );
  document.body.innerHTML = TechnologyLayout({
    title: technology.title,
    subtitle: technology.subtitle,
    children: [children],
    linkedResources,
  });
  const results = screen.getAllByText(technology.title);
  expect(results).to.exist;
});

test("should render TechnologyLayout", () => {
  const renderProps: RenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    data: {},
    page: {
      fileSlug: fixtures.technologies[0].slug,
      url: "some-url",
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
