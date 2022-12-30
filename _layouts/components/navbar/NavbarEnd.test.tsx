import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import NavbarEnd, { NavbarEndProps } from "./NavbarEnd.11ty";
import site from "../../site.json";

const props: NavbarEndProps = site.end;

test("NavbarEnd", () => {
  document.body.innerHTML = NavbarEnd(props);
  expect(screen.getByText("Get PyCharm")).to.exist;
  expect(screen.getByLabelText("github Icon")).to.exist;
});
