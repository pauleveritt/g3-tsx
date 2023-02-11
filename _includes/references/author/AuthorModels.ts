import {
  getReference,
  Reference,
  ReferenceFrontmatter,
} from "../../../src/ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateFrontmatter } from "../../../src/validators";
import path from "path";
// @ts-ignore
import Image from "@11ty/eleventy-img";
import { EleventyPage } from "../../../src/models";
import { imageOptions } from "../../../src/registration";

export const AuthorFrontmatter = Type.Intersect([
  ReferenceFrontmatter,
  Type.Object({
    thumbnail: Type.String(),
  }),
]);
export type AuthorFrontmatter = Static<typeof AuthorFrontmatter>;

export type Author = {} & AuthorFrontmatter & Reference;

export async function getAuthor(
  data: any,
  page: EleventyPage
): Promise<Author> {
  // we know we have a thumbnail, fix it to the correct path
  const dirname = path.dirname(page.inputPath); // TODO Centralize in getReference
  const thumbnail = path.join(dirname, data.thumbnail);
  const reference = getReference(data, page, "author") as Author;
  reference.thumbnail = thumbnail;

  validateFrontmatter(AuthorFrontmatter, reference, page.url);

  // generate thumbnail images to output directory
  await Image(reference.thumbnail, imageOptions);

  return reference;
}
