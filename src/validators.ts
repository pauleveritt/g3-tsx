import url from "url";
import { basename, resolve } from "node:path";
import { existsSync, lstatSync, readdirSync } from "node:fs";
import * as matter from "gray-matter";
import MarkdownIt from "markdown-it";
import { Value } from "@sinclair/typebox/value";
import { EleventyCollectionItem, EleventyPage } from "../_includes/models";
import { getTip, TipResource } from "../_includes/resources/tip/TipModels";
import { getAuthor } from "../_includes/references/author/AuthorModels";
import { getProduct } from "../_includes/references/product/ProductModels";
import { getTechnology } from "../_includes/references/technology/TechnologyModels";
import { getTopic } from "../_includes/references/topic/TopicModels";

export const sitesDir = url.fileURLToPath(new URL(`../sites`, import.meta.url));

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

export function readMarkdownTree(dir: string, validator: any) {
  /* Get the frontmatter, body, and slug for all the resources at a dir */
  const contentItems = {};
  const parentDir = resolve(sitesDir, `webstorm-guide/${dir}/`);
  readdirSync(parentDir)
    .map((file) => resolve(parentDir, file))
    .filter((file) => lstatSync(file).isDirectory())
    .forEach((dir) => {
      const fileSlug = basename(dir);
      const page: EleventyPage = { fileSlug };
      const markdownFilename = resolve(dir, "index.md");
      const { frontmatter, body } = readMarkdown(markdownFilename);

      // Call the validator to get back to correct resource type
      const thisResource = validator(frontmatter, page, body);
      // @ts-ignore
      contentItems[fileSlug] = thisResource;
    });
  return contentItems;
}
export function makeCollectionTree(collections: any) {
  /* Read one of the Guide sites and generate simulated collections.all etc. */

  collections.tip = readMarkdownTree("tips", getTip);
  collections.author = readMarkdownTree("authors", getAuthor);
  collections.product = readMarkdownTree("products", getProduct);
  collections.technology = readMarkdownTree("technologies", getTechnology);
  collections.topic = readMarkdownTree("topics", getTopic);
}

export function getTipResources(
  collectionItems: EleventyCollectionItem[]
): TipResource[] {
  /* Called from eleventy.config.js to add tip collection's items */
  return collectionItems.map((item) => {
    return getTip(item.data, item.page);
  });
}
