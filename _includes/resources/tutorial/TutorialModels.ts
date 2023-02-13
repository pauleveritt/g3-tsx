import { Static, Type } from "@sinclair/typebox";
import {
  BaseData,
  Resource,
  ResourceFrontmatter,
} from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";
import path from "path";

export const TutorialFrontmatter = Type.Intersect([
  ResourceFrontmatter,
  Type.Object({
    thumbnail: Type.Optional(Type.String()),
    tutorialItems: Type.Array(Type.String()),
    videoBottom: Type.Optional(Type.Boolean()),
  }),
]);
export type TutorialFrontmatter = Static<typeof TutorialFrontmatter>;
export type TutorialData = TutorialFrontmatter & BaseData;

export class Tutorial extends Resource implements TutorialFrontmatter {
  tutorialItems: string[];
  videoBottom: boolean;
  static frontmatterSchema = TutorialFrontmatter;

  constructor({ data, page }: { data: TutorialData; page: EleventyPage }) {
    super({ data, page });
    this.tutorialItems = data.tutorialItems;
    this.videoBottom = !!data.videoBottom;
  }
}

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
  data: TutorialData,
  page: EleventyPage
): Promise<Tutorial> {
  // absolute paths to tutorial items
  // const rootPath = page.url;
  // const tutorialItems = resolveChildPaths(rootPath, data.tutorialItems);

  const tutorial = new Tutorial({ data, page });
  await tutorial.init();
  return tutorial;
}
