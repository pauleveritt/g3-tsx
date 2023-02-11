import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import SidebarPublished, {
  SidebarPublishedProps,
} from "./SidebarPublished.11ty";
import fixtures from "../fixtures";

const props: SidebarPublishedProps = {
  date: new Date("2023-01-01"),
  author: fixtures.authors[0],
};

test("SidebarPublished", () => {
  document.body.innerHTML = SidebarPublished(props);
  expect(screen.getByText("Some Author")).to.exist;
});
