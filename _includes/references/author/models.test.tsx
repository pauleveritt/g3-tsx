import { expect, test } from "vitest";
import { getAuthor } from "./models";
import { readMarkdown } from "../../../src/validators";

test("Construct a valid model", () => {
  const { frontmatter, body } = readMarkdown(
    "webstorm-guide/authors/pwe/index.md"
  );

  const authorData = {
    ...frontmatter,
    url: "/authors/pwe/",
    fileSlug: "pwe",
    content: body,
    resourceType: "author",
  };
  const result = getAuthor(authorData);
  expect(result.label).to.equal("pwe");
});
