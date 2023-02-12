import { Static, Type } from "@sinclair/typebox";
import { validateFrontmatter } from "../../../src/validators";
import {
  BaseData,
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
export type TipData = TipFrontmatter & BaseData;

export class Tip extends Resource implements TipFrontmatter {
  animatedGif?: TipFrontmatter["animatedGif"];
  hasBody?: boolean;
  leadin?: string;
  longVideo?: TipFrontmatter["longVideo"];
  screenshot?: TipFrontmatter["screenshot"];
  seealso?: any;
  shortVideo?: TipFrontmatter["shortVideo"];

  constructor({ data, page }: { data: TipData; page: EleventyPage }) {
    super({ data, page });
    this.animatedGif = data.animatedGif;
    this.hasBody = data.hasBody;
    this.leadin = data.leadin;
    this.longVideo = data.longVideo;
    this.screenshot = data.screenshot;
    this.seealso = data.seealso;
    this.shortVideo = data.shortVideo;
  }
}

export async function getTip(data: TipData, page: EleventyPage): Promise<Tip> {
  // const tip: Tip = {
  //   ...getResourceFrontmatter(data, page, "tip"),
  //   leadin: data.leadin,
  //   animatedGif: data.animatedGif,
  //   screenshot: data.screenshot,
  //   shortVideo: data.shortVideo,
  //   longVideo: data.longVideo,
  //   hasBody: data.hasBody,
  //   seealso: data.seealso,
  // };

  // TODO Move this to base class
  validateFrontmatter(TipFrontmatter, data, page.url);
  return new Tip({ data, page });
}
