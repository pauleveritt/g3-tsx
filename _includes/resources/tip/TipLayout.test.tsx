import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { TipLayout } from "./TipLayout.11ty";
import { TipResource } from "./models";

const pageData: TipResource = {
  title: "Some Title",
  subtitle: "Some Subtitle",
  leadin: "Some Leadin",
};

test("TipLayout", () => {
  document.body.innerHTML = TipLayout(pageData);
  const results = screen.getAllByRole("button");
  expect(results).to.exist;
});
