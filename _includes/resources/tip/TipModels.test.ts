import { expect, test } from "vitest";
import { getTip, getTipResources } from "./TipModels";
import fixtures from "../../fixtures";

test("construct a tip", async () => {
  const { data, page } = fixtures.collections.tip[0];
  const tip = await getTip(data, page);
  expect(tip.title).to.equal("Some Tip");
});

test("gets tip resources", async () => {
  const allTips = fixtures.collections.tip;
  const tipResources = await getTipResources(allTips);
  const key = allTips[0].page.url;
  expect(tipResources[key].title).to.equal("Some Tip");
});
