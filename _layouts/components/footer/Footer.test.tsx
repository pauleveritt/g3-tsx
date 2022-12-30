import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import Footer, { FooterProps } from "./Footer.11ty";
import site from "../../site.json";

const props: FooterProps = { copyright: site.copyright };

test("Footer", () => {
  document.body.innerHTML = Footer(props);
  expect(screen.getByRole("link", { name: "JetBrains" })).to.exist;
});
