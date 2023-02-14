import { expect, test } from "vitest";
import { resolveChildPath } from "./TutorialModels";

test("resolve an array of child paths", () => {
  const rootPathPrefix = "/paul-everitt";
  const tutorialItem = "./first/";
  const result = resolveChildPath(rootPathPrefix, tutorialItem);
  expect(result).to.equal(`${rootPathPrefix}/first/`);
});
