import { expect, it } from "vitest";
import fixtures from "../fixtures";
import { validateResource } from "../../src/validators";
import { TipResource } from "../resources/tip/TipModels";
import { AuthorReference } from "../references/author/AuthorModels";

it("should have valid fixture data", () => {
  const { children, tips, authors, collections } = fixtures;
  const { authorReferences } = collections;
  expect(children[0]).to.contain("Hello");

  // Tips
  tips.forEach((tip) => {
    expect(() =>
      validateResource(TipResource, tip, "my-tip")
    ).not.toThrowError();
  });
  // Make sure our join works
  expect(Object.keys(authorReferences)).to.contain(tips[0].author);

  // Authors
  authors.forEach((author) => {
    expect(() =>
      validateResource(AuthorReference, author, "my-tip")
    ).not.toThrowError();
  });

  // Ensure references
});
