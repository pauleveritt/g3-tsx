import { Static, Type } from "@sinclair/typebox";
import { validateFrontmatter } from "../../../src/validators";
import {
  getResourceFrontmatter,
  Resource,
  ResourceFrontmatter,
} from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";
import path from "path";
import { imageOptions } from "../../../src/registration";
// @ts-ignore
import Image from "@11ty/eleventy-img";

export const TutorialFrontmatter = Type.Intersect([
  ResourceFrontmatter,
  Type.Object({
    thumbnail: Type.Optional(Type.String()),
    tutorialItems: Type.Array(Type.String()),
    videoBottom: Type.Optional(Type.Boolean()),
  }),
]);
export type TutorialFrontmatter = Static<typeof TutorialFrontmatter>;

export type Tutorial = {} & TutorialFrontmatter & Resource;

export function resolveChildPaths(
  pathPrefix: string,
  tutorialItems: string[]
): string[] {
  return tutorialItems.map((item) => {
    let result = path.join(pathPrefix, item);
    return !result.endsWith("/") ? result.concat("/") : result;
  });
}

export async function getTutorial(
  data: any,
  page: EleventyPage
): Promise<Tutorial> {
  if (data.resourceType != "tutorial") {
    throw new Error("This resource type is not right");
  }

  // we know we have a thumbnail, fix it to the correct path
  const dirname = path.dirname(page.inputPath);
  const thumbnail = path.join(dirname, data.thumbnail);

  // absolute paths to tutorial items
  const rootPath = page.url;
  const tutorialItems = resolveChildPaths(rootPath, data.tutorialItems);

  const tutorial: Tutorial = {
    ...getResourceFrontmatter(data, page, "tutorial"),
    thumbnail,
    tutorialItems: tutorialItems,
  };
  tutorial.thumbnail = thumbnail;

  validateFrontmatter(TutorialFrontmatter, tutorial, page.url);
  await Image(tutorial.thumbnail, imageOptions);
  return tutorial;
}
