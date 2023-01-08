import { expect, test } from "vitest";
import { getTip } from "./TipModels";
import { EleventyPage } from "../../models";

test("Construct a valid Tip", () => {
  // @ts-ignore
  const tipData = { ...globalThis.tipData, resourceType: "tip" };
  const tipPage: EleventyPage = { fileSlug: "some-slug" };
  // TODO collections
  const result = getTip(tipData, tipPage, tipData.content);
  expect(result.title).to.equal(tipData.title);
  expect(result.body).to.equal(tipData.content);
});
