import { expect, it, test } from "vitest";
import {
  TechnologiesLayout,
  TechnologiesLayoutTechnology,
  TechnologiesRenderProps,
  render,
} from "./TechnologiesLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../../fixtures";

it("should make TechnologiesLayout", () => {
  const technologies: TechnologiesLayoutTechnology[] = [
    { title: "Some Technology", slug: "some-technology" },
    { title: "Another Technology", slug: "another-technology" },
  ];
  const title = "All Technologies";
  const subtitle = "Some technology subtitle text";
  const content = fixtures.content;
  document.body.innerHTML = TechnologiesLayout({
    technologies,
    title,
    subtitle,
    content,
  });
  const items: HTMLUListElement[] = screen.getAllByRole("link", {
    name: "Some Technology",
  });
  expect(items[0].textContent).to.equal(technologies[0].title);
  expect(screen.getByText("world")).to.exist;
});

test("should render TechnologiesLayout", () => {
  const title = "These Technologies";
  const subtitle = "Some technologies text";
  const renderProps: TechnologiesRenderProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    title,
    subtitle,
  };
  document.body.innerHTML = render(renderProps);
  const items: HTMLUListElement[] = screen.getAllByRole("link", {
    name: "Some Technology",
  });
  expect(items[0].textContent).to.equal("Some Technology");
  expect(screen.getByText("world")).to.exist;
});
