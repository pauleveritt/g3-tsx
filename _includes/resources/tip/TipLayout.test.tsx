import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { TipLayout } from "./TipLayout.11ty";

const pageData = {
  title: "Some Title",
  subtitle: "Some Subtitle",
  leadin: "Some Leadin",
  content: "Some *content*",
  url: "some-url",
  fileSlug: "some-slug",
  date: "some-data",
};

test("TipLayout", () => {
  document.body.innerHTML = TipLayout(pageData);
  const results = screen.getAllByRole("button");
  expect(results).to.exist;
});
