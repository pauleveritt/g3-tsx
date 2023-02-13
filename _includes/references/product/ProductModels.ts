import { Reference, ReferenceFrontmatter } from "../../../src/ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { EleventyPage } from "../../../src/models";
import { BaseData } from "../../../src/ResourceModels";

export const ProductFrontmatter = Type.Intersect([
  ReferenceFrontmatter,
  Type.Object({
    logo: Type.Optional(Type.String()),
  }),
]);
export type ProductFrontmatter = Static<typeof ProductFrontmatter>;
export type ProductData = ProductFrontmatter & BaseData;

export class Product extends Reference implements ProductFrontmatter {
  logo?: string;
  static frontmatterSchema = ProductFrontmatter;

  constructor({ data, page }: { data: ProductData; page: EleventyPage }) {
    super({ data, page });
    this.logo = data.logo;
  }
}
