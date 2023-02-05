import { expect, test } from "vitest";
import { getTechnology } from "./TechnologyModels";
import fixtures from "../../fixtures";

test("construct a technology", async () => {
  const { data, page } = fixtures.collections.technology[0];
  const technology = await getTechnology(data, page);
  expect(technology.label).to.equal("st");
});
