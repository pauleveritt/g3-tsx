import { expect, test } from "vitest";
import { getTip } from "./models";

test("Construct a valid Tip", () => {
  // @ts-ignore
  const tipData = { ...globalThis.tipData, resourceType: "tip" };
  const result = getTip(tipData);
  expect(result.title).to.equal(tipData.title);
});
