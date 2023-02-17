import h from "vhtml";
import { expect, it } from "vitest";
import { ReferenceLayout } from "./ReferenceLayout.11y";
import { screen } from "@testing-library/dom";

it("make a ReferenceLayout", () => {
  const figure = <figure></figure>;
  const listing = (
    <ul>
      <li>one</li>
    </ul>
  );
  document.body.innerHTML = (
    <ReferenceLayout
      title={`Some Title`}
      subtitle={`Some Subtitle`}
      figure={[figure]}
      listing={[listing]}
    ></ReferenceLayout>
  );
  expect(screen.getByText("Some Title")).to.exist;
});
