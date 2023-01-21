import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import NavbarBrand, { NavbarBrandProps } from "./NavbarBrand.11ty";
import site from "../site.json";

export const navbarBrandProps: NavbarBrandProps = {
  rootURL: site.rootURL,
  siteLogo: site.siteLogo,
  siteTitle: site.siteTitle,
};
test("NavbarBrand", () => {
  document.body.innerHTML = NavbarBrand(navbarBrandProps);
  const img = document.querySelector("img");
  expect(img && img.tagName).to.equal("IMG");
  expect(img && img.getAttribute("src")).to.equal(
    "/assets/jetbrains-simple.svg"
  );
  const links = document.querySelectorAll("a");
  expect(links && links[0].href).to.equal("/webstorm-guide/");
  expect(links && links[1].href).to.equal("/webstorm-guide/");
  expect(screen.getByText("PyCharm Guide")).to.exist;
});
