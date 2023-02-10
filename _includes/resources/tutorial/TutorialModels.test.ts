import { expect, test } from "vitest";
import { resolveChildPaths } from "./TutorialModels";

test("resolve an array of child paths", () => {
  const rootPathPrefix = "/paul-everitt";
  const tutorialItems = ["./first/", "./second", "./third/"];
  const result = resolveChildPaths(rootPathPrefix, tutorialItems);
  expect(result[0]).to.equal(`${rootPathPrefix}/first/`);
  expect(result[1]).to.equal(`${rootPathPrefix}/second/`);
  expect(result[2]).to.equal(`${rootPathPrefix}/third/`);
});
