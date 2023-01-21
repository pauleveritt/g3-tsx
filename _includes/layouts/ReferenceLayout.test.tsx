import h from "vhtml";
import { expect, it } from "vitest";
import { ReferenceLayoutMain } from "./ReferenceLayout.11y";
import { screen } from "@testing-library/dom";

it("make a ReferenceLayout", () => {
  const figure = <figure></figure>;
  const listing = (
    <ul>
      <li>one</li>
    </ul>
  );
  document.body.innerHTML = (
    <ReferenceLayoutMain
      title={`Some Title`}
      subtitle={`Some Subtitle`}
      figure={[figure]}
      listing={[listing]}
    ></ReferenceLayoutMain>
  );
  expect(screen.getByText("Some Title")).to.exist;
});
