import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";

// noinspection JSUnusedGlobalSymbols
export const TipResource = Type.Object({
  title: Type.String(),
  subtitle: Type.Optional(Type.String()),
  body: Type.String(),
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

export function getTip(data: any): TipResource {
  const tip: TipResource = {
    title: data.title,
    subtitle: data.subtitle,
    body: data.content,
    leadin: data.leadin,
    animatedGif: data.animatedGif,
    screenshot: data.screenshot,
    shortVideo: data.shortVideo,
    longVideo: data.longVideo,
    hasBody: data.hasBody,
    seealso: data.seealso,
  };
  validateResource(TipResource, tip);
  return tip;
}
