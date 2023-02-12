import { Static, Type } from "@sinclair/typebox";
import { validateFrontmatter } from "../../../src/validators";
import {
  BaseData,
  Resource,
  ResourceFrontmatter,
} from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";
import { imageOptions } from "../../../src/registration";
// @ts-ignore
import Image from "@11ty/eleventy-img";

export const TutorialStepFrontmatter = Type.Intersect([
  ResourceFrontmatter,
  Type.Object({
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
export type TutorialStepFrontmatter = Static<typeof TutorialStepFrontmatter>;
export type TutorialStepData = TutorialStepFrontmatter & BaseData;

export class TutorialStep extends Resource implements TutorialStepFrontmatter {
  longVideo: TutorialStepFrontmatter["longVideo"];
  videoBottom: boolean;

  constructor({ data, page }: { data: TutorialStepData; page: EleventyPage }) {
    super({ data, page });
    this.longVideo = data.longVideo;
    this.videoBottom = !!data.videoBottom;
  }
}

export async function getTutorialStep(
  data: TutorialStepFrontmatter,
  page: EleventyPage
): Promise<TutorialStep> {
  validateFrontmatter(TutorialStepFrontmatter, data, page.url);
  const tutorialStep = new TutorialStep({ data, page });
  await Image(tutorialStep.thumbnail, imageOptions);
  return tutorialStep;
}
