import { Static, Type } from "@sinclair/typebox";
import { validateFrontmatter } from "../../../src/validators";
import {
  getResourceFrontmatter,
  Resource,
  ResourceFrontmatter,
} from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";

export const TipFrontmatter = Type.Intersect([
  ResourceFrontmatter,
  Type.Object({
    thumbnail: Type.Optional(Type.String()),
    leadin: Type.Optional(Type.String()),
    animatedGif: Type.Optional(
      Type.Object({
        file: Type.String(),
        width: Type.Number(),
        height: Type.Number(),
      })
    ),
    screenshot: Type.Optional(Type.String()),
    shortVideo: Type.Optional(
      Type.Object({
        url: Type.String(),
        posterNumber: Type.Optional(Type.String()),
        poster: Type.Optional(Type.String()),
      })
    ),
    longVideo: Type.Optional(
      Type.Object({
        url: Type.String(),
        posterNumber: Type.Optional(Type.String()),
        poster: Type.Optional(Type.String()),
      })
    ),
    hasBody: Type.Optional(Type.Boolean()),
    seealso: Type.Optional(Type.Any()),
  }),
]);
export type TipFrontmatter = Static<typeof TipFrontmatter>;

export type Tip = {} & TipFrontmatter & Resource;

export async function getTip(data: any, page: EleventyPage): Promise<Tip> {
  const tip: Tip = {
    ...getResourceFrontmatter(data, page, "tip"),
    leadin: data.leadin,
    animatedGif: data.animatedGif,
    screenshot: data.screenshot,
    shortVideo: data.shortVideo,
    longVideo: data.longVideo,
    hasBody: data.hasBody,
    seealso: data.seealso,
  };
  validateFrontmatter(TipFrontmatter, tip, page.url);
  return tip;
}
