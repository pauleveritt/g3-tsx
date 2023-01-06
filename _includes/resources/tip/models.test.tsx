import { expect, test } from "vitest";
import { getTip } from "./models";

const pageData = {
  title: "Some Title",
  subtitle: "Some Subtitle",
  leadin: "Some Leadin",
  content: "Some *body*",
};
test("Construct a valid model", () => {
  const result = getTip(pageData);
  expect(result.title).to.equal(pageData.title);
});
