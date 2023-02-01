import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import SidebarPublished, {
  SidebarPublishedProps,
} from "./SidebarPublished.11ty";

const props: SidebarPublishedProps = {
  date: new Date("2023-01-01"),
  author: {
    slug: "some-author-slug",
    title: "Some Author Title",
    thumbnail: "sa.png",
  },
};

test("SidebarPublished", () => {
  document.body.innerHTML = SidebarPublished(props);
  expect(screen.getByText("Some Author Title")).to.exist;
});
