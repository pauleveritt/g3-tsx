import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import SidebarReferencesGroup, {
  SidebarReferencesGroupProps,
} from "./SidebarReferencesGroup.11ty";

const props: SidebarReferencesGroupProps = {
  reftype: "some-reftype",
  accent: "some-accent",
  references: ["ref1", "ref2", "ref3"],
};

test("SidebarReferencesGroup", () => {
  document.body.innerHTML = SidebarReferencesGroup(props);
  // TODO Bring back sidebars
  // const results: HTMLAnchorElement[] = screen.getAllByRole("link");
  // expect(results.length).to.equal(3);
  // expect(results[0].href).to.equal("/some-reftype/ref1/");
});
