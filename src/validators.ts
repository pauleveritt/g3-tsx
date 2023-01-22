import url from "url";
import { basename, resolve } from "node:path";
import { existsSync, lstatSync, readdirSync } from "node:fs";
import * as matter from "gray-matter";
import MarkdownIt from "markdown-it";
import { Value } from "@sinclair/typebox/value";
import { EleventyCollectionItem, EleventyPage } from "../_includes/models";
import { getTip, TipResource } from "../_includes/resources/tip/TipModels";
import {
  AuthorReference,
  getAuthor,
} from "../_includes/references/author/AuthorModels";
import {
  getProduct,
  ProductReference,
} from "../_includes/references/product/ProductModels";
import {
  getTechnology,
  TechnologyReference,
} from "../_includes/references/technology/TechnologyModels";
import {
  getTopic,
  TopicReference,
} from "../_includes/references/topic/TopicModels";

export const sitesDir = url.fileURLToPath(new URL(`../sites`, import.meta.url));
const md = new MarkdownIt("commonmark");

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
  const body = md.render(tipMatter.content as string);
  return {
    frontmatter,
    body,
  };
}

export function validateResource(
  resourceType: any,
  frontmatter: any,
  url: string
) {
  /* Throw an exception if validation fails */
  if (!Value.Check(resourceType, frontmatter)) {
    const errors = [...Value.Errors(resourceType, frontmatter)];
    const message = errors
      .map(
        (error) =>
          `Validation failure: ${error.path} failed with ${error.message} in ${url}`
      )
      .join("\n");
    throw new Error(message);
  }
}

export function readMarkdownTree(dir: string, validator: any) {
  /* Get the frontmatter, body, and slug for all the resources at a dir */
  const contentItems: { [key: string]: any } = {};
  const parentDir = resolve(sitesDir, `webstorm-guide/${dir}/`);
  readdirSync(parentDir)
    .map((file) => resolve(parentDir, file))
    .filter((file) => lstatSync(file).isDirectory())
    .forEach((thisDir) => {
      const fileSlug = basename(thisDir);
      const url = `/${dir}/${fileSlug}/`;
      const page: EleventyPage = { fileSlug, url };
      const markdownFilename = resolve(thisDir, "index.md");
      const { frontmatter, body } = readMarkdown(markdownFilename);

      // Call the validator to get back to correct resource type
      contentItems[fileSlug] = validator(frontmatter, page, body);
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

export function getTipResources(collectionItems: EleventyCollectionItem[]) {
  /* Called from eleventy.config.js to add tip collection's items */
  const results: { [index: string]: TipResource } = {};
  collectionItems
    // tips/index.md gets the label "tip" put on it. Filter it
    // into a "page" using resourceType.
    .filter((item) => !(item.data.resourceType && item.data.resourceType))
    .forEach((item) => {
      results[item.page.url] = getTip(item.data, item.page);
    });
  return results;
}

export function getAuthorReferences(collectionItems: EleventyCollectionItem[]) {
  /* Called from eleventy.config.js to add author collection's items */
  const results: { [index: string]: AuthorReference } = {};
  collectionItems.forEach((item) => {
    const thisAuthor = getAuthor(item.data, item.page);
    results[thisAuthor.label] = thisAuthor;
  });
  return results;
}

export function getTechnologyReferences(
  collectionItems: EleventyCollectionItem[]
) {
  /* Called from eleventy.config.js to add technology collection's items */
  const results: { [index: string]: TechnologyReference } = {};
  collectionItems.forEach((item) => {
    const thisTechnology = getTechnology(item.data, item.page);
    results[thisTechnology.label] = thisTechnology;
  });
  return results;
}

export function getTopicReferences(collectionItems: EleventyCollectionItem[]) {
  /* Called from eleventy.config.js to add topic collection's items */
  const results: { [index: string]: TopicReference } = {};
  collectionItems.forEach((item) => {
    const thisTopic = getTopic(item.data, item.page);
    results[thisTopic.label] = thisTopic;
  });
  return results;
}

export function getProductReferences(
  collectionItems: EleventyCollectionItem[]
) {
  /* Called from eleventy.config.js to add product collection's items */
  const results: { [index: string]: ProductReference } = {};
  collectionItems.forEach((item) => {
    const thisProduct = getProduct(item.data, item.page);
    results[thisProduct.label] = thisProduct;
  });
  return results;
}
