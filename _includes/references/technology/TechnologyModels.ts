import {
  getReference,
  Reference,
  ReferenceFrontmatter,
} from "../../../src/ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateFrontmatter } from "../../../src/validators";
import { EleventyPage } from "../../../src/models";
import path from "path";

export const TechnologyFrontmatter = Type.Intersect([
  ReferenceFrontmatter,
  Type.Object({
    logo: Type.String(),
  }),
]);
export type TechnologyFrontmatter = Static<typeof TechnologyFrontmatter>;

export type Technology = {} & TechnologyFrontmatter & Reference;
export async function getTechnology(
  data: any,
  page: EleventyPage
): Promise<Technology> {
  const technology: Technology = {
    ...getReference(data, page, "technology"),
    logo: path.join(page.url, data.logo),
  };
  validateFrontmatter(TechnologyFrontmatter, technology, page.url);
  return technology;
}
