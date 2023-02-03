import { expect, test } from "vitest";
import { getTechnology, getTechnologyReferences } from "./TechnologyModels";
import fixtures from "../../fixtures";

test("construct a technology", async () => {
  const { data, page } = fixtures.collections.technology[0];
  const technology = await getTechnology(data, page);
  expect(technology.label).to.equal("st");
});

test("gets technology references", async () => {
  const allTechnologies = fixtures.collections.technology;
  const technologyReferences = await getTechnologyReferences(allTechnologies);
  expect(technologyReferences["st"].title).to.equal("Some Technology");
});
