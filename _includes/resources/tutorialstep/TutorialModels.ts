import { Static, Type } from "@sinclair/typebox";
import { validateResource } from "../../../src/validators";
import { getResource, Resource } from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";
import path from "path";

// noinspection JSUnusedGlobalSymbols
export const TutorialStepResource = Type.Intersect([
  Resource,
  Type.Object({
    thumbnail: Type.Optional(Type.String()),
    videoBottom: Type.Optional(Type.Boolean()),
    longVideo: Type.Optional(
      Type.Object({
        url: Type.String(),
        posterNumber: Type.Optional(Type.String()),
        poster: Type.Optional(Type.String()),
      })
    ),
  }),
]);
export type TutorialStepResource = Static<typeof TutorialStepResource>;
export type TutorialStepCollection = Map<string, TutorialStepResource>;

export async function getTutorialStep(
  data: any,
  page: EleventyPage
): Promise<TutorialStepResource> {
  // we know we have a thumbnail, fix it to the correct path
  const dirname = path.dirname(page.inputPath);
  const thumbnail = path.join(dirname, data.thumbnail);

  const tutorialStep: TutorialStepResource = {
    ...getResource(data, page, "tutorial"),
    thumbnail,
  };
  validateResource(TutorialStepResource, tutorialStep, page.url);
  return tutorialStep;
}
