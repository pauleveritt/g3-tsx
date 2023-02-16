import { expect, test } from "vitest";
import { TechnologiesLayout } from "./TechnologiesLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../../fixtures";
import { RenderProps } from "../../../src/models";

test("should render TechnologiesLayout", () => {
  const title = "These Technologies";
  const subtitle = "Some technologies text";
  const renderProps: RenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    title,
    subtitle,
    page: {
      fileSlug: "fileSlug",
      url: "/fileSlug",
    },
  };
  fixtures.context.getReferences = () => fixtures.technologies;
  document.body.innerHTML = TechnologiesLayout.call(
    fixtures.context,
    renderProps
  );
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Technology",
  });
  expect(links[0].href).to.equal("/technologies/st/");
});
