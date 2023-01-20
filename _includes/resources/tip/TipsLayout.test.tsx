import { expect, test } from "vitest";
import { TipsLayout, TipsLayoutTip } from "./TipsLayout.11ty";
import { screen } from "@testing-library/dom";

test("should render TipsLayout", () => {
  const tips: TipsLayoutTip[] = [
    { title: "Some Title", slug: "some-slug" },
    { title: "Another Title", slug: "another-slug" },
  ];
  document.body.innerHTML = TipsLayout({ tips });
  const items: HTMLUListElement[] = screen.getAllByRole("listitem", {
    name: "tip",
  });
  expect(items[0].textContent).to.equal(tips[0].title);
});
