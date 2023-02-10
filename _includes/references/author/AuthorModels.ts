import { getReference, Reference } from "../../../src/ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";
import path from "path";
// @ts-ignore
import Image from "@11ty/eleventy-img";
import { EleventyPage } from "../../../src/models";
import { imageOptions } from "../../../src/registration";

export const Author = Type.Intersect([
  Reference,
  Type.Object({
    thumbnail: Type.String(),
  }),
]);
export type Author = Static<typeof Author>;

export async function getAuthor(
  data: any,
  page: EleventyPage
): Promise<Author> {
  // we know we have a thumbnail, fix it to the correct path
  const dirname = path.dirname(page.inputPath);
  const thumbnail = path.join(dirname, data.thumbnail);
  const reference: Author = getReference(data, page, "author") as Author;
  reference.thumbnail = thumbnail;

  validateResource(Author, reference, page.url);

  // generate thumbnail images to output directory
  await Image(reference.thumbnail, imageOptions);

  return reference;
}
