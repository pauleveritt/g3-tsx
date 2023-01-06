import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { TipLayout } from "./TipLayout.11ty";
import { EleventyPage } from "../../models";

test("TipLayout", () => {
  const tipPage: EleventyPage = { fileSlug: "some-slug" };
  // @ts-ignore
  const tipData = { ...globalThis.tipData, page: tipPage };
  document.body.innerHTML = TipLayout(tipData);
  const results = screen.getAllByRole("button");
  expect(results).to.exist;
});
