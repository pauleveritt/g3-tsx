import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import SidebarPublished, {
  SidebarPublishedProps,
} from "./SidebarPublished.11ty";

const props: SidebarPublishedProps = {};

test("SidebarPublished", () => {
  document.body.innerHTML = SidebarPublished(props);
  const result = screen.getByRole("button");
  expect(result).to.exist;
});
