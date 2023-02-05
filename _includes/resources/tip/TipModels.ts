import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";
import { getResource, Resource } from "../../../src/ResourceModels";
import { EleventyCollectionItem, EleventyPage } from "../../../src/models";

// noinspection JSUnusedGlobalSymbols
export const TipResource = Type.Intersect([
  Resource,
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
export type TipResource = Static<typeof TipResource>;
export type TipCollection = { [name: string]: TipResource };

export function getTip(data: any, page: EleventyPage): TipResource {
  const tip: TipResource = {
    ...getResource(data, page, "tip"),
    leadin: data.leadin,
    animatedGif: data.animatedGif,
    screenshot: data.screenshot,
    shortVideo: data.shortVideo,
    longVideo: data.longVideo,
    hasBody: data.hasBody,
    seealso: data.seealso,
  };
  validateResource(TipResource, tip, page.url);
  return tip;
}

export async function getTipResources(
  collectionItems: EleventyCollectionItem[]
) {
  /* Called from eleventy.config.js to add tip collection's items */
  const results: { [index: string]: TipResource } = {};
  collectionItems.forEach((item) => {
    results[item.page.url] = getTip(item.data, item.page);
  });
  return results;
}
