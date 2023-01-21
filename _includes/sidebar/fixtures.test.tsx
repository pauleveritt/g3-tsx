import { expect, it } from "vitest";
import fixtures from "../fixtures";
import { validateResource } from "../../src/validators";
import { TipResource } from "../resources/tip/TipModels";
import { AuthorReference } from "../references/author/AuthorModels";

it("should have valid fixture data", () => {
  const { children, tips, authors } = fixtures;
  expect(children[0]).to.contain("Hello");
  expect(() => validateResource(TipResource, tips[0])).not.toThrowError();
  expect(() =>
    validateResource(AuthorReference, authors[0])
  ).not.toThrowError();
});
