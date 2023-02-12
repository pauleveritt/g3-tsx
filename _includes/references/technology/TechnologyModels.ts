import { Reference, ReferenceFrontmatter } from "../../../src/ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { validateFrontmatter } from "../../../src/validators";
import { EleventyPage } from "../../../src/models";
import path from "path";
import { BaseData } from "../../../src/ResourceModels";

export const TechnologyFrontmatter = Type.Intersect([
  ReferenceFrontmatter,
  Type.Object({
    logo: Type.String(),
  }),
]);
export type TechnologyFrontmatter = Static<typeof TechnologyFrontmatter>;
export type TechnologyData = TechnologyFrontmatter & BaseData;

export class Technology extends Reference implements TechnologyFrontmatter {
  logo: string;

  constructor({ data, page }: { data: TechnologyData; page: EleventyPage }) {
    super({ data, page });
    this.logo = path.join(page.url, data.logo);
  }
}

export async function getTechnology(
  data: TechnologyData,
  page: EleventyPage
): Promise<Technology> {
  validateFrontmatter(TechnologyFrontmatter, data, page.url);
  return new Technology({ data, page });
}
