import { expect, it, test } from "vitest";
import { render, TechnologiesLayout } from "./TechnologiesLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../../fixtures";
import { RenderProps } from "../../../src/models";

it("should make TechnologiesLayout", () => {
  const technologies = fixtures.technologies;
  const title = "All Technologies";
  const subtitle = "Some technology subtitle text";
  const content = fixtures.content;
  document.body.innerHTML = TechnologiesLayout({
    technologies,
    title,
    subtitle,
    content,
  });
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Technology",
  });
  expect(links[0].href).to.equal("/technologies/st/");
});

test("should render TechnologiesLayout", () => {
  const title = "These Technologies";
  const subtitle = "Some technologies text";
  const renderProps: RenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    data: {
      title,
      subtitle,
    },
    page: {
      fileSlug: "fileSlug",
      url: "/fileSlug",
    },
  };
  fixtures.context.getReferences = () => fixtures.technologies;
  document.body.innerHTML = render.call(fixtures.context, renderProps);
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Technology",
  });
  expect(links[0].href).to.equal("/technologies/st/");
});
