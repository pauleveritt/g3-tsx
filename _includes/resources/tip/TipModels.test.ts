import { expect, test } from "vitest";
import { getTip } from "./TipModels";
import { EleventyPage } from "../../models";
import { readMarkdown } from "../../../src/validators";

test("Construct a valid Tip", () => {
  const { frontmatter, body } = readMarkdown(
    "webstorm-guide/tips/amend-commit/index.md"
  );
  const tipData = {
    ...frontmatter,
    url: "/tips/amend-commit/",
    content: body,
    collections: {},
  };

  const tipPage: EleventyPage = {
    fileSlug: "some-slug",
    url: "/tips/some-slug/",
    inputPath: "./sites/tips/some-slug/index.md",
  };
  const result = getTip(tipData, tipPage);
  expect(result.title).to.equal(tipData.title);
  expect(result.body).to.equal(tipData.content);
});
