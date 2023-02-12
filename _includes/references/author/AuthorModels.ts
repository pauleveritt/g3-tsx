import { Reference, ReferenceFrontmatter } from "../../../src/ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateFrontmatter } from "../../../src/validators";
import path from "path";
// @ts-ignore
import Image from "@11ty/eleventy-img";
import { EleventyPage } from "../../../src/models";
import { imageOptions } from "../../../src/registration";
import { BaseData } from "../../../src/ResourceModels";

export const AuthorFrontmatter = Type.Intersect([
  ReferenceFrontmatter,
  Type.Object({
    thumbnail: Type.String(),
  }),
]);
export type AuthorFrontmatter = Static<typeof AuthorFrontmatter>;
export type AuthorData = AuthorFrontmatter & BaseData;

export class Author extends Reference implements AuthorFrontmatter {
  thumbnail: string;

  constructor({ data, page }: { data: AuthorData; page: EleventyPage }) {
    super({ data, page });
    this.thumbnail = path.join(path.dirname(page.inputPath), data.thumbnail);
  }
}

export async function getAuthor(
  data: AuthorData,
  page: EleventyPage
): Promise<Author> {
  validateFrontmatter(AuthorFrontmatter, data, page.url);

  // TODO Would be nice to put this in class, but needs async constructor
  const author = new Author({ data, page });
  await Image(author.thumbnail, imageOptions);
  return author;
}
