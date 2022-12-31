import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import ResourceCardLogo, {
  ResourceCardLogoProps,
} from "./ResourceCardLogo.11ty";

const props: ResourceCardLogoProps = { thumbnail: "some-thumbnail.png" };

test("ResourceCardLogo", () => {
  document.body.innerHTML = ResourceCardLogo(props);
  const result = screen.getByAltText("Logo");
  expect(result).to.exist;
});
