import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import ResourceCard from "./ResourceCard.11ty";
import fixtures from "../fixtures";

test("ResourceCard", () => {
  const resource = fixtures.tips[0];

  document.body.innerHTML = ResourceCard({ resource });
  const result: HTMLImageElement = screen.getByAltText("Logo");
  expect(result.src).to.equal(resource.thumbnail);
});
