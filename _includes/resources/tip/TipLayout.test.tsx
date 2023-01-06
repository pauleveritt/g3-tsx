import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { TipLayout } from "./TipLayout.11ty";

test("TipLayout", () => {
  // @ts-ignore
  const tipData = { ...globalThis.tipData, resourceType: "tip" };
  document.body.innerHTML = TipLayout(tipData);
  const results = screen.getAllByRole("button");
  expect(results).to.exist;
});
