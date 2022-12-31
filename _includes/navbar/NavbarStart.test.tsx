import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import NavbarStart, { NavbarStartProps } from "./NavbarStart.11ty";
import site from "../site.json";

export const navbarStartProps: NavbarStartProps = site.start;
test("NavbarStart", () => {
  document.body.innerHTML = NavbarStart(navbarStartProps);
  expect(screen.getByText("Tips")).to.exist;
  const firstLink = document.querySelector("a.navbar-item");
  if (firstLink) {
    expect(firstLink.className).to.equal(
      "navbar-item bd-navbar-item-documentation"
    );
    expect(firstLink.getAttribute("href")).to.equal("/tips/");
  }
  const firstSpan = document.querySelector("span.icon");
  if (firstSpan) {
    expect(firstSpan.className).to.equal("icon has-text-success");
  }
});
