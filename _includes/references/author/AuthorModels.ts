import { Reference, ReferenceFrontmatter } from "../../../src/ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import path from "path";
// @ts-ignore
import Image from "@11ty/eleventy-img";
import { EleventyPage } from "../../../src/models";
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
  static frontmatterSchema = AuthorFrontmatter;

  constructor({ data, page }: { data: AuthorData; page: EleventyPage }) {
    super({ data, page });
    this.thumbnail = path.join(path.dirname(page.inputPath), data.thumbnail);
  }
}

// TODO We should be able to get rid of this
export async function getAuthor(
  data: AuthorData,
  page: EleventyPage
): Promise<Author> {
  const author = new Author({ data, page });
  await author.init();
  return author;
}
