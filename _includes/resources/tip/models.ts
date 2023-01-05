import { Static, Type } from "@sinclair/typebox";

// noinspection JSUnusedGlobalSymbols
export const TipResource = Type.Object({
  title: Type.String(),
  subtitle: Type.Optional(Type.String()),
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
});
export type TipResource = Static<typeof TipResource>;
