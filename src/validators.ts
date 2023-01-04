import url from "url";
import { resolve } from "node:path";
import { existsSync, lstatSync } from "node:fs";
import * as matter from "gray-matter";
import MarkdownIt from "markdown-it";
import { Value } from "@sinclair/typebox/value";

export const sitesDir = url.fileURLToPath(new URL(`../sites`, import.meta.url));

// const Resource = Type.Object({
//   title: Type.String(),
// });
// type Resource = Static<typeof Resource>;

export function readMarkdown(filePath: string): any {
  if (!lstatSync(sitesDir).isDirectory()) {
    throw Error(`Sites directory does not exist`);
  }
  const markdownFile = resolve(sitesDir, filePath);
  if (!existsSync(markdownFile)) {
    throw Error(`Directory "${filePath}" does not exist`);
  }
  const tipMatter = matter.read(markdownFile as string);
  const frontmatter = tipMatter.data;

  // Now the Markdown
  const md = new MarkdownIt("commonmark");
  const body = md.render(tipMatter.content as string);
  return {
    frontmatter,
    body,
  };
}

export function validateResource(resourceType: any, frontmatter: any) {
  /* Throw an exception if validation fails */
  if (!Value.Check(resourceType, frontmatter)) {
    const errors = [...Value.Errors(resourceType, frontmatter)];
    const message = errors
      .map(
        (error) =>
          `Validation failure: ${error.path} failed with ${error.message}`
      )
      .join("\n");
    throw new Error(message);
  }
}
