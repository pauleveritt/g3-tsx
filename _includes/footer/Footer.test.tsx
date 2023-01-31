import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import Footer, { FooterProps } from "./Footer.11ty";
import site from "../site.json";
import { h, render } from "nano-jsx/lib/core";

const props: FooterProps = { copyright: site.copyright };

test("Footer", () => {
  document.body.innerHTML = render(
    <Footer copyright={props.copyright}></Footer>
  );
  expect(screen.getByRole("link", { name: "JetBrains" })).to.exist;
});
