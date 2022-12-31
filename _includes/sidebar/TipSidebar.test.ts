import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import TipSidebar, { TipSidebarProps } from "./TipSidebar.11ty";

const props: TipSidebarProps = {};

test("TipSidebar", () => {
  document.body.innerHTML = TipSidebar(props);
  const result = screen.getByRole("button");
  expect(result).to.exist;
});
