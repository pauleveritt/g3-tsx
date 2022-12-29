import { expect, test } from "vitest";

import Navbar from "./Navbar.11ty";

test("Navbar", () => {
  const result = Navbar({});
  expect(result).to.contain("nav");
});
