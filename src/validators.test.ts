import { expect, test } from "vitest";
import path from "path";
import { readMarkdown, sitesDir, validateResource } from "./validators";
import { TipResource } from "../_includes/resources/tip/models";

test("defines the sitesDir", () => {
  expect(path.basename(sitesDir)).to.equal("sites");
});

test("reads the Markdown", () => {
  const { frontmatter, body } = readMarkdown(
    "webstorm-guide/tips/amend-commit/index.md"
  );
  expect(frontmatter.title).to.equal("Fix Your Work with Amend Commit");
  expect(body.startsWith("<p>You")).to.be.true;
});

test("validates good frontmatter", () => {
  const frontmatter = { title: "A Good Tip" };
  const validation = () => validateResource(TipResource, frontmatter);
  expect(validation).not.toThrow();
});

test("validates bad frontmatter", () => {
  const frontmatter = { age: 49 };
  const validation = () => validateResource(TipResource, frontmatter);
  expect(validation).toThrow("Expected required");
});
