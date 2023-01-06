import { expect, test } from "vitest";
import { getAuthor } from "./models";

test("Construct a valid model", () => {
  // @ts-ignore
  const authorData = { ...globalThis.authorData, resourceType: "author" };
  const result = getAuthor(authorData);
  expect(result.title).to.equal(authorData.title);
});
