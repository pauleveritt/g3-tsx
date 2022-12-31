import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import SidebarLayout, { SidebarLayoutProps } from "./SidebarLayout.11ty";
import h from "vhtml";

const children = [
  h("main", {
    dangerouslySetInnerHTML: { __html: `<button>B42</button>` },
  }),
];
const props: SidebarLayoutProps = {
  pageTitle: "Some Tip",
  children,
};

test("SidebarLayout", () => {
  document.body.innerHTML = SidebarLayout(props);
  expect(screen.getByRole("button", { name: "B42" })).to.exist;
});
