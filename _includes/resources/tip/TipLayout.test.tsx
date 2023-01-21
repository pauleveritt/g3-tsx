import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { TipLayout } from "./TipLayout.11ty";
import fixtures from "../../fixtures";

test("TipLayout", () => {
  document.body.innerHTML = TipLayout(
    fixtures.tips[0],
    fixtures.content,
    fixtures.authors[0]
  );
  const results = screen.getAllByRole("button");
  expect(results).to.exist;

  const authorLink: HTMLAnchorElement = screen.getByRole("link", {
    name: "Some Author",
  });
  expect(authorLink.href).to.equal("some-author");
});
