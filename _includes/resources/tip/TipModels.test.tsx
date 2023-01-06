import { expect, test } from "vitest";
import { getTip } from "./TipModels";
import { EleventyPage } from "../../models";

test("Construct a valid Tip", () => {
  // @ts-ignore
  const tipData = { ...globalThis.tipData, resourceType: "tip" };
  const tipPage: EleventyPage = { fileSlug: "some-slug" };
  const result = getTip(tipData, tipPage);
  expect(result.title).to.equal(tipData.title);
});
