import { expect, test } from "vitest";
import { getTip } from "./models";

test("Construct a valid Tip", () => {
  // @ts-ignore
  const tipData = globalThis.tipData;
  const result = getTip(tipData);
  expect(result.title).to.equal(tipData.title);
});
