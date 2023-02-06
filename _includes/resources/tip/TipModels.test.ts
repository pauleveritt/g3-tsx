import { expect, test } from "vitest";
import { getTip } from "./TipModels";
import fixtures from "../../fixtures";

test("construct a tip", async () => {
  const { data, page } = fixtures.tipItems[0];
  const tip = await getTip(data, page);
  expect(tip.title).to.equal("Some Tip");
});
