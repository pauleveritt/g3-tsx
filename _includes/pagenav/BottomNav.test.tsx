import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import BottomNav, { BottomNavProps } from "./BottomNav.11ty";

export const bottomNavProps: BottomNavProps = {
  previous: { label: "Previous Tip", slug: "/previous" },
  next: { label: "Next Tip", slug: "/next" },
};

test("BottomNav", () => {
  document.body.innerHTML = BottomNav(bottomNavProps);

  // Check the <span> with the label
  expect(screen.getByText("Previous Tip")).to.exist;
  expect(screen.getByText("Next Tip")).to.exist;

  // Check the <a> with the hrefs
  const results: HTMLAnchorElement[] = screen.getAllByRole("link");
  expect(results[0].href).to.equal("/previous");
  expect(results[1].href).to.equal("/next");
});
