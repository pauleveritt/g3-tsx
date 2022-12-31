import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import ResourceCard, { ResourceCardProps } from "./ResourceCard.11ty";

const props: ResourceCardProps = {};

test("ResourceCard", () => {
  document.body.innerHTML = ResourceCard(props);
  const result = screen.getByRole("button");
  expect(result).to.exist;
});
