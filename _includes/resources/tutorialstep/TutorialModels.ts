import { Static, Type } from "@sinclair/typebox";
import { validateFrontmatter } from "../../../src/validators";
import {
  getResourceFrontmatter,
  Resource,
  ResourceFrontmatter,
} from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";
import path from "path";

export const TutorialStepFrontmatter = Type.Intersect([
  ResourceFrontmatter,
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
export type TutorialStepFrontmatter = Static<typeof TutorialStepFrontmatter>;

export type TutorialStep = {} & TutorialStepFrontmatter & Resource;
export async function getTutorialStep(
  data: any,
  page: EleventyPage
): Promise<TutorialStep> {
  // we know we have a thumbnail, fix it to the correct path
  const dirname = path.dirname(page.inputPath);
  const thumbnail = path.join(dirname, data.thumbnail);

  const tutorialStep: TutorialStep = {
    ...getResourceFrontmatter(data, page, "tutorial"),
    thumbnail,
  };
  validateFrontmatter(TutorialStepFrontmatter, tutorialStep, page.url);
  return tutorialStep;
}
