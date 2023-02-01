import { expect, it } from "vitest";
import fixtures from "../fixtures";
import { getReference } from "./ReferenceModels";

it("should use getReference to make a reference", () => {
  const { data, page } = fixtures.all[0];
  const reference = getReference(data, page, "tip");
  expect(reference.label).to.equal("some-tip");
});
