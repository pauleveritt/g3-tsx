import { Static, Type } from "@sinclair/typebox";
import { Resource, ResourceFrontmatter } from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";

export const TipFrontmatter = Type.Intersect([
  ResourceFrontmatter,
  Type.Object({
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

export class Tip extends Resource implements TipFrontmatter {
  animatedGif?: TipFrontmatter["animatedGif"];
  hasBody?: boolean;
  leadin?: string;
  longVideo?: TipFrontmatter["longVideo"];
  screenshot?: TipFrontmatter["screenshot"];
  seealso?: any;
  shortVideo?: TipFrontmatter["shortVideo"];
  static frontmatterSchema = TipFrontmatter;

  constructor({ data, page }: { data: TipFrontmatter; page: EleventyPage }) {
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
